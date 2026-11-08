import { motion } from "motion/react";
import { Brain, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import type { AISettingsCardProps } from "../types";

export function AISettingsCard({ settings, onUpdate }: AISettingsCardProps) {
  const remaining = Math.max(0, settings.dailyLimit - settings.currentUsage);
  const percentage = Math.min(
    100,
    (settings.currentUsage / settings.dailyLimit) * 100,
  );
  const isNearLimit = percentage > 80;
  const isAtLimit = remaining === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 280 }}
      className="p-6 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            AI Engine Quota
          </h2>
          <p className="text-xs text-muted-foreground">
            Daily model requests and automated generation thresholds
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Usage Box */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isAtLimit
              ? "bg-destructive/10 border-destructive/30"
              : isNearLimit
                ? "bg-amber-500/10 border-amber-500/30"
                : "bg-emerald-500/10 border-emerald-500/30"
          }`}
        >
          <div className="flex items-center justify-between gap-2.5 mb-3">
            <div className="flex items-center gap-2.5">
              {isAtLimit ? (
                <XCircle className="w-5 h-5 text-destructive shrink-0" />
              ) : isNearLimit ? (
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              )}
              <span className="font-semibold text-sm text-foreground">
                Daily Request Utilization
              </span>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                isAtLimit
                  ? "bg-destructive/15 text-destructive border-destructive/30"
                  : isNearLimit
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                    : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
              }`}
            >
              {isAtLimit ? "At Limit" : isNearLimit ? "Near Limit" : "Normal"}
            </span>
          </div>

          <div className="mb-3">
            <div className="flex justify-between text-xs font-medium mb-2">
              <span className="text-muted-foreground">
                {settings.currentUsage} / {settings.dailyLimit} requests
              </span>
              <span
                className={`font-semibold ${
                  isAtLimit
                    ? "text-destructive"
                    : isNearLimit
                      ? "text-amber-500"
                      : "text-emerald-600 dark:text-emerald-400"
                }`}
              >
                {remaining} remaining
              </span>
            </div>

            <div className="h-2 rounded-full overflow-hidden bg-accent/60">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ type: "spring", damping: 26, stiffness: 280 }}
                className={`h-full rounded-full transition-colors ${
                  isAtLimit
                    ? "bg-destructive"
                    : isNearLimit
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            {isAtLimit
              ? "You have reached your daily quota. Quotas reset at 00:00 UTC."
              : isNearLimit
                ? "You are nearing your daily quota limit. Consider spacing out requests."
                : "You are comfortably within your daily compute allocation."}
          </p>
        </div>

        {/* Feature Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/25 border border-border/40">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Enable AI Services
            </p>
            <p className="text-xs text-muted-foreground">
              Toggle automated resume writing and content generation
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={settings.isEnabled}
            aria-label="Toggle AI features"
            onClick={() =>
              onUpdate({ ...settings, isEnabled: !settings.isEnabled })
            }
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 ${
              settings.isEnabled ? "bg-primary" : "bg-accent/90 border-border/60"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                settings.isEnabled ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
