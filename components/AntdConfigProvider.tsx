"use client";

import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

const antdTheme = {
  token: {
    colorPrimary: "#FF5A2F",
    colorLink: "#FF5A2F",
    borderRadius: 8,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontFamilyCode: "Arial, Helvetica, sans-serif",
  },
  components: {
    Button: {
      primaryShadow: "0 4px 12px rgba(255, 90, 47, 0.3)",
    },
    Typography: {
      fontFamilyCode: "Arial, Helvetica, sans-serif",
    },
  },
};

export function AntdConfigProvider({ children }: { children: ReactNode }) {
  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
}
