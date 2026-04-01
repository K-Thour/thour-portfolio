import { motion } from "motion/react";
import { Clock, Globe } from "lucide-react";
import type { ContactFormData } from "../../../types";

interface FormStepAvailabilityProps {
  formData: ContactFormData;
  isDark: boolean;
  onUpdate: <K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K],
  ) => void;
}

export function FormStepAvailability({
  formData,
  isDark,
  onUpdate,
}: FormStepAvailabilityProps) {
  const hasData = formData.availability || formData.timezone;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isDark
              ? "bg-linear-to-r from-red-600 to-yellow-500"
              : "bg-linear-to-r from-blue-600 to-blue-400"
          }`}
        >
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3
            className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Availability & Timezone
          </h3>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Let people know when you&apos;re available
          </p>
        </div>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Working Hours
        </label>
        <input
          type="text"
          value={formData.availability}
          onChange={(e) => onUpdate("availability", e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          }`}
          placeholder="Mon-Fri, 9 AM - 6 PM"
        />
        <p
          className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}
        >
          Example: Mon-Fri, 9 AM - 6 PM or 24/7 Available
        </p>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Timezone
        </label>
        <input
          type="text"
          value={formData.timezone}
          onChange={(e) => onUpdate("timezone", e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          }`}
          placeholder="PST (UTC-8)"
        />
        <p
          className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}
        >
          Example: EST (UTC-5), PST (UTC-8), GMT+1, etc.
        </p>
      </div>

      {hasData && (
        <div
          className={`p-5 rounded-xl border mt-6 ${
            isDark
              ? "bg-slate-800/50 border-red-500/20"
              : "bg-blue-50/50 border-blue-300/40"
          }`}
        >
          <p
            className={`text-xs mb-3 ${isDark ? "text-gray-500" : "text-gray-600"}`}
          >
            Preview:
          </p>
          <div className="space-y-2">
            {formData.availability && (
              <div className="flex items-center gap-2">
                <Clock
                  className={`w-4 h-4 ${isDark ? "text-red-400" : "text-blue-600"}`}
                />
                <span
                  className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {formData.availability}
                </span>
              </div>
            )}
            {formData.timezone && (
              <div className="flex items-center gap-2">
                <Globe
                  className={`w-4 h-4 ${isDark ? "text-red-400" : "text-blue-600"}`}
                />
                <span
                  className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {formData.timezone}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
