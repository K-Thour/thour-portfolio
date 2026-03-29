import type { Lead, LeadStatus } from "../types";
import { LeadRow } from "./LeadRow";
import { getStatusColor } from "../utils/leadsUtils";

interface TableContentProps {
  leads: Lead[];
  isDark: boolean;
  onView: (lead: Lead) => void;
  onOpenChangeStatus: (lead: Lead) => void;
}

export function TableContent({
  leads,
  isDark,
  onView,
  onOpenChangeStatus,
}: TableContentProps) {
  const getStatusColorWrapper = (status: LeadStatus) =>
    getStatusColor(status, isDark);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className={isDark ? "bg-slate-900/50" : "bg-blue-50"}>
          <tr>
            {["Name", "Email", "Phone", "Date", "Status", "Actions"].map(
              (header) => (
                <th
                  key={header}
                  className={`px-6 py-4 text-left text-sm font-medium ${
                    isDark ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <LeadRow
              key={lead.id}
              lead={lead}
              index={index}
              isDark={isDark}
              getStatusColor={getStatusColorWrapper}
              onView={onView}
              onOpenChangeStatus={onOpenChangeStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
