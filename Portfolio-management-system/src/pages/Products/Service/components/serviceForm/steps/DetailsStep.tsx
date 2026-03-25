import { motion } from "motion/react";
import { Plus, X } from "lucide-react";
import type { DetailsStepProps } from "../../types";
import type { RootState } from "../../../../../../store/store";
import { useAppSelector } from "../../../../../../hooks/useRedux";

export function DetailsStep({
  formData,
  errors,
  onFormDataChange,
  onAddArrayItem,
  onRemoveArrayItem,
}: DetailsStepProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
          >
            Pricing *
          </label>
          <input
            type="text"
            value={formData.pricing}
            onChange={(e) =>
              onFormDataChange({ ...formData, pricing: e.target.value })
            }
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            } ${errors.pricing ? "border-red-500" : ""}`}
            placeholder="$5,000 - $10,000"
          />
          {errors.pricing && (
            <p className="text-red-500 text-sm mt-1">{errors.pricing}</p>
          )}
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
          >
            Duration *
          </label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) =>
              onFormDataChange({ ...formData, duration: e.target.value })
            }
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            } ${errors.duration ? "border-red-500" : ""}`}
            placeholder="4-6 weeks"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
          )}
        </div>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Deliverables (Optional)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="deliverables-input"
            className={`flex-1 px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="Source code, documentation..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddArrayItem("deliverables");
              }
            }}
          />
          <button
            type="button"
            onClick={() => onAddArrayItem("deliverables")}
            className={`px-4 py-3 rounded-xl font-medium transition-all ${
              isDark
                ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg"
            }`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-2 mt-3">
          {formData.deliverables.map((item: string, index: number) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-lg flex items-center justify-between ${
                isDark ? "bg-slate-700/50" : "bg-blue-50"
              }`}
            >
              <span className={isDark ? "text-white" : "text-gray-900"}>
                📦 {item}
              </span>
              <button
                type="button"
                onClick={() => onRemoveArrayItem("deliverables", index)}
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
