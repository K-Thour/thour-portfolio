import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";
import type { ActiveContactBannerProps } from "../types";

export function ActiveContactBanner({
  contact,
  isDark,
}: ActiveContactBannerProps) {
  if (!contact) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl border ${
        isDark
          ? "bg-linear-to-br from-red-600/20 to-yellow-500/10 border-red-500/50"
          : "bg-linear-to-br from-blue-600/10 to-blue-400/5 border-blue-500/60 shadow-lg shadow-blue-500/20"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-3 h-3 rounded-full animate-pulse ${
            isDark
              ? "bg-green-500 shadow-lg shadow-green-500/50"
              : "bg-green-600 shadow-lg shadow-green-600/50"
          }`}
        />
        <h2
          className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Currently Active: {contact.label}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <Mail
            className={`w-5 h-5 ${isDark ? "text-red-400" : "text-blue-600"}`}
          />
          <div>
            <p
              className={`text-xs ${isDark ? "text-gray-500" : "text-gray-600"}`}
            >
              Email
            </p>
            <p
              className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {contact.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone
            className={`w-5 h-5 ${isDark ? "text-red-400" : "text-blue-600"}`}
          />
          <div>
            <p
              className={`text-xs ${isDark ? "text-gray-500" : "text-gray-600"}`}
            >
              Phone
            </p>
            <p
              className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {contact.phone}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin
            className={`w-5 h-5 ${isDark ? "text-red-400" : "text-blue-600"}`}
          />
          <div>
            <p
              className={`text-xs ${isDark ? "text-gray-500" : "text-gray-600"}`}
            >
              Location
            </p>
            <p
              className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {contact.city}, {contact.state}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
