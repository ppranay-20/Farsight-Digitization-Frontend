"use client";

import { createContext, useContext, useState, ReactNode } from "react";
interface SelectedField {
  name: string;
  coordinates: number[];
}

type SelectedFieldContextType = {
  selectedField: SelectedField | null;
  setSelectedField: (field: SelectedField | null) => void;
};

const SelectedFieldContext = createContext<SelectedFieldContextType>({
  selectedField: null,
  setSelectedField: () => {},
});

export function SelectedFieldProvider({ children }: { children: ReactNode }) {
  const [selectedField, setSelectedField] = useState<SelectedField | null>(null);

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