import { motion } from "motion/react";
import utils from "../../../../../utils";
import type { FieldType } from "../../../hooks/useExperienceForm.types";

const { cn } = utils.tailwindUtils;

interface DescriptionStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isDark: boolean;
}

export const DescriptionStep: React.FC<DescriptionStepProps> = ({
  form,
  isDark,
}) => {
  return (
    <div className="space-y-4">
      <form.Field
        name="description"
        validators={{
          onChange: ({ value }: { value: string }) => {
            if (value && value.length > 2000)
              return "Description must be less than 2000 characters";
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
              Job Description
            </label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Describe your role, responsibilities, and achievements..."
              rows={8}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent outline-none transition-all resize-none",
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
            <p
              className={cn(
                "mt-2 text-xs",
                isDark ? "text-slate-500" : "text-slate-400",
              )}
            >
              {field.state.value?.length || 0} / 2000 characters
            </p>
          </div>
        )}
      </form.Field>
    </div>
  );
};

export default DescriptionStep;
