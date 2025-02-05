import RenderFields from "@/components/document-scan/fields-section/render-fields"
import { getTemplateFields, getUserResponse } from "@/actions/documents"
import { Suspense } from "react"

export default async function DocumentScanPage() {
  const fields = await getTemplateFields("679332bb53ea3b75545e4ebc")
  const userResponse = await getUserResponse("67a2044a355bf973cfde8723");

  console.log(userResponse)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RenderFields 
        fields={fields} 
        userResponse={userResponse} 
      />
    </Suspense>
  )
}