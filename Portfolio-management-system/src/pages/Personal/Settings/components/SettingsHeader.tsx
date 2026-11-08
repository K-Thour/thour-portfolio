import { motion } from "motion/react";
import {
  Settings,
  Save,
  RotateCcw,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import type { SettingsHeaderProps } from "../types";

export function SettingsHeader({
  onSave,
  onReset,
  onBack,
  hasChanges,
  autoSave,
  isSaving = false,
}: SettingsHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 280 }}
      className="p-6 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all bg-accent/40 hover:bg-accent border border-border/50 text-foreground active:scale-[0.98] shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs shrink-0">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Settings
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage your preferences, security credentials, and AI quotas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {hasChanges && !autoSave && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Unsaved changes</span>
            </motion.div>
          )}

          {!autoSave && (
            <>
              <button
                type="button"
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-border/50 bg-accent/40 hover:bg-accent text-foreground transition-all active:scale-[0.98] cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={onSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{isSaving ? "Saving..." : "Save"}</span>
              </button>
            </>
          )}

          {autoSave && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Auto-save enabled</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
