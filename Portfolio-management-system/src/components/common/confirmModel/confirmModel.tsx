import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useEffect } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  loadingText?: string;
}

function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  loadingText = "Deleting...",
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          role="alertdialog"
          aria-modal="true"
          className="fixed inset-0 z-60 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={isLoading ? undefined : onCancel}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs select-none"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-md select-none z-10"
          >
            <div className="rounded-2xl border border-border/40 bg-card/90 backdrop-blur-2xl p-6 shadow-2xl shadow-black/20 text-card-foreground">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.05, type: "spring", damping: 20 }}
                  className="size-14 rounded-full flex items-center justify-center bg-destructive/10 text-destructive ring-1 ring-destructive/20"
                >
                  <AlertTriangle className="size-7" />
                </motion.div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-center tracking-tight mb-2 text-foreground">
                {title}
              </h3>

              {/* Message */}
              <p className="text-center text-sm text-muted-foreground mb-6 leading-relaxed">
                {message}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.97] cursor-pointer disabled:opacity-75 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-sm shadow-destructive/20"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>{loadingText}</span>
                    </>
                  ) : (
                    <span>{confirmText}</span>
                  )}
                </button>
              </div>

              {/* Warning Text */}
              <p className="text-[11px] text-center text-muted-foreground/80 mt-4">
                This action cannot be undone.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmModal;
