import FieldsSection from "@/components/document-scan/fields-section";
import ImageSection from "@/components/document-scan/image-section";
import { SelectedFieldProvider } from "@/context/select-field-context";
import Navbar from "@/components/navbar";

export default function page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SelectedFieldProvider>
        <div className="p-3 grid grid-cols-2 flex-grow">
          <ImageSection />
          <FieldsSection />
        </div>
      </SelectedFieldProvider>
    </div>
  );
}
