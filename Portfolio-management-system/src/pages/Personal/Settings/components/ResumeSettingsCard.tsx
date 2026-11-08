import { motion } from "motion/react";
import { FileText, AlertCircle, Sparkles } from "lucide-react";
import type { ResumeSettingsCardProps } from "../types";

export function ResumeSettingsCard({
  settings,
  onUpdate,
}: ResumeSettingsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 280, delay: 0.1 }}
      className="p-6 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Resume Generator
          </h2>
          <p className="text-xs text-muted-foreground">
            Configure resume creation studio and storage limits
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {!settings.isGenerationEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex items-start gap-3 p-4 rounded-2xl border bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
            <div>
              <p className="font-semibold text-sm">
                Resume Generation Disabled
              </p>
              <p className="text-xs mt-1 opacity-90">
                The Resume page will be hidden from sidebar navigation. Existing saved resumes remain safe.
              </p>
            </div>
          </motion.div>
        )}

        {/* Feature Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/25 border border-border/40">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Enable Resume Generation
            </p>
            <p className="text-xs text-muted-foreground">
              Display resume studio in navigation and enable exports
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={settings.isGenerationEnabled}
            aria-label="Toggle resume generation"
            onClick={() =>
              onUpdate({
                ...settings,
                isGenerationEnabled: !settings.isGenerationEnabled,
              })
            }
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 ${
              settings.isGenerationEnabled ? "bg-primary" : "bg-accent/90 border-border/60"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                settings.isGenerationEnabled ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        {/* Max Resumes Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-accent/25 border border-border/40">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Max Stored Resumes
            </p>
            <p className="text-xs text-muted-foreground">
              Maximum allowable customized resumes
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-accent/40 border border-border/40 self-start sm:self-auto">
            {[5, 10, 20, 50].map((num) => {
              const isSelected = settings.maxResumes === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => onUpdate({ ...settings, maxResumes: num })}
                  className={`min-w-9 h-8 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer active:scale-[0.98] ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                  }`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        {/* ATS Formatting Rules Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-accent/25 border border-border/40">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                ATS-Optimized Formatting Rules
              </p>
              <p className="text-xs text-muted-foreground">
                Enforce standard typography, single-column alignment, and clean LaTeX schemas for parsing filters.
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={settings.atsOptimized ?? true}
            aria-label="Toggle ATS formatting rules"
            onClick={() =>
              onUpdate({
                ...settings,
                atsOptimized: !(settings.atsOptimized ?? true),
              })
            }
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 ${
              (settings.atsOptimized ?? true)
                ? "bg-primary"
                : "bg-accent/90 border-border/60"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                (settings.atsOptimized ?? true)
                  ? "translate-x-5"
                  : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
