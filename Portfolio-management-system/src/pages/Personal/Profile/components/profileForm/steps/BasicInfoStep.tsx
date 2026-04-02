import { motion } from "motion/react";
import { User, Mail, Phone } from "lucide-react";
import type { BasicInfoStepProps } from "../types";

export function BasicInfoStep({
  formData,
  errors,
  isDark,
  onChange,
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
          Full Name *
        </label>
        <div className="relative">
          <User
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
          />
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
            className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            } ${errors.name ? "border-red-500" : ""}`}
            placeholder="John Doe"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
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
            onChange={(e) => onChange("email", e.target.value)}
            className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            } ${errors.email ? "border-red-500" : ""}`}
            placeholder="john@example.com"
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
            value={formData.phoneNumber}
            onChange={(e) => onChange("phoneNumber", e.target.value)}
            className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            } ${errors.phoneNumber ? "border-red-500" : ""}`}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
        )}
      </div>
    </motion.div>
  );
}
