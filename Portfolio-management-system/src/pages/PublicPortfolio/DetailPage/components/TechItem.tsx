import { motion } from "motion/react";
import type { TechItemData } from "../types";

interface TechItemProps {
  tech: TechItemData;
  index: number;
  isInView: boolean;
  isDark?: boolean;
}

export function TechItem({ tech, index, isInView }: TechItemProps) {
  return (
    <motion.span
      key={tech.name}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{
        type: "spring",
        damping: 26,
        stiffness: 280,
        delay: 0.2 + index * 0.03,
      }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-border/40 bg-card/75 backdrop-blur-xl text-foreground shadow-xs hover:shadow-md active:scale-[0.98] transition-all"
    >
      {tech.iconUrl ? (
        <img
          src={tech.iconUrl}
          alt={tech.name}
          className="w-4 h-4 object-contain"
        />
      ) : null}
      <span>{tech.name}</span>
    </motion.span>
  );
}

