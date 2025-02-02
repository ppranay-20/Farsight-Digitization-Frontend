import RenderFields from "@/components/document-scan/fields-section/render-fields"
import { getTemplateFields, getUserResponse } from "@/actions/documents"
import { Suspense } from "react"

export default async function DocumentScanPage() {
  const fields = await getTemplateFields("679332bb53ea3b75545e4ebc")
  const userResponse = await getUserResponse("679cc5fe9a9aca4cda688ef5")

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RenderFields 
        fields={fields} 
        userResponse={userResponse} 
      />
    </Suspense>
  )
}