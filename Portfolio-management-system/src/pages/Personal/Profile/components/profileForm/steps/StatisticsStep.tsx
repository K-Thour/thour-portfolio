import React from "react";
import { motion } from "motion/react";
import { BarChart3, AlertCircle } from "lucide-react";
import utils from "../../../../../../utils";
import { profileStatisticsSchema } from "../../../../../../validations/profile";
import { useStore } from "@tanstack/react-form";

const { cn } = utils.tailwindUtils;

interface StatisticsStepProps {
  form: any;
  isDark?: boolean;
}

export const StatisticsStep: React.FC<StatisticsStepProps> = ({ form }) => {
  const values = useStore(form.store, (state: any) => state.values);

  const createField = (name: string, label: string, placeholder: string) => (
    <form.Field
      name={name}
      validators={{
        onChange: ({ value }: { value: any }) => {
          try {
            profileStatisticsSchema.validateSyncAt(name, { [name]: value });
            return undefined;
          } catch (err: any) {
            return err.message;
          }
        },
      }}
    >
      {(field: any) => {
        const hasError =
          field.state.meta.isTouched && field.state.meta.errors.length > 0;
        return (
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              {label}
            </label>
            <input
              type="number"
              min="0"
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(parseInt(e.target.value, 10) || 0)
              }
              className={cn(
                "w-full px-4 py-2.5 rounded-xl border bg-accent/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                hasError
                  ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                  : "border-border/50",
              )}
              placeholder={placeholder}
            />
            {hasError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs text-destructive font-medium flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{field.state.meta.errors.join(", ")}</span>
              </motion.p>
            )}
          </div>
        );
      }}
    </form.Field>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold tracking-tight text-foreground">
            Career Statistics
          </h3>
          <p className="text-xs text-muted-foreground">
            Quantify your track record and production milestones
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {createField("experience", "Years of Experience", "5")}
        {createField("completedProjects", "Completed Projects", "150")}
        {createField("solvedProblems", "Problems Solved", "1000")}
        {createField("happyClients", "Happy Clients", "50")}
      </div>

      {/* Stats Live Preview */}
      <div className="p-4 rounded-2xl border border-border/40 bg-accent/20 mt-4">
        <p className="text-xs font-semibold text-muted-foreground mb-3">
          Live Showcase Preview:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-card/60 border border-border/40 text-center">
            <div className="text-2xl font-bold tracking-tight text-primary">
              {values.experience || 0}+
            </div>
            <div className="text-[11px] font-medium text-muted-foreground">
              Years Experience
            </div>
          </div>
          <div className="p-3 rounded-xl bg-card/60 border border-border/40 text-center">
            <div className="text-2xl font-bold tracking-tight text-primary">
              {values.completedProjects || 0}+
            </div>
            <div className="text-[11px] font-medium text-muted-foreground">
              Projects
            </div>
          </div>
          <div className="p-3 rounded-xl bg-card/60 border border-border/40 text-center">
            <div className="text-2xl font-bold tracking-tight text-primary">
              {values.solvedProblems || 0}+
            </div>
            <div className="text-[11px] font-medium text-muted-foreground">
              Problems
            </div>
          </div>
          <div className="p-3 rounded-xl bg-card/60 border border-border/40 text-center">
            <div className="text-2xl font-bold tracking-tight text-primary">
              {values.happyClients || 0}+
            </div>
            <div className="text-[11px] font-medium text-muted-foreground">
              Happy Clients
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsStep;
