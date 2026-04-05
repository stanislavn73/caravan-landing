"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface ConsultationFormContextType {
  open: boolean;
  openForm: () => void;
  closeForm: () => void;
}

const ConsultationFormContext =
  createContext<ConsultationFormContextType | null>(null);

export function useConsultationForm() {
  const ctx = useContext(ConsultationFormContext);
  if (!ctx)
    throw new Error(
      "useConsultationForm must be used within ConsultationFormProvider",
    );
  return ctx;
}

export function ConsultationFormProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openForm = useCallback(() => setOpen(true), []);
  const closeForm = useCallback(() => setOpen(false), []);

  return (
    <ConsultationFormContext.Provider value={{ open, openForm, closeForm }}>
      {children}
    </ConsultationFormContext.Provider>
  );
}
