import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  Circle,
} from "lucide-react";
import type { ContactCardProps } from "../types";

export function ContactCard({
  contact,
  index,
  onView,
  onEdit,
  onDelete,
  onSetActive,
}: ContactCardProps) {
  return (
    <motion.div
      key={contact.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 26,
        stiffness: 280,
        delay: index * 0.05,
      }}
      className={`p-6 rounded-3xl border group relative overflow-hidden bg-card/75 backdrop-blur-xl transition-all ${
        contact.isActive
          ? "border-emerald-500/40 ring-2 ring-emerald-500/20 shadow-xs"
          : "border-border/40 hover:border-primary/30 shadow-xs"
      }`}
    >
      {/* Active Badge */}
      {contact.isActive && (
        <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
          <CheckCircle className="w-3 h-3" />
          ACTIVE
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">
            {contact.label}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>{contact.email}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>{contact.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>
                {contact.city}, {contact.state}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-border/30">
          {!contact.isActive ? (
            <button
              onClick={() => onSetActive(contact.id)}
              type="button"
              className="flex-1 px-3 py-2 rounded-xl text-xs font-medium border border-border/60 hover:bg-accent/60 text-foreground active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Circle className="w-3.5 h-3.5" />
              <span>Set Active</span>
            </button>
          ) : (
            <div className="flex-1 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-center flex items-center justify-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Active</span>
            </div>
          )}

          <button
            onClick={() => onView(contact)}
            type="button"
            className="p-2 rounded-xl border border-border/60 hover:bg-accent/60 text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
            aria-label="View contact"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(contact)}
            type="button"
            className="p-2 rounded-xl border border-border/60 hover:bg-accent/60 text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
            aria-label="Edit contact"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            type="button"
            className="p-2 rounded-xl border border-destructive/30 hover:bg-destructive/10 text-destructive active:scale-95 transition-all cursor-pointer"
            aria-label="Delete contact"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
