"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { useConsultationForm } from "@/components/ConsultationFormContext";
import { Button } from "@/components/ui/Button";

export function HeroCTAButton({ label }: { label: string }) {
  const { openForm } = useConsultationForm();

  return (
    <Button
      variant="primary"
      onClick={openForm}
      className="h-14 px-12 text-lg shadow-2xl hover:shadow-[#FF5A2F]/50 hover:scale-105"
    >
      {label}
      <ArrowRightOutlined />
    </Button>
  );
}
