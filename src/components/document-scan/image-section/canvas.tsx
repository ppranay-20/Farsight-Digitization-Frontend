"use client";

import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Expand, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelectedField } from "../../../context/select-field-context";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface CanvasProps {
  images: { leftImage: string; rightImage: string };
  processedImage: { leftImage: string; rightImage: string };
}

export default function Canvas({ images, processedImage }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [showProcessedImage, setShowProcessedImage] = useState(false);
  const [currentImage, setCurrentImage] = useState({
    raw: images.leftImage,
    processed: processedImage.leftImage,
  });
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const { selectedField } = useSelectedField();

  useEffect(() => {
    const img = new window.Image();
    img.src = showProcessedImage ? currentImage.processed : currentImage.raw;
    img.onload = async () => {
      setImage(img);
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = img.width;
        canvas.height = img.height;
      }
    };
  }, [currentImage, showProcessedImage]);

  // Redraw the bounding box when the selected field changes or the image is loaded
  useEffect(() => {
    if (image) {
      drawBoundingBoxes();
    }
  }, [image, selectedField]);

  const drawBoundingBoxes = () => {
    if (!canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear previous drawings
    // ctx.clearRect(0, 0, canvas.width, canvas.height);  

    // Draw the image first
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // if No selected field, return
    if (!selectedField || !selectedField.coordinates) return;

    // Convert coordinates to numbers and handle the order [ymin, xmin, ymax, xmax]
    const [ymin, xmin, ymax, xmax] = selectedField.coordinates.map((coord) =>
      Number(coord)
    );

    // Denormalize coordinates (as they are normalized to 1000)
    const abs_x1 = (xmin / 1000) * canvas.width;
    const abs_y1 = (ymin / 1000) * canvas.height;
    const abs_x2 = (xmax / 1000) * canvas.width;
    const abs_y2 = (ymax / 1000) * canvas.height;

    // Calculate width and height
    const width = abs_x2 - abs_x1;
    const height = abs_y2 - abs_y1;

    // Set styles for bounding box
    ctx.strokeStyle = "rgba(0, 0, 255, 0.8)";
    ctx.lineWidth = 4;

    // Draw border
    ctx.strokeRect(abs_x1, abs_y1, width, height);

  };

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // const handleZoomIn = () => {
  //   setScale((prev) => {
  //     const newScale = Math.min(prev + 0.25, 3);
  //     return newScale;
  //   });
  // };

  // const handleZoomOut = () => {
  //   setScale((prev) => {
  //     const newScale = Math.max(prev - 0.25, 1);
  //     return newScale;
  //   });
  // };
  
  // Handle switch between raw and processed image
  const handleSwitch = () => {
    setShowProcessedImage(!showProcessedImage);
  };


  const scrollImage = () => {
    setCurrentImage((prev) => ({
      raw: prev.raw === images.leftImage ? images.rightImage : images.leftImage,
      processed:
        prev.processed === processedImage.leftImage
          ? processedImage.rightImage
          : processedImage.leftImage,
    }));
  };

  return (
    <>
       <div className="relative flex-grow w-full h-full overflow-hidden">
        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={3}
          centerOnInit={true}
        >
          {({ zoomIn, zoomOut }) => (
            <>
              <TransformComponent
                wrapperStyle={{ width: '100%', height: '100%' }}
                contentStyle={{ width: '100%', height: '100%' }}
              >
                <div className="relative w-full h-full">
                  {showProcessedImage ? (
                    <Image
                      src={currentImage.processed}
                      alt="Document"
                      fill
                      unoptimized={true}
                      style={{ objectFit: 'contain' }}
                    />
                  ) : (
                    <Image
                      src={currentImage.raw}
                      alt="Document"
                      fill
                      unoptimized={true}
                      style={{ objectFit: 'contain' }}
                    />
                  )}
                  <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
                  />
                </div>
              </TransformComponent>

              {/* Controls */}
              <div className="absolute bottom-3 right-3 cursor-pointer z-10">
                <ZoomIn 
                  className="text-white w-6 h-6" 
                  onClick={() => zoomIn()} 
                />
              </div>
              <div className="absolute bottom-3 right-12 cursor-pointer z-10">
                <ZoomOut 
                  className="text-white w-6 h-6" 
                  onClick={() => zoomOut()} 
                />
              </div>

              {/* Other controls */}
              <div className="absolute bottom-3 left-3 cursor-pointer z-10">
                <Switch checked={showProcessedImage} onCheckedChange={handleSwitch} />
              </div>
              <div className="absolute top-3 right-3 cursor-pointer z-10">
                <Expand
                  className="text-white w-6 h-6"
                  onClick={() => setIsFullscreen(true)}
                />
              </div>
              <button
                className="absolute bottom-3 right-[50%] cursor-pointer z-10"
                onClick={scrollImage}
              >
                <p className="bg-white w-10 h-3 rounded-full"></p>
              </button>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Stop propagation to prevent closing when clicking the image */}
          <div
            className="relative w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={
                showProcessedImage ? currentImage.processed : currentImage.raw
              }
              alt="Document"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
