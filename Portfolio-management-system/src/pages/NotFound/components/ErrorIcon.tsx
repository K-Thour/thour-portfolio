import { motion } from "motion/react";
import { Shield, Axe } from "lucide-react";

interface ErrorIconProps {
  isDark: boolean;
}

export const ErrorIcon: React.FC<ErrorIconProps> = ({ isDark }) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="mb-8"
    >
      <div
        className={`w-32 h-32 mx-auto rounded-3xl flex items-center justify-center ${
          isDark
            ? "bg-gradient-to-br from-red-600 to-yellow-500 shadow-2xl shadow-red-500/50"
            : "bg-gradient-to-br from-blue-600 to-blue-400 shadow-2xl shadow-blue-500/50"
        }`}
      >
        {isDark ? (
          <Shield className="w-16 h-16 text-white" />
        ) : (
          <Axe className="w-16 h-16 text-white" />
        )}
      </div>
    </motion.div>
  );
};
