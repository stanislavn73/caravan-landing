"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { TrailerType } from "@/components/TrailerTypes/TrailerTypes";
import type { ConfigType } from "@/components/Configurations/Configurations";

interface ConfiguratorContextType {
  selectedTrailerType: TrailerType;
  selectedConfig: ConfigType;
  selectTrailerType: (type: TrailerType) => void;
  selectConfig: (config: ConfigType) => void;
}

const ConfiguratorContext = createContext<ConfiguratorContextType | null>(null);

export function useConfigurator() {
  const ctx = useContext(ConfiguratorContext);
  if (!ctx)
    throw new Error(
      "useConfigurator must be used within ConfiguratorProvider",
    );
  return ctx;
}

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [selectedTrailerType, setSelectedTrailerType] =
    useState<TrailerType>("wide");
  const [selectedConfig, setSelectedConfig] = useState<ConfigType>(null);

  const selectTrailerType = useCallback((type: TrailerType) => {
    setSelectedTrailerType(type);
    setTimeout(() => {
      const element = document.getElementById("configurations");
      if (element) {
        const offset = 80;
        const pos = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: pos - offset, behavior: "smooth" });
      }
    }, 100);
  }, []);

  const selectConfig = useCallback((config: ConfigType) => {
    setSelectedConfig(config);
    setTimeout(() => {
      const element = document.getElementById("specs");
      if (element) {
        const offset = 80;
        const pos = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: pos - offset, behavior: "smooth" });
      }
    }, 100);
  }, []);

  return (
    <ConfiguratorContext.Provider
      value={{
        selectedTrailerType,
        selectedConfig,
        selectTrailerType,
        selectConfig,
      }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
}
