import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { HobbiesCardProps } from "../types";

export function HobbiesCard({ hobbies }: HobbiesCardProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
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
          <Heart className="w-5 h-5 text-white" />
        </div>
        <h3
          className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Hobbies & Interests
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {hobbies.map((hobby, index) => (
          <span
            key={index}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              isDark
                ? "bg-slate-700/50 text-white"
                : "bg-blue-100 text-gray-900"
            }`}
          >
            {hobby}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
