import { motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { useAppSelector } from "../../../../../../hooks/useRedux";
import type { RootState } from "../../../../../../store/store";
import type { FeaturesStepProps } from "../../types";

export function FeaturesStep({
  formData,
  errors,
  onFormDataChange,
  onAddArrayItem,
  onRemoveArrayItem,
}: FeaturesStepProps) {
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
          Detailed Description *
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
          placeholder="Comprehensive description of the service, process, and what clients can expect..."
        />
        {errors.longDescription && (
          <p className="text-red-500 text-sm mt-1">{errors.longDescription}</p>
        )}
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
            id="features-input"
            className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="Responsive design, SEO optimized..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddArrayItem("features");
              }
            }}
          />
          <button
            type="button"
            onClick={() => onAddArrayItem("features")}
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
              className={`px-4 py-3 rounded-lg flex items-start justify-between ${
                isDark ? "bg-slate-700/50" : "bg-blue-50"
              }`}
            >
              <span
                className={`flex-1 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                ✓ {feature}
              </span>
              <button
                type="button"
                onClick={() => onRemoveArrayItem("features", index)}
                className="ml-2 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Benefits (Optional)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="benefits-input"
            className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="Increased conversion rates..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddArrayItem("benefits");
              }
            }}
          />
          <button
            type="button"
            onClick={() => onAddArrayItem("benefits")}
            className={`px-4 py-3 rounded-xl font-medium transition-all ${
              isDark
                ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg"
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {formData.benefits.map((benefit: string, index: number) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
                isDark ? "bg-slate-700 text-white" : "bg-blue-100 text-gray-900"
              }`}
            >
              {benefit}
              <button
                type="button"
                onClick={() => onRemoveArrayItem("benefits", index)}
                className="hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
