import { motion } from "motion/react";

interface ErrorCodeProps {
  isDark: boolean;
}

export const ErrorCode: React.FC<ErrorCodeProps> = ({ isDark }) => {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className={`mt-8 text-sm font-mono ${
        isDark ? "text-gray-600" : "text-gray-500"
      }`}
    >
      {isDark
        ? "ERROR_CODE: AVENGERS_404_NOT_FOUND"
        : "ERROR_RUNE: RAGNAROK_404_PATH_LOST"}
    </motion.p>
  );
};
