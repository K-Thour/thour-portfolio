import { motion } from "motion/react";
import { Mail, Phone, Calendar } from "lucide-react";
import type { LeadRowProps } from "../types";
import Button from "../../../../components/ui/button/Button";

export function LeadRow({
  lead,
  index,
  getStatusColor,
  onView,
  onOpenChangeStatus,
}: LeadRowProps) {
  return (
    <motion.tr
      key={lead.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.03 }}
      className="border-t border-border/30 hover:bg-accent/30 transition-colors"
    >
      <td className="px-6 py-4 font-semibold text-sm text-foreground">
        {lead.name}
      </td>
      <td className="px-6 py-4 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-primary" />
          <span>{lead.email}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-primary" />
          <span>{lead.phone}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>{lead.date}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(lead.status)}`}
        >
          {lead.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onOpenChangeStatus(lead)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all bg-primary hover:bg-primary/90 text-primary-foreground active:scale-95 shadow-xs cursor-pointer"
          >
            Change Status
          </Button>
          <Button
            onClick={() => onView(lead)}
            variant="outline"
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium border-border/60 hover:bg-accent/60 text-foreground active:scale-95 transition-all cursor-pointer"
          >
            View
          </Button>
        </div>
      </td>
    </motion.tr>
  );
}
