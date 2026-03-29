import { Calendar, Target } from "lucide-react";
import type { Lead } from "../../types";

interface DetailsRowProps {
  lead: Lead;
  isDark: boolean;
  cardBase: (isDark: boolean) => string;
}

export function DetailsRow({ lead, isDark, cardBase }: DetailsRowProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className={cardBase(isDark)}>
        <div className="flex items-center gap-2 mb-2">
          <Calendar
            className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          />
          <span
            className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Details
          </span>
        </div>
        <div>
          <p
            className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
          >
            Date Added
          </p>
          <p
            className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            {lead.date}
          </p>
        </div>
      </div>
      <div className={cardBase(isDark)}>
        <div className="flex items-center gap-2 mb-2">
          <Target
            className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          />
          <span
            className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            Lead ID
          </span>
        </div>
        <div>
          <p
            className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
          >
            Lead ID
          </p>
          <p
            className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            #{lead.id}
          </p>
        </div>
      </div>
    </div>
  );
}
