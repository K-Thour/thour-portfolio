import { motion } from "motion/react";
import type { StatsGridProps } from "../types";
import { getStats } from "../utils/getStats.utils";

export function StatsGrid({ profileData }: StatsGridProps) {
  const stats = getStats(profileData);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 26,
              stiffness: 280,
              delay: index * 0.05,
            }}
            className="p-5 sm:p-6 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl hover:border-primary/40 shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 text-primary border border-primary/20 shadow-xs group-hover:scale-105 transition-transform">
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-3xl font-bold tracking-tight text-foreground mb-1">
              {stat.value}
              {stat.suffix}
            </div>
            <div className="text-xs sm:text-sm font-medium text-muted-foreground">
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
