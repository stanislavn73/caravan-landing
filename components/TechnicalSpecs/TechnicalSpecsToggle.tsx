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

interface SpecsBadgesProps {
  trailerNames: { wide: string; offroad: string };
  configNames: { base: string; mid: string; performance: string };
}

export function SpecsBadges({ trailerNames, configNames }: SpecsBadgesProps) {
  const { selectedTrailerType, selectedConfig } = useConfigurator();

  if (!selectedConfig) return null;

  const trailerLabel =
    selectedTrailerType === "wide" ? trailerNames.wide : trailerNames.offroad;
  const configLabel =
    configNames[selectedConfig as keyof typeof configNames] ?? selectedConfig;

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <div
        className="px-6 py-3 rounded-lg font-semibold text-white shadow-md"
        style={{ backgroundColor: "#FF5A2F" }}
      >
        {trailerLabel}
      </div>
      <span className="text-2xl text-gray-400" aria-hidden="true">
        &bull;
      </span>
      <div
        className="px-6 py-3 rounded-lg font-semibold text-white shadow-md"
        style={{ backgroundColor: "#FF5A2F" }}
      >
        {configLabel}
      </div>
    </div>
  );
}
