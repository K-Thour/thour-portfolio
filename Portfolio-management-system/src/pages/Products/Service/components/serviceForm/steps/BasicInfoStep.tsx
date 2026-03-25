import { motion } from "motion/react";
import { useAppSelector } from "../../../../../../hooks/useRedux";
import type { RootState } from "../../../../../../store/store";
import type { BasicInfoStepProps } from "../../types";

export function BasicInfoStep({
  formData,
  errors,
  categories,
  onFormDataChange,
}: BasicInfoStepProps) {
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
          Service Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            onFormDataChange({ ...formData, title: e.target.value })
          }
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          } ${errors.title ? "border-red-500" : ""}`}
          placeholder="Full Stack Web Development"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Subtitle *
        </label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={(e) =>
            onFormDataChange({ ...formData, subtitle: e.target.value })
          }
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          } ${errors.subtitle ? "border-red-500" : ""}`}
          placeholder="Build modern, scalable applications"
        />
        {errors.subtitle && (
          <p className="text-red-500 text-sm mt-1">{errors.subtitle}</p>
        )}
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Category *
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            onFormDataChange({ ...formData, category: e.target.value })
          }
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          } ${errors.category ? "border-red-500" : ""}`}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

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
          placeholder="A brief overview of what this service offers..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>
    </motion.div>
  );
}
