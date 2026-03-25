import { motion } from "motion/react";
import { useAppSelector } from "../../../../../../hooks/useRedux";
import type { RootState } from "../../../../../../store/store";
import type { LinksStepProps } from "../../types";

export function LinksStep({
  formData,
  errors,
  onFormDataChange,
}: LinksStepProps) {
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
          GitHub Repository URL *
        </label>
        <input
          type="url"
          value={formData.github}
          onChange={(e) =>
            onFormDataChange({ ...formData, github: e.target.value })
          }
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          } ${errors.github ? "border-red-500" : ""}`}
          placeholder="https://github.com/username/project"
        />
        {errors.github && (
          <p className="text-red-500 text-sm mt-1">{errors.github}</p>
        )}
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Live Project URL *
        </label>
        <input
          type="url"
          value={formData.liveUrl}
          onChange={(e) =>
            onFormDataChange({ ...formData, liveUrl: e.target.value })
          }
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          } ${errors.liveUrl ? "border-red-500" : ""}`}
          placeholder="https://project.com"
        />
        {errors.liveUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.liveUrl}</p>
        )}
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Project Status
        </label>
        <select
          value={formData.status}
          onChange={(e) =>
            onFormDataChange({
              ...formData,
              status: e.target.value as "In Progress" | "Completed" | "On Hold",
            })
          }
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          }`}
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>
    </motion.div>
  );
}
