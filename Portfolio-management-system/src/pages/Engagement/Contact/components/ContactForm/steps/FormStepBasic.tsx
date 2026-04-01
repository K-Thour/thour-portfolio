import { motion } from "motion/react";
import { Mail, Phone } from "lucide-react";
import type { ContactFormData } from "../../../types";

interface FormStepBasicProps {
  formData: ContactFormData;
  errors: Record<string, string>;
  isDark: boolean;
  onUpdate: <K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K],
  ) => void;
}

export function FormStepBasic({
  formData,
  errors,
  isDark,
  onUpdate,
}: FormStepBasicProps) {
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
          Contact Label *
        </label>
        <input
          type="text"
          value={formData.label}
          onChange={(e) => onUpdate("label", e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
              : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
          } ${errors.label ? "border-red-500" : ""}`}
          placeholder="Primary Contact, Business Contact, Personal, etc."
        />
        {errors.label && (
          <p className="text-red-500 text-sm mt-1">{errors.label}</p>
        )}
        <p
          className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}
        >
          A descriptive name to identify this contact profile
        </p>
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Email Address *
        </label>
        <div className="relative">
          <Mail
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onUpdate("email", e.target.value)}
            className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            } ${errors.email ? "border-red-500" : ""}`}
            placeholder="your@email.com"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Phone Number *
        </label>
        <div className="relative">
          <Phone
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
          />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onUpdate("phone", e.target.value)}
            className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            } ${errors.phone ? "border-red-500" : ""}`}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>
    </motion.div>
  );
}
