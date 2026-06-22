import React from "react";
import { motion } from "motion/react";
import { BarChart3 } from "lucide-react";
import utils from "../../../../../../utils";
import { profileStatisticsSchema } from "../../../../../../validations/profile";

import { useStore } from "@tanstack/react-form";

const { cn } = utils.tailwindUtils;

interface StatisticsStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isDark: boolean;
}

export const StatisticsStep: React.FC<StatisticsStepProps> = ({
  form,
  isDark,
}) => {
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
      {(field: any) => (
        <div>
          <label
            className={cn(
              "block text-sm font-medium mb-2",
              isDark ? "text-gray-300" : "text-gray-800",
            )}
          >
            {label}
          </label>
          <input
            type="number"
            min="0"
            value={field.state.value}
            onChange={(e) => field.handleChange(parseInt(e.target.value) || 0)}
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 focus:ring-blue-500",
              field.state.meta.isTouched && field.state.meta.errors.length > 0
                ? "border-red-500"
                : "",
            )}
            placeholder={placeholder}
          />
          {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"
            >
              <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
              {field.state.meta.errors.join(", ")}
            </motion.p>
          )}
        </div>
      )}
    </form.Field>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            isDark
              ? "bg-linear-to-br from-red-600 to-yellow-500"
              : "bg-linear-to-br from-blue-600 to-blue-400",
          )}
        >
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3
            className={cn("font-bold", isDark ? "text-white" : "text-gray-900")}
          >
            Career Statistics
          </h3>
          <p
            className={cn(
              "text-sm",
              isDark ? "text-gray-400" : "text-gray-600",
            )}
          >
            Your professional achievements
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {createField("experience", "Years of Experience", "5")}
        {createField("completedProjects", "Completed Projects", "150")}
        {createField("solvedProblems", "Problems Solved", "1000")}
        {createField("happyClients", "Happy Clients", "50")}
      </div>

      {/* Stats Preview */}
      <div
        className={cn(
          "p-5 rounded-xl border mt-6",
          isDark
            ? "bg-slate-800/50 border-red-500/20"
            : "bg-blue-50/50 border-blue-300/40",
        )}
      >
        <p
          className={cn(
            "text-xs mb-3",
            isDark ? "text-gray-500" : "text-gray-600",
          )}
        >
          Stats Preview:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div
              className={cn(
                "text-2xl font-bold",
                isDark ? "text-red-400" : "text-blue-600",
              )}
            >
              {values.experience || 0}+
            </div>
            <div
              className={cn(
                "text-xs",
                isDark ? "text-gray-400" : "text-gray-600",
              )}
            >
              Years
            </div>
          </div>
          <div className="text-center">
            <div
              className={cn(
                "text-2xl font-bold",
                isDark ? "text-red-400" : "text-blue-600",
              )}
            >
              {values.completedProjects || 0}+
            </div>
            <div
              className={cn(
                "text-xs",
                isDark ? "text-gray-400" : "text-gray-600",
              )}
            >
              Projects
            </div>
          </div>
          <div className="text-center">
            <div
              className={cn(
                "text-2xl font-bold",
                isDark ? "text-red-400" : "text-blue-600",
              )}
            >
              {values.solvedProblems || 0}+
            </div>
            <div
              className={cn(
                "text-xs",
                isDark ? "text-gray-400" : "text-gray-600",
              )}
            >
              Problems
            </div>
          </div>
          <div className="text-center">
            <div
              className={cn(
                "text-2xl font-bold",
                isDark ? "text-red-400" : "text-blue-600",
              )}
            >
              {values.happyClients || 0}+
            </div>
            <div
              className={cn(
                "text-xs",
                isDark ? "text-gray-400" : "text-gray-600",
              )}
            >
              Clients
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsStep;
