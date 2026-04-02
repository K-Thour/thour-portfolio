import { motion } from "motion/react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { StatsGridProps } from "../types";
import { getStats } from "../utils/getStats.utils";

export function StatsGrid({ profileData }: StatsGridProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  const stats = getStats(profileData, isDark);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-2xl border ${
              isDark
                ? "bg-slate-800/50 border-red-500/20 hover:border-red-500/50"
                : "bg-linear-to-br from-white to-blue-50 border-blue-300/40 hover:border-blue-500/60 shadow-md hover:shadow-lg hover:shadow-blue-500/20"
            } transition-all group`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                isDark
                  ? "bg-linear-to-br from-red-600 to-yellow-500"
                  : "bg-linear-to-br from-blue-600 to-blue-400 shadow-lg shadow-blue-500/30"
              }`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div
              className={`text-4xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {stat.value}
              {stat.suffix}
            </div>
            <div
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
            >
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
