import type { Lead } from "../../types";
import { LeadHeader } from "./LeadHeader";
import { ContactInfoCard } from "./ContactInfoCard";
import { DetailsRow } from "./DetailsRow";
import { DescriptionCard } from "./DescriptionCard";

interface LeadInfoSectionProps {
  lead: Lead;
  isDark: boolean;
  getStatusColor: (status: string) => string;
}

const cardBase = (isDark: boolean) =>
  `p-4 rounded-xl border ${
    isDark
      ? "bg-slate-800/50 border-slate-700/50"
      : "bg-white/80 border-gray-200/50 shadow-sm"
  }`;

export function LeadInfoSection({
  lead,
  isDark,
  getStatusColor,
}: LeadInfoSectionProps) {
  return (
    <div className="space-y-4">
      <LeadHeader lead={lead} isDark={isDark} getStatusColor={getStatusColor} />
      <ContactInfoCard lead={lead} isDark={isDark} cardBase={cardBase} />
      <DetailsRow lead={lead} isDark={isDark} cardBase={cardBase} />
      <DescriptionCard lead={lead} isDark={isDark} cardBase={cardBase} />
    </div>
  );
}
