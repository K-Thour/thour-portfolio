import { Clock } from "lucide-react";
import type { Contact } from "../../../types";

interface ContactDetailsAvailabilityProps {
  contact: Contact;
  isDark: boolean;
}

export function ContactDetailsAvailability({
  contact,
  isDark,
}: ContactDetailsAvailabilityProps) {
  if (!contact.availability && !contact.timezone) return null;

  return (
    <div>
      <h3
        className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isDark
              ? "bg-linear-to-br from-red-600 to-yellow-500"
              : "bg-linear-to-br from-blue-600 to-blue-400"
          }`}
        >
          <Clock className="w-4 h-4 text-white" />
        </div>
        Availability
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {contact.availability && (
          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? "bg-slate-800/50 border-red-500/20"
                : "bg-blue-50/50 border-blue-300/40"
            }`}
          >
            <p
              className={`text-xs mb-1 ${isDark ? "text-gray-500" : "text-gray-600"}`}
            >
              Working Hours
            </p>
            <p
              className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {contact.availability}
            </p>
          </div>
        )}
        {contact.timezone && (
          <div
            className={`p-4 rounded-xl border ${
              isDark
                ? "bg-slate-800/50 border-red-500/20"
                : "bg-blue-50/50 border-blue-300/40"
            }`}
          >
            <p
              className={`text-xs mb-1 ${isDark ? "text-gray-500" : "text-gray-600"}`}
            >
              Timezone
            </p>
            <p
              className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {contact.timezone}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
