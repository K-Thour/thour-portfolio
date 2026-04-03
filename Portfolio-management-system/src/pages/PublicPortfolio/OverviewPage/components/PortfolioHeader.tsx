import { motion } from "motion/react";
import type { PortfolioHeaderProps } from "../types";

export function PortfolioHeader({
  isDark,
  projectCount,
}: PortfolioHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 text-center"
    >
      <h2
        className={`text-4xl font-bold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {isDark ? "Mission Showcase" : "Battle Victories"}
      </h2>
      <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {projectCount} Selected Project{projectCount !== 1 ? "s" : ""}
      </p>
    </motion.div>
  );
}
