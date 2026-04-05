"use client";

import { Button } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import { motion } from "motion/react";
import { useConsultationForm } from "@/components/ConsultationFormContext";

export function CTAButton({ label }: { label: string }) {
  const { openForm } = useConsultationForm();

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        type="primary"
        size="large"
        onClick={openForm}
        icon={<RocketOutlined />}
        iconPlacement="end"
        className="h-14 px-20 shadow-2xl hover:shadow-[#FF5A2F]/50 transition-all duration-300 font-semibold"
        style={{ backgroundColor: "#FF5A2F" }}
      >
        {label}
      </Button>
    </motion.div>
  );
}
