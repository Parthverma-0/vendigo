"use client";

import { createContext, useContext, useState, useCallback } from "react";
import LeadModal from "./LeadModal";

type LeadContextValue = {
  open: (source?: string) => void;
  close: () => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used within <LeadProvider>");
  return ctx;
}

export default function LeadProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>(undefined);

  const open = useCallback((src?: string) => {
    setSource(src);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <LeadContext.Provider value={{ open, close }}>
      {children}
      <LeadModal isOpen={isOpen} onClose={close} source={source} />
    </LeadContext.Provider>
  );
}
