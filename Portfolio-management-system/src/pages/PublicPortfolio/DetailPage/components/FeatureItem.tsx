import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface FeatureItemProps {
  feature: string;
  index: number;
  isInView: boolean;
  isDark?: boolean;
}

export function FeatureItem({
  feature,
  index,
  isInView,
}: FeatureItemProps) {
  return (
    <motion.div
      key={feature}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{
        type: "spring",
        damping: 26,
        stiffness: 280,
        delay: 0.2 + index * 0.04,
      }}
      className="flex items-start gap-3 p-4 rounded-2xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs hover:shadow-md transition-all duration-200"
    >
      <CheckCircle2 className="w-5 h-5 shrink-0 text-primary mt-0.5" />
      <span className="text-sm font-medium text-foreground leading-relaxed">
        {feature}
      </span>
    </motion.div>
  );
}

