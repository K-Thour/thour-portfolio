import { motion } from "motion/react";
import { Upload } from "lucide-react";
import { useAppSelector } from "../../../../../../hooks/useRedux";
import type { RootState } from "../../../../../../store/store";
import type { BasicInfoStepProps } from "../../types";

export function BasicInfoStep({
  formData,
  errors,
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
          Project Title *
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
          placeholder="AI Code Assistant"
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
          placeholder="AI & Automation"
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
          <option value="AI & Automation">AI & Automation</option>
          <option value="Web Application">Web Application</option>
          <option value="Mobile App">Mobile App</option>
          <option value="DevOps & Monitoring">DevOps & Monitoring</option>
          <option value="E-commerce">E-commerce</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Project Image URL
        </label>
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center ${
            isDark
              ? "border-red-500/20 hover:border-red-500/50"
              : "border-blue-300/50 hover:border-blue-500/70"
          }`}
        >
          <Upload
            className={`w-8 h-8 mx-auto mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          />
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Enter image URL or upload
          </p>
          <input
            type="text"
            value={formData.image}
            onChange={(e) =>
              onFormDataChange({ ...formData, image: e.target.value })
            }
            className={`w-full mt-3 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>
    </motion.div>
  );
}
