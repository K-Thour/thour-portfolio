import { motion } from "motion/react";
import { AlertCircle } from "lucide-react";

interface ReasonInputProps {
  reason: string;
  isDark?: boolean;
  onChange: (value: string) => void;
}

export function ReasonInput({ reason, onChange }: ReasonInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ type: "spring", damping: 26, stiffness: 300 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-1.5">
        <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
        <label className="block text-xs font-semibold text-foreground">
          Reason for Status Change <span className="text-destructive">*</span>
        </label>
      </div>
      <textarea
        value={reason}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Provide brief context for this status update..."
        rows={3}
        className="w-full px-4 py-3 rounded-2xl border border-border/50 bg-accent/25 backdrop-blur-md text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all resize-none shadow-2xs"
      />
    </motion.div>
  );
}
