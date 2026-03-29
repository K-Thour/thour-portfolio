import { motion } from "motion/react";
import type { EducationFormData, EducationFormUpdateFn } from "../../types";

interface BasicInfoStepProps {
  formData: EducationFormData;
  errors: Partial<Record<keyof EducationFormData, string>>;
  isDark: boolean;
  onUpdate: EducationFormUpdateFn;
}

export function BasicInfoStep({
  formData,
  errors,
  isDark,
  onUpdate,
}: BasicInfoStepProps) {
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
          Degree *
        </label>
        <input
          type="text"
          value={formData.degree}
          onChange={(e) => onUpdate("degree", e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          } ${errors.degree ? "border-red-500" : ""}`}
          placeholder="Bachelor of Science in Computer Science"
        />
        {errors.degree && (
          <p className="text-red-500 text-sm mt-1">{errors.degree}</p>
        )}
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Institution *
        </label>
        <input
          type="text"
          value={formData.institution}
          onChange={(e) => onUpdate("institution", e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          } ${errors.institution ? "border-red-500" : ""}`}
          placeholder="Stanford University"
        />
        {errors.institution && (
          <p className="text-red-500 text-sm mt-1">{errors.institution}</p>
        )}
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Location *
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => onUpdate("location", e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          } ${errors.location ? "border-red-500" : ""}`}
          placeholder="Stanford, CA"
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location}</p>
        )}
      </div>
    </motion.div>
  );
}
