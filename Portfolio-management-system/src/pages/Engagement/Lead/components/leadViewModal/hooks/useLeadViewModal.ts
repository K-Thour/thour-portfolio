import { useState } from "react";
import type { Lead, LeadStatus } from "../../../types";

export function useLeadViewModal(
  lead: Lead | null,
  onStatusChange: (
    leadId: number,
    newStatus: LeadStatus,
    reason?: string,
  ) => void,
) {
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | "">("");
  const [reason, setReason] = useState("");
  const [showStatusForm, setShowStatusForm] = useState(false);

  const handleStatusClick = () => {
    setShowStatusForm(true);
    setSelectedStatus(lead?.status || "New");
    setReason("");
  };

  const handleCancelStatus = () => {
    setShowStatusForm(false);
    setSelectedStatus("");
    setReason("");
  };

  const handleConfirmStatus = () => {
    if (selectedStatus && lead && selectedStatus !== lead.status) {
      const requiresReason = selectedStatus !== "New";
      if (requiresReason && !reason.trim()) {
        return;
      }
      onStatusChange(lead.id, selectedStatus, reason || undefined);
    }
    setShowStatusForm(false);
    setReason("");
  };

  const requiresReason = !!(selectedStatus && selectedStatus !== "New");

  return {
    selectedStatus,
    setSelectedStatus,
    reason,
    setReason,
    showStatusForm,
    handleStatusClick,
    handleCancelStatus,
    handleConfirmStatus,
    requiresReason,
  };
}
