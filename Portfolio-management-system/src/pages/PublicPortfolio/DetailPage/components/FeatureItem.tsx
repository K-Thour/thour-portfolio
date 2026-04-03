import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface FeatureItemProps {
  feature: string;
  index: number;
  isInView: boolean;
  isDark: boolean;
}

export function FeatureItem({
  feature,
  index,
  isInView,
  isDark,
}: FeatureItemProps) {
  return (
    <motion.div
      key={feature}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
      className={`flex items-start gap-3 p-4 rounded-xl border transition-all hover:scale-105 ${
        isDark
          ? "bg-slate-800/50 border-red-500/20 hover:border-red-500/50"
          : "bg-linear-to-br from-blue-50 to-blue-100 border-blue-300/30 hover:border-blue-400/50 shadow-sm"
      }`}
    >
      <CheckCircle2
        className={`w-6 h-6 shrink-0 ${isDark ? "text-red-500" : "text-blue-600"}`}
      />
      <span className={isDark ? "text-gray-300" : "text-gray-800"}>
        {feature}
      </span>
    </motion.div>
  );
}
