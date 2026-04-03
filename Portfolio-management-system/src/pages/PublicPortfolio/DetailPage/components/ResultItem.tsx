import { motion } from "motion/react";

interface ResultItemProps {
  result: string;
  index: number;
  isInView: boolean;
  isDark: boolean;
}

export function ResultItem({
  result,
  index,
  isInView,
  isDark,
}: ResultItemProps) {
  return (
    <motion.div
      key={result}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
      className={`p-6 rounded-xl border text-center ${
        isDark
          ? "bg-linear-to-br from-red-900/30 to-yellow-900/30 border-red-500/30"
          : "bg-linear-to-br from-blue-100 to-blue-200 border-blue-400/40 shadow-md"
      }`}
    >
      <p
        className={`text-lg font-medium ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {result}
      </p>
    </motion.div>
  );
}
