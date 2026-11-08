import { motion } from "motion/react";
import { Edit2, Trash2 } from "lucide-react";
import type { ServiceCardProps } from "./types";

export function ServiceCard({
  service,
  index,
  onEdit,
  onDelete,
  onToggleActive,
}: ServiceCardProps) {
  return (
    <motion.div
      key={service.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 26,
        stiffness: 280,
        delay: index * 0.05,
      }}
      className="p-6 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs hover:border-primary/30 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl overflow-hidden bg-primary/10 border border-primary/20 shrink-0">
            {service.iconType === "emoji" && <span>{service.icon}</span>}
            {service.iconType === "url" && service.iconUrl && (
              <img
                src={service.iconUrl}
                alt={service.title}
                className="w-7 h-7 object-contain"
              />
            )}
            {service.iconType === "upload" && service.iconFile && (
              <img
                src={service.iconFile}
                alt={service.title}
                className="w-7 h-7 object-contain"
              />
            )}
          </div>

          <button
            onClick={() => onToggleActive(service.id)}
            type="button"
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
              service.active
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25"
                : "bg-accent/60 text-muted-foreground border border-border/40 hover:bg-accent"
            }`}
          >
            {service.active ? "Active" : "Inactive"}
          </button>
        </div>

        <h3 className="text-lg font-bold tracking-tight text-foreground mb-1">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
          {service.subtitle || service.description}
        </p>

        <p className="text-xs text-muted-foreground/80 mb-4 font-medium">
          {service.features?.length || 0} deliverables • {service.category}
        </p>
      </div>

      <div className="flex gap-2 pt-2 border-t border-border/30">
        <button
          onClick={() => onEdit(service)}
          type="button"
          aria-label="Edit service"
          className="flex-1 py-2 rounded-xl text-xs font-medium border border-border/60 hover:bg-accent/60 text-foreground active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(service.id)}
          type="button"
          aria-label="Delete service"
          className="flex-1 py-2 rounded-xl text-xs font-medium border border-destructive/30 hover:bg-destructive/10 text-destructive active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </motion.div>
  );
}
