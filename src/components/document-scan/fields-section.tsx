import RenderFields from "@/components/document-scan/fields-section/render-fields"
import { getTemplateFields, getUserResponse } from "@/actions/documents"
import { Suspense } from "react"

export default async function DocumentScanPage() {
  const fields = await getTemplateFields("679332bb53ea3b75545e4ebc")
  const userResponse = await getUserResponse("679dcb9bc1ab572ed81377a8")

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RenderFields 
        fields={fields} 
        userResponse={userResponse} 
      />
    </Suspense>
  )
}