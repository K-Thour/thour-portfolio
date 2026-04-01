import { Mail, Phone } from "lucide-react";
import type { Contact } from "../../../types";

interface ContactDetailsPrimaryProps {
  contact: Contact;
  isDark: boolean;
}

export function ContactDetailsPrimary({
  contact,
  isDark,
}: ContactDetailsPrimaryProps) {
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
          <Mail className="w-4 h-4 text-white" />
        </div>
        Primary Contact
      </h3>

      <div className="space-y-3">
        <div
          className={`p-4 rounded-xl border ${
            isDark
              ? "bg-slate-800/50 border-red-500/20"
              : "bg-blue-50/50 border-blue-300/40"
          }`}
        >
          <div className="flex items-center gap-3">
            <Mail
              className={`w-5 h-5 ${isDark ? "text-red-400" : "text-blue-600"}`}
            />
            <div className="flex-1">
              <p
                className={`text-xs mb-1 ${isDark ? "text-gray-500" : "text-gray-600"}`}
              >
                Email Address
              </p>
              <a
                href={`mailto:${contact.email}`}
                className={`font-medium hover:underline ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border ${
            isDark
              ? "bg-slate-800/50 border-red-500/20"
              : "bg-blue-50/50 border-blue-300/40"
          }`}
        >
          <div className="flex items-center gap-3">
            <Phone
              className={`w-5 h-5 ${isDark ? "text-red-400" : "text-blue-600"}`}
            />
            <div className="flex-1">
              <p
                className={`text-xs mb-1 ${isDark ? "text-gray-500" : "text-gray-600"}`}
              >
                Phone Number
              </p>
              <a
                href={`tel:${contact.phone}`}
                className={`font-medium hover:underline ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
