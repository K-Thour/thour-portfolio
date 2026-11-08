import { motion } from "motion/react";
import { Edit2, Trash2 } from "lucide-react";
import type { Technology } from "../../types";

interface TechnologyCardProps {
  tech: Technology;
  index: number;
  onEdit: (tech: Technology) => void;
  onDelete: (id: string | number) => void;
}

export function TechnologyCard({
  tech,
  onEdit,
  onDelete,
}: TechnologyCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: "spring",
        damping: 26,
        stiffness: 280,
      }}
      className="p-5 rounded-2xl border border-border/40 bg-card/75 backdrop-blur-xl hover:border-primary/30 shadow-xs transition-all group"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl overflow-hidden bg-primary/10 border border-primary/20 shrink-0">
            {tech.icon &&
            (/^https?:\/\/.+/.test(tech.icon) || tech.icon.includes("/")) ? (
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-7 h-7 object-contain"
              />
            ) : (
              <span>{tech.icon}</span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm sm:text-base tracking-tight text-foreground truncate">
              {tech.name}
            </h3>
            <span className="inline-block mt-0.5 text-xs px-2.5 py-0.5 rounded-full bg-accent/60 text-muted-foreground border border-border/40 font-medium">
              {tech.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onEdit(tech)}
            type="button"
            className="p-2 rounded-xl transition-colors hover:bg-accent/60 text-muted-foreground hover:text-foreground active:scale-95 cursor-pointer"
            aria-label={`Edit ${tech.name}`}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(tech.id)}
            type="button"
            className="p-2 rounded-xl transition-colors hover:bg-destructive/10 text-muted-foreground hover:text-destructive active:scale-95 cursor-pointer"
            aria-label={`Delete ${tech.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
