"use client";

import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useConsultationForm } from "@/components/ConsultationFormContext";

export function HeroCTAButton({ label }: { label: string }) {
  const { openForm } = useConsultationForm();

  return (
    <Button
      type="primary"
      size="large"
      onClick={openForm}
      className="h-14 px-12 text-lg font-semibold border-0 shadow-2xl hover:shadow-[#FF5A2F]/50 transition-all duration-300 hover:scale-105"
      style={{ backgroundColor: "#FF5A2F" }}
      icon={<ArrowRightOutlined />}
      iconPlacement="end"
    >
      {label}
    </Button>
  );
}
