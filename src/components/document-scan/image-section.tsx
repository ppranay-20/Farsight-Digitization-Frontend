import Image from "next/image";
import Canvas from "./canvas";
import image from "../../../assets/67925987b13a70923afc873a.jpeg"
import { getImagesFromPages, getPagesFromDocumentInstance, getProcessedImage, getUserResponse } from "@/actions/documents";
import { Suspense } from "react";

export default async function ImageSection() {
  const data = await getPagesFromDocumentInstance("67925986b13a70923afc8738");

  const getImages = await getImagesFromPages(data[0].instanceId, data[0].id, data[1].id);
  const processedImage = await getProcessedImage(data[0].instanceId, data[0].id, data[1].id);

  return (
    <div className="flex flex-col gap-2 h-full">
      <Suspense fallback={<div>Loading...</div>}>
          <Image src={image} alt="Document Scan" className="w-full max-h-20 object-cover" />
          <Canvas images={getImages} processedImage={processedImage} />
      </Suspense>
    </div>
  )
}
