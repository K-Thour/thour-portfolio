import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

interface ActionButtonsProps {
  isDark?: boolean;
  canConfirm: boolean;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ActionButtons({
  canConfirm,
  isLoading = false,
  onCancel,
  onConfirm,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-3 pt-2">
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onCancel}
        disabled={isLoading}
        className="px-4 py-2.5 rounded-xl text-sm font-medium border border-border/50 bg-accent/40 hover:bg-accent text-foreground transition-all duration-150 cursor-pointer disabled:opacity-50"
      >
        Cancel
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={onConfirm}
        disabled={!canConfirm || isLoading}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Updating...</span>
          </>
        ) : (
          "Update Status"
        )}
      </motion.button>
    </div>
  );
}
