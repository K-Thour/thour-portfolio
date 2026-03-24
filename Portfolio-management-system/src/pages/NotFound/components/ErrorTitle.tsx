import { motion } from "motion/react";

interface ErrorTitleProps {
  isDark: boolean;
}

export const ErrorTitle: React.FC<ErrorTitleProps> = ({ isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h1
        className={`text-9xl font-bold mb-4 ${
          isDark
            ? "bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent"
            : "bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent"
        }`}
      >
        404
      </h1>
    </motion.div>
  );
};
