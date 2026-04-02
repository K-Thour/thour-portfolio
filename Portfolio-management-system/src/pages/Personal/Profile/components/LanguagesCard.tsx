import { motion } from "motion/react";
import { Target } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { LanguagesCardProps } from "../types";
import { LanguageProgress } from "./LanguageProgress";

export function LanguagesCard({ languages }: LanguagesCardProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`p-6 rounded-2xl border ${
        isDark
          ? "bg-slate-800/50 border-red-500/20"
          : "bg-linear-to-br from-white to-blue-50 border-blue-300/40 shadow-md"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isDark
              ? "bg-linear-to-br from-red-600 to-yellow-500"
              : "bg-linear-to-br from-blue-600 to-blue-400 shadow-lg shadow-blue-500/30"
          }`}
        >
          <Target className="w-5 h-5 text-white" />
        </div>
        <h3
          className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Languages
        </h3>
      </div>
      <div className="space-y-4">
        {languages.map((lang, index) => (
          <LanguageProgress
            key={index}
            lang={lang}
            index={index}
            isDark={isDark}
          />
        ))}
      </div>
    </motion.div>
  );
}
