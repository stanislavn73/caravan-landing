import * as motion from "motion/react-client";
import type { ReactNode } from "react";

export function AnimatedHeading({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10"
    >
      {children}
    </motion.div>
  );
}
