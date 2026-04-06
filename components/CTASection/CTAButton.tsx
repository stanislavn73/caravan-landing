"use client";

import { RocketOutlined } from "@ant-design/icons";
import { motion } from "motion/react";
import { useConsultationForm } from "@/components/ConsultationFormContext";
import { Button } from "@/components/ui/Button";

export function CTAButton({ label }: { label: string }) {
  const { openForm } = useConsultationForm();

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="primary"
        onClick={openForm}
        className="h-14 px-20 shadow-2xl hover:shadow-[#FF5A2F]/50"
      >
        {label}
        <RocketOutlined />
      </Button>
    </motion.div>
  );
}
