import { useState } from "react";
import type { Lead, LeadStatus } from "../types";

export function useChangeStatus(lead: Lead | null) {
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus>(
    lead?.status || "New",
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reason, setReason] = useState("");

  const requiresReason = selectedStatus !== "New";

  const reset = () => {
    setSelectedStatus(lead?.status || "New");
    setReason("");
    setIsDropdownOpen(false);
  };

  const handleStatusSelect = (status: LeadStatus) => {
    setSelectedStatus(status);
    setIsDropdownOpen(false);
  };

  const canConfirm = !requiresReason || reason.trim().length > 0;

  return {
    selectedStatus,
    isDropdownOpen,
    reason,
    requiresReason,
    canConfirm,
    setIsDropdownOpen,
    setReason,
    handleStatusSelect,
    reset,
  };
}
