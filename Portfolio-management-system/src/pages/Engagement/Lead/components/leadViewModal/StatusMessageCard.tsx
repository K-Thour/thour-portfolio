import { MessageSquare } from "lucide-react";
import type { Lead } from "../../types";

interface StatusMessageCardProps {
  lead: Lead;
  isDark: boolean;
  cardBase: (isDark: boolean) => string;
}

export function StatusMessageCard({
  lead,
  isDark,
  cardBase,
}: StatusMessageCardProps) {
  if (!lead.statusMessage) return null;

  return (
    <div className={cardBase(isDark)}>
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare
          className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
        />
        <span
          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          Status Message
        </span>
      </div>
      <p
        className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
      >
        {lead.statusMessage}
      </p>
    </div>
  );
}
