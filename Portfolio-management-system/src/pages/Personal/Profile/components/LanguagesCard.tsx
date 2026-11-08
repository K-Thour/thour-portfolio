import { motion } from "motion/react";
import { Target } from "lucide-react";
import type { LanguagesCardProps } from "../types";
import { LanguageProgress } from "./LanguageProgress";

export function LanguagesCard({ languages }: LanguagesCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 280, delay: 0.15 }}
      className="p-6 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold tracking-tight text-foreground">
            Languages & Communication
          </h3>
          <p className="text-xs text-muted-foreground">
            Proficiency and spoken fluency
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {languages.map((lang, index) => (
          <LanguageProgress
            key={index}
            lang={lang}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}
