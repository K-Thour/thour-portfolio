import { MapPin, MapPinned } from "lucide-react";
import type { Contact } from "../../../types";

interface ContactDetailsLocationProps {
  contact: Contact;
  isDark: boolean;
}

export function ContactDetailsLocation({
  contact,
  isDark,
}: ContactDetailsLocationProps) {
  const hasLocation =
    contact.address || contact.city || contact.state || contact.country;
  if (!hasLocation) return null;

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
          <MapPinned className="w-4 h-4 text-white" />
        </div>
        Location
      </h3>

      <div
        className={`p-5 rounded-xl border ${
          isDark
            ? "bg-slate-800/50 border-red-500/20"
            : "bg-blue-50/50 border-blue-300/40"
        }`}
      >
        <div className="flex items-start gap-3">
          <MapPin
            className={`w-5 h-5 mt-1 ${isDark ? "text-red-400" : "text-blue-600"}`}
          />
          <div className="flex-1">
            {contact.address && (
              <p className={`mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                {contact.address}
              </p>
            )}
            <p className={isDark ? "text-gray-400" : "text-gray-600"}>
              {[contact.city, contact.state, contact.zipCode]
                .filter(Boolean)
                .join(", ")}
              {(contact.city || contact.state || contact.zipCode) &&
                contact.country && <br />}
              {contact.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
