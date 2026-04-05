"use client";

import { useEffect, useState } from "react";
import { useConfigurator } from "@/components/ConfiguratorContext";
import type { ReactNode } from "react";

export function TechnicalSpecsToggle({ children }: { children: ReactNode }) {
  const { selectedConfig } = useConfigurator();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Before hydration: render everything visible (server HTML for crawlers)
  // After hydration: hide section when no config selected
  const shouldHide = hydrated && !selectedConfig;

  return (
    <div style={shouldHide ? { display: "none" } : undefined}>
      {children}
    </div>
  );
}

export function SpecsTableToggle({
  trailerType,
  configType,
  children,
}: {
  trailerType: string;
  configType: string;
  children: ReactNode;
}) {
  const { selectedTrailerType, selectedConfig } = useConfigurator();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Before hydration: all tables visible (server HTML for crawlers)
  // After hydration: only show matching table
  const isActive =
    selectedTrailerType === trailerType && selectedConfig === configType;
  const shouldHide = hydrated && !isActive;

  return (
    <div
      style={shouldHide ? { display: "none" } : undefined}
      data-trailer={trailerType}
      data-config={configType}
    >
      {children}
    </div>
  );
}

export function SpecsBadges() {
  const { selectedTrailerType, selectedConfig } = useConfigurator();

  if (!selectedConfig) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <div
        className="px-6 py-3 rounded-lg font-semibold text-white shadow-md"
        style={{ backgroundColor: "#FF5A2F" }}
      >
        {selectedTrailerType === "wide" ? "Camper Wide" : "Camper Off-Road"}
      </div>
      <span className="text-2xl text-gray-400">•</span>
      <div
        className="px-6 py-3 rounded-lg font-semibold text-white shadow-md"
        style={{ backgroundColor: "#FF5A2F" }}
      >
        {selectedConfig.charAt(0).toUpperCase() + selectedConfig.slice(1)}
      </div>
    </div>
  );
}
