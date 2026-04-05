"use client";

import {
  ThunderboltOutlined,
  StarOutlined,
  RocketOutlined,
  SafetyOutlined,
  SunOutlined,
  CrownOutlined,
  SaveOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const icons = [
  ThunderboltOutlined,
  StarOutlined,
  RocketOutlined,
  SafetyOutlined,
  SunOutlined,
  CrownOutlined,
  SaveOutlined,
  AppstoreOutlined,
];

export function AdvantageIcon({ index }: { index: number }) {
  const Icon = icons[index];
  return <Icon className="text-3xl" />;
}
