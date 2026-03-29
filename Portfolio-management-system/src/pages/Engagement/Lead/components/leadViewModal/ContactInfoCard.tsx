import { Mail, Phone } from "lucide-react";
import type { Lead } from "../../types";

interface ContactInfoCardProps {
  lead: Lead;
  isDark: boolean;
  cardBase: (isDark: boolean) => string;
}

export function ContactInfoCard({
  lead,
  isDark,
  cardBase,
}: ContactInfoCardProps) {
  return (
    <div className={cardBase(isDark)}>
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isDark ? "bg-slate-700/50" : "bg-blue-50"
          }`}
        >
          <svg
            className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-blue-500"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <span
          className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          Contact Info
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Mail
            className={`w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
          />
          <div>
            <p
              className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
            >
              Email
            </p>
            <p
              className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              {lead.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone
            className={`w-5 h-5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
          />
          <div>
            <p
              className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
            >
              Phone
            </p>
            <p
              className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              {lead.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
