import { motion } from "motion/react";
import utils from "../../../../../../utils";
import type {
  FieldType,
  FieldTypeNull,
  FieldTypeBool,
} from "../../../hooks/useExperienceForm.types";

const { cn } = utils.tailwindUtils;

interface BasicInfoStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isDark: boolean;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  form,
  isDark,
}) => {
  return (
    <div className="space-y-4">
      <form.Field
        name="jobTitle"
        validators={{
          onChange: ({ value }: { value: string }) => {
            if (!value || value.length < 2)
              return "Job title must be at least 2 characters";
            if (value.length > 100)
              return "Job title must be less than 100 characters";
            return undefined;
          },
        }}
      >
        {(field: FieldType) => (
          <div>
            <label
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-slate-300" : "text-slate-700",
              )}
            >
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="e.g. Senior Full Stack Developer"
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                isDark
                  ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                  : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
              )}
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
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

      <form.Field
        name="company"
        validators={{
          onChange: ({ value }: { value: string }) => {
            if (!value || value.length < 2)
              return "Company name must be at least 2 characters";
            if (value.length > 100)
              return "Company name must be less than 100 characters";
            return undefined;
          },
        }}
      >
        {(field: FieldType) => (
          <div>
            <label
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-slate-300" : "text-slate-700",
              )}
            >
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="e.g. Tech Giants Inc."
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                isDark
                  ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                  : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
              )}
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
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

      <form.Field
        name="location"
        validators={{
          onChange: ({ value }: { value: string }) => {
            if (!value || value.length < 2)
              return "Location must be at least 2 characters";
            if (value.length > 100)
              return "Location must be less than 100 characters";
            return undefined;
          },
        }}
      >
        {(field: FieldType) => (
          <div>
            <label
              className={cn(
                "block text-sm font-medium mb-2",
                isDark ? "text-slate-300" : "text-slate-700",
              )}
            >
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="e.g. San Francisco, CA"
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                isDark
                  ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                  : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
              )}
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
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

      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name="startDate"
          validators={{
            onChange: ({ value }: { value: string }) => {
              if (!value) return "Start date is required";
              return undefined;
            },
          }}
        >
          {(field: FieldType) => (
            <div>
              <label
                className={cn(
                  "block text-sm font-medium mb-2",
                  isDark ? "text-slate-300" : "text-slate-700",
                )}
              >
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="month"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                  isDark
                    ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                    : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
                )}
              />
              {field.state.meta.isTouched &&
                field.state.meta.errors.length > 0 && (
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

        <form.Field name="endDate">
          {(field: FieldTypeNull) => (
            <div>
              <label
                className={cn(
                  "block text-sm font-medium mb-2",
                  isDark ? "text-slate-300" : "text-slate-700",
                )}
              >
                End Date
              </label>
              <input
                type="month"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value || null)}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all",
                  isDark
                    ? "border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20"
                    : "border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20",
                )}
              />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="isCurrent">
        {(field: FieldTypeBool) => (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.target.checked)}
              className="w-5 h-5 rounded border-slate-400 text-orange-500 focus:ring-orange-500/20"
            />
            <span
              className={cn(
                "text-sm",
                isDark ? "text-slate-300" : "text-slate-700",
              )}
            >
              I currently work here
            </span>
          </label>
        )}
      </form.Field>
    </div>
  );
};

export default BasicInfoStep;
