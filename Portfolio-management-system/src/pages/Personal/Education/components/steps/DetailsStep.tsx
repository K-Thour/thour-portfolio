import { motion } from "motion/react";
import type { EducationFormData, EducationFormUpdateFn } from "../../types";

interface DetailsStepProps {
  formData: EducationFormData;
  errors: Partial<Record<keyof EducationFormData, string>>;
  isDark: boolean;
  onUpdate: EducationFormUpdateFn;
}

const baseInput = (isDark: boolean) =>
  `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
    isDark
      ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
      : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
  }`;

export function DetailsStep({
  formData,
  errors,
  isDark,
  onUpdate,
}: DetailsStepProps) {
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
            Start Date *
          </label>
          <input
            type="month"
            value={formData.startDate}
            onChange={(e) => onUpdate("startDate", e.target.value)}
            className={`${baseInput(isDark)} ${errors.startDate ? "border-red-500" : ""}`}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
          )}
        </div>
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
          >
            End Date {!formData.current && "*"}
          </label>
          <input
            type="month"
            value={formData.endDate}
            onChange={(e) => onUpdate("endDate", e.target.value)}
            disabled={formData.current}
            className={`${baseInput(isDark)} disabled:opacity-50 ${errors.endDate ? "border-red-500" : ""}`}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="current"
          checked={formData.current}
          onChange={(e) => onUpdate("current", e.target.checked)}
          className="w-4 h-4 rounded"
        />
        <label
          htmlFor="current"
          className={`text-sm ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          I currently study here
        </label>
      </div>
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Grade/GPA
        </label>
        <input
          type="text"
          value={formData.grade}
          onChange={(e) => onUpdate("grade", e.target.value)}
          className={baseInput(isDark)}
          placeholder="4.0 GPA"
        />
      </div>
      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onUpdate("description", e.target.value)}
          rows={4}
          className={`${baseInput(isDark)} ${errors.description ? "border-red-500" : ""}`}
          placeholder="Specialization, focus areas, relevant coursework..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>
    </motion.div>
  );
}
