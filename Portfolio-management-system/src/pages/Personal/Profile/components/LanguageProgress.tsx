import { motion } from "motion/react";
import type { Language } from "../types";

interface LanguageProgressProps {
  lang: Language;
  index: number;
  isDark: boolean;
}

export function LanguageProgress({
  lang,
  index,
  isDark,
}: LanguageProgressProps) {
  return (
    <div key={index}>
      <div className="flex items-center justify-between mb-2">
        <span
          className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {lang.name}
        </span>
        <span
          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
        >
          {lang.proficiency}%
        </span>
      </div>
      <div
        className={`h-2 rounded-full overflow-hidden ${
          isDark ? "bg-slate-900/50" : "bg-gray-200"
        }`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${lang.proficiency}%` }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          className={`h-full ${
            isDark
              ? "bg-linear-to-r from-red-600 to-yellow-500"
              : "bg-linear-to-r from-blue-600 to-blue-400"
          }`}
        />
      </div>
    </div>
  );
}
