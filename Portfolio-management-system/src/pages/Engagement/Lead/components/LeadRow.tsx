import { motion } from "motion/react";
import { Mail, Phone, Calendar } from "lucide-react";
import type { LeadRowProps } from "../types";
import Button from "../../../../components/ui/button/Button";

export function LeadRow({
  lead,
  index,
  isDark,
  getStatusColor,
  onView,
  onOpenChangeStatus,
}: LeadRowProps) {
  return (
    <motion.tr
      key={lead.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`border-t ${
        isDark
          ? "border-red-500/10 hover:bg-slate-700/30"
          : "border-blue-300/30 hover:bg-blue-50/50"
      }`}
    >
      <td
        className={`px-6 py-4 font-medium ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {lead.name}
      </td>
      <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          {lead.email}
        </div>
      </td>
      <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          {lead.phone}
        </div>
      </td>
      <td className={`px-6 py-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {lead.date}
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}
        >
          {lead.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onOpenChangeStatus(lead)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isDark
                ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:from-red-500 hover:to-yellow-400"
                : "bg-linear-to-r from-blue-600 to-blue-400 text-white hover:from-blue-500 hover:to-blue-300"
            }`}
          >
            Change Status
          </Button>
          <Button
            onClick={() => onView(lead)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isDark
                ? "bg-slate-700/50 text-white hover:bg-slate-700"
                : "bg-blue-100 text-gray-900 hover:bg-blue-200"
            }`}
          >
            View
          </Button>
        </div>
      </td>
    </motion.tr>
  );
}
