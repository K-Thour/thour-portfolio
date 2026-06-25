import { motion } from "motion/react";
import type { TechItemData } from "../types";

interface TechItemProps {
  tech: TechItemData;
  index: number;
  isInView: boolean;
  isDark: boolean;
}

export function TechItem({ tech, index, isInView, isDark }: TechItemProps) {
  return (
    <motion.span
      key={tech.name}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium border transition-all hover:scale-105 ${
        isDark
          ? "bg-slate-800/80 border-yellow-500/30 text-white hover:border-yellow-500/60"
          : "bg-linear-to-br from-blue-100 to-blue-200 border-blue-400/40 text-gray-900 hover:border-blue-500/60 shadow-sm"
      }`}
    >
      {tech.iconUrl ? (
        <img
          src={tech.iconUrl}
          alt={tech.name}
          className="w-5 h-5 object-contain"
        />
      ) : null}
      <span>{tech.name}</span>
    </motion.span>
  );
}
