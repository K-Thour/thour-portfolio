import { motion } from "motion/react";
import { useAppSelector } from "../../../../../../hooks/useRedux";
import type { RootState } from "../../../../../../store/store";
import type { DescriptionStepProps } from "../../types";

export function DescriptionStep({
  formData,
  errors,
  onFormDataChange,
}: DescriptionStepProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Short Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            onFormDataChange({ ...formData, description: e.target.value })
          }
          rows={3}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          } ${errors.description ? "border-red-500" : ""}`}
          placeholder="A brief overview of the project..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Long Description *
        </label>
        <textarea
          value={formData.longDescription}
          onChange={(e) =>
            onFormDataChange({ ...formData, longDescription: e.target.value })
          }
          rows={6}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          } ${errors.longDescription ? "border-red-500" : ""}`}
          placeholder="Detailed description of the project, its goals, challenges, and solutions..."
        />
        {errors.longDescription && (
          <p className="text-red-500 text-sm mt-1">{errors.longDescription}</p>
        )}
      </div>
    </motion.div>
  );
}
