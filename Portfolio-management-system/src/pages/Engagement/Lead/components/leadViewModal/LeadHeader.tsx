import type { Lead } from "../../types";

interface LeadHeaderProps {
  lead: Lead;
  isDark: boolean;
  getStatusColor: (status: string) => string;
}

export function LeadHeader({ lead, isDark, getStatusColor }: LeadHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isDark
            ? "bg-linear-to-br from-red-600 to-yellow-500"
            : "bg-linear-to-br from-blue-600 to-blue-400"
        }`}
      >
        <span className="text-white font-bold text-lg">
          {lead.name.charAt(0).toUpperCase()}
        </span>
      </div>
      <div>
        <h3
          className={`font-semibold text-lg ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {lead.name}
        </h3>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            lead.status,
          )}`}
        >
          {lead.status}
        </span>
      </div>
    </div>
  );
}
