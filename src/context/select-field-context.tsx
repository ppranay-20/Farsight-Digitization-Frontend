"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { FieldValue } from "@/types/document-action";

type SelectedFieldContextType = {
  selectedField: FieldValue | null;
  setSelectedField: (field: FieldValue | null) => void;
};

const SelectedFieldContext = createContext<SelectedFieldContextType>({
  selectedField: null,
  setSelectedField: () => {},
});

export function SelectedFieldProvider({ children }: { children: ReactNode }) {
  const [selectedField, setSelectedField] = useState<FieldValue | null>(null);

  return (
    <SelectedFieldContext.Provider value={{ selectedField, setSelectedField }}>
      {children}
    </SelectedFieldContext.Provider>
  );
}

export function useSelectedField() {
  const context = useContext(SelectedFieldContext);
  if (context === undefined) {
    throw new Error('useSelectedField must be used within a SelectedFieldProvider');
  }
  return context;
}