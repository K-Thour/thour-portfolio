import { motion } from "motion/react";

interface ErrorMessageProps {
  isDark: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ isDark }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2
          className={`text-4xl font-bold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {isDark ? "Mission Not Found" : "Path Lost in the Frost"}
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`text-xl mb-12 max-w-2xl mx-auto ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {isDark
          ? "The page you're looking for has been snapped out of existence. Even JARVIS can't locate it."
          : "The path you seek is hidden in the eternal winter. The runes offer no guidance here."}
      </motion.p>
    </>
  );
};
