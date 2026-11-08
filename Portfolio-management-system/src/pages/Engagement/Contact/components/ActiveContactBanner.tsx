import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";
import type { ActiveContactBannerProps } from "../types";

export function ActiveContactBanner({
  contact,
}: ActiveContactBannerProps) {
  if (!contact) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 280 }}
      className="p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-xl shadow-xs"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
        <h2 className="text-lg font-bold tracking-tight text-foreground">
          Currently Active Channel: <span className="text-emerald-600 dark:text-emerald-400">{contact.label}</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-card/60 border border-border/40">
          <Mail className="w-4 h-4 text-primary shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Email
            </p>
            <p className="text-sm font-medium text-foreground truncate">
              {contact.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-card/60 border border-border/40">
          <Phone className="w-4 h-4 text-primary shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Phone
            </p>
            <p className="text-sm font-medium text-foreground truncate">
              {contact.phone}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-card/60 border border-border/40">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Location
            </p>
            <p className="text-sm font-medium text-foreground truncate">
              {contact.city}, {contact.state}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
