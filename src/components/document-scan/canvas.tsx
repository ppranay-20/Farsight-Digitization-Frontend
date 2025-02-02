"use client";

import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Expand, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelectedField } from "./select-field-context/select-field-context";

interface CanvasProps {
  images: { leftImage: string; rightImage: string };
  processedImage: { leftImage: string; rightImage: string };
}

export default function Canvas({
  images,
  processedImage,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
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
    if(image) {
      drawBoundingBoxes();
    }
  }, [image, selectedField]);

  const drawBoundingBoxes = () => {
    if (!canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // if No selected field, return
    if (!selectedField || !selectedField.coordinates) return;

    //  Get the actual displayed dimensions
    const displayedWidth = canvas.width;
    const displayedHeight = canvas.height;

    // Calculate the scale factor
    const scaleX = displayedWidth / image.naturalWidth;
    const scaleY = displayedHeight / image.naturalHeight;

    // Get the coordinates from selected field
    const [x1, y1, x2, y2] = selectedField.coordinates.map((coord: string | number) => {
      return Number(coord);
    });

    // Scale coordinates to match canvas size
    const scaledX1 = x1 * scaleX;
    const scaledY1 = y1 * scaleY;
    const scaledWidth = (x2 - x1) * scaleX;
    const scaledHeight = (y2 - y1) * scaleY;

    // Set styles for bounding box
    ctx.strokeStyle = "rgba(255, 0, 0, 0.8)";
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(255, 0, 0, 0.1)";

     // Draw filled rectangle with semi-transparent color
     ctx.fillRect(scaledX1, scaledY1, scaledWidth, scaledHeight);
    
     // Draw border
     ctx.strokeRect(scaledX1, scaledY1, scaledWidth, scaledHeight);
 
     // Add debug logging
     console.log('Drawing bounding box with:', {
         originalCoords: { x1, y1, x2, y2 },
         scaledCoords: { 
             x: scaledX1, 
             y: scaledY1, 
             width: scaledWidth, 
             height: scaledHeight 
         },
         scale: { scaleX, scaleY },
         imageSize: { 
             natural: { 
                 width: image.naturalWidth, 
                 height: image.naturalHeight 
             },
             canvas: { 
                 width: canvas.width, 
                 height: canvas.height 
             }
         }
     });
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

  const handleZoomIn = () => {
    setScale((prev) => {
      const newScale = Math.min(prev + 0.25, 3);
      // Reset position when zooming out to 1
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev - 0.25, 1);
      // Reset position when zooming out to 1
      if (newScale === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

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
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0.2s ease-in-out",
          }}
        />

        {showProcessedImage ? (
          <Image
            src={currentImage.processed}
            fill
            unoptimized={true}
            alt="Document"
            className="w-full object-fill h-auto"
            style={{
              transform: `scale(${scale})`,
              transition: "transform 0.2s ease-in-out",
            }}
          />
        ) : (
          <Image
            src={currentImage.raw}
            fill
            alt="Document"
            className="w-full object-fill h-full"
            unoptimized={true}
            style={{
              transform: `scale(${scale})`,
              transition: "transform 0.2s ease-in-out",
            }}
          />
        )}

        <div className="absolute bottom-3 left-3 cursor-pointer z-10">
          <Switch checked={showProcessedImage} onCheckedChange={handleSwitch} />
        </div>
        <div className="absolute top-3 right-3 cursor-pointer z-10">
          <Expand
            className="text-white w-6 h-6"
            onClick={() => setIsFullscreen(true)}
          />
        </div>
        <div className="absolute bottom-3 right-3 cursor-pointer z-10">
          <ZoomIn className="text-white w-6 h-6" onClick={handleZoomIn} />
        </div>
        <div className="absolute bottom-3 right-12 cursor-pointer z-10">
          <ZoomOut className="text-white w-6 h-6" onClick={handleZoomOut} />
        </div>
        <button
          className="absolute bottom-3 right-[50%] cursor-pointer z-10"
          onClick={scrollImage}
        >
          <p className="bg-white w-10 h-3 rounded-full"></p>
        </button>
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
