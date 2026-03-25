import { motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { useAppSelector } from "../../../../../../hooks/useRedux";
import type { RootState } from "../../../../../../store/store";
import type { TechFeaturesStepProps } from "../../types";

export function TechFeaturesStep({
  formData,
  errors,
  onAddArrayItem,
  onRemoveArrayItem,
}: TechFeaturesStepProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Technologies *
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="tech-input"
            className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="React, TypeScript, etc."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = e.currentTarget;
                onAddArrayItem("technologies", input.value);
                input.value = "";
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById(
                "tech-input",
              ) as HTMLInputElement;
              onAddArrayItem("technologies", input.value);
              input.value = "";
            }}
            className={`px-4 py-3 rounded-xl font-medium transition-all ${
              isDark
                ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg"
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {errors.technologies && (
          <p className="text-red-500 text-sm mt-1">{errors.technologies}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-3">
          {formData.technologies.map((tech: string, index: number) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                isDark ? "bg-slate-700 text-white" : "bg-blue-100 text-gray-900"
              }`}
            >
              {tech}
              <button
                type="button"
                onClick={() => onRemoveArrayItem("technologies", index)}
                className="hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Key Features *
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="feature-input"
            className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="Add a key feature"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = e.currentTarget;
                onAddArrayItem("features", input.value);
                input.value = "";
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById(
                "feature-input",
              ) as HTMLInputElement;
              onAddArrayItem("features", input.value);
              input.value = "";
            }}
            className={`px-4 py-3 rounded-xl font-medium transition-all ${
              isDark
                ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg"
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {errors.features && (
          <p className="text-red-500 text-sm mt-1">{errors.features}</p>
        )}
        <div className="space-y-2 mt-3">
          {formData.features.map((feature: string, index: number) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-lg flex items-center justify-between ${
                isDark ? "bg-slate-700/50" : "bg-blue-50"
              }`}
            >
              <span className={isDark ? "text-white" : "text-gray-900"}>
                {feature}
              </span>
              <button
                type="button"
                onClick={() => onRemoveArrayItem("features", index)}
                className="hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
