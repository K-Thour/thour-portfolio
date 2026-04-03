import { motion } from "motion/react";
import type { ProjectFeature } from "../types";

interface ChallengeItemProps {
  challenge: ProjectFeature;
  index: number;
  isInView: boolean;
  isDark: boolean;
}

export function ChallengeItem({
  challenge,
  index,
  isInView,
  isDark,
}: ChallengeItemProps) {
  return (
    <motion.div
      key={challenge.title}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
      className={`p-6 rounded-2xl border ${
        isDark
          ? "bg-slate-800/50 border-red-500/20"
          : "bg-linear-to-br from-white to-blue-50 border-blue-300/30 shadow-md"
      }`}
    >
      <h3
        className={`text-lg font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {challenge.title}
      </h3>
      <p className={isDark ? "text-gray-400" : "text-gray-700"}>
        {challenge.description}
      </p>
    </motion.div>
  );
}
