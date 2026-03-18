import React from "react";
import { motion } from "motion/react";
import { Shield, Hammer } from "lucide-react";
import type { theme } from "../../../interfaces/common/common.interface";

export const LoginCardHeader: React.FC<theme> = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col items-center mb-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
          isDark
            ? "bg-gradient-to-br from-red-500 to-yellow-500 shadow-red-500/40"
            : "bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/30"
        }`}
      >
        {isDark ? (
          <Shield className="w-8 h-8 text-white" />
        ) : (
          <Hammer className="w-8 h-8 text-white" />
        )}
      </motion.div>

      <h1
        className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
      >
        {isDark ? "Admin Portal" : "Command Center"}
      </h1>
      <p
        className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
      >
        {isDark
          ? "Access your mission control"
          : "Enter the Hall of Management"}
      </p>
    </div>
  );
};
