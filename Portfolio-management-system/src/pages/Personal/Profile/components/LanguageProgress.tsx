import { motion } from "motion/react";
import type { Language } from "../types";

interface LanguageProgressProps {
  lang: Language;
  index: number;
  isDark?: boolean;
}

export function LanguageProgress({
  lang,
  index,
}: LanguageProgressProps) {
  return (
    <div key={index}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-sm text-foreground">
          {lang.name}
        </span>
        <span className="text-xs text-muted-foreground">
          {lang.proficiency}%
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden bg-accent/60">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${lang.proficiency}%` }}
          transition={{
            type: "spring",
            damping: 24,
            stiffness: 200,
            delay: 0.2 + index * 0.08,
          }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
}
