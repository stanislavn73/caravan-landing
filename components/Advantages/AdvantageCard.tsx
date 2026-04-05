import * as motion from "motion/react-client";
import type { ReactNode } from "react";

interface AdvantageCardProps {
  children: ReactNode;
  index: number;
}

export function AdvantageCard({ children, index }: AdvantageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      style={{ width: "100%", display: "flex", flexDirection: "column" }}
    >
      {children}
    </motion.div>
  );
}
