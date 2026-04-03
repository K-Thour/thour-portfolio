import { motion } from "motion/react";

interface TechItemProps {
  tech: string;
  index: number;
  isInView: boolean;
  isDark: boolean;
}

export function TechItem({ tech, index, isInView, isDark }: TechItemProps) {
  return (
    <motion.span
      key={tech}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
      className={`px-6 py-3 rounded-xl font-medium border transition-all hover:scale-105 ${
        isDark
          ? "bg-slate-800/80 border-yellow-500/30 text-white hover:border-yellow-500/60"
          : "bg-linear-to-br from-blue-100 to-blue-200 border-blue-400/40 text-gray-900 hover:border-blue-500/60 shadow-sm"
      }`}
    >
      {tech}
    </motion.span>
  );
}
