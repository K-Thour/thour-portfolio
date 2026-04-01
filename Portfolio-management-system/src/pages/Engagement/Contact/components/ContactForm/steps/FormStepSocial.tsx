import { motion } from "motion/react";
import { Globe } from "lucide-react";
import type { ContactFormData } from "../../../types";
import { socialLinks } from "./constraints/socialLinks";

interface FormStepSocialProps {
  formData: ContactFormData;
  isDark: boolean;
  onUpdate: <K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K],
  ) => void;
}

export function FormStepSocial({
  formData,
  isDark,
  onUpdate,
}: FormStepSocialProps) {
  const activeCount = socialLinks.filter(({ field }) => formData[field]).length;

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
          <Globe className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3
            className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Social Media & Web Presence
          </h3>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            All links are optional
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Globe
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
          />
          <input
            type="url"
            value={formData.website}
            onChange={(e) => onUpdate("website", e.target.value)}
            className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            }`}
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialLinks.slice(1).map(({ field, icon: Icon, placeholder }) => (
            <div key={field} className="relative">
              <Icon
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
              />
              <input
                type="url"
                value={formData[field]}
                onChange={(e) => onUpdate(field, e.target.value)}
                className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                  isDark
                    ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                    : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
                }`}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      </div>

      {activeCount > 0 && (
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
            Social Links Added: {activeCount} of 7
          </p>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map(({ field, icon: Icon, label }) =>
              formData[field] ? (
                <span
                  key={field}
                  className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${
                    isDark
                      ? "bg-slate-700 text-white"
                      : "bg-blue-100 text-gray-900"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </span>
              ) : null,
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
