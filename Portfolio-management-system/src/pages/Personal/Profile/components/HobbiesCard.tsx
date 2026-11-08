import { motion } from "motion/react";
import { Heart } from "lucide-react";
import type { HobbiesCardProps } from "../types";

export function HobbiesCard({ hobbies }: HobbiesCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 280, delay: 0.1 }}
      className="p-6 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs">
          <Heart className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold tracking-tight text-foreground">
            Hobbies & Interests
          </h3>
          <p className="text-xs text-muted-foreground">
            Personal pursuits and creative pastimes
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {hobbies.map((hobby, index) => (
          <span
            key={index}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-accent/50 hover:bg-accent text-foreground border border-border/40 shadow-2xs transition-colors"
          >
            {hobby}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
