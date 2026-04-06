"use client";

import { PhoneOutlined } from "@ant-design/icons";
import { motion } from "motion/react";
import { useConsultationForm } from "@/components/ConsultationFormContext";
import { Button } from "@/components/ui/Button";

export function FloatingFeedbackButtonClient({ label }: { label: string }) {
  const { openForm } = useConsultationForm();

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <Button
          variant="primary"
          onClick={openForm}
          className="h-14 px-20 rounded-full shadow-2xl hover:shadow-[#FF5A2F]/50"
        >
          <PhoneOutlined className="text-xl" />
          {label}
        </Button>
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ backgroundColor: "#FF5A2F", zIndex: -1 }}
        />
      </motion.div>
    </motion.div>
  );
}
