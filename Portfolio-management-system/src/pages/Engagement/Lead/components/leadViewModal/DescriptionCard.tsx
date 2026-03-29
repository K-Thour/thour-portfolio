import { FileText } from "lucide-react";
import type { Lead } from "../../types";

interface DescriptionCardProps {
  lead: Lead;
  isDark: boolean;
  cardBase: (isDark: boolean) => string;
}

export function DescriptionCard({
  lead,
  isDark,
  cardBase,
}: DescriptionCardProps) {
  return (
    <div className={cardBase(isDark)}>
      <div className="flex items-center gap-2 mb-2">
        <FileText
          className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
        />
        <span
          className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          Description
        </span>
      </div>
      <p
        className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
      >
        {lead.description}
      </p>
    </div>
  );
}
