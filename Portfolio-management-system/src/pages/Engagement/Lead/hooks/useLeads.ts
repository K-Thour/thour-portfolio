import { useState, useEffect, useCallback } from "react";
import type { Lead, LeadStatus } from "../types";
import { useFilters } from "./useFilters";
import { fetchLeads, updateLead } from "../../../../services/api";

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [statusChangeLead, setStatusChangeLead] = useState<Lead | null>(null);
  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const list = await fetchLeads();
      const mappedList = list.map((l: any) => ({
        id: l._id,
        name: l.name || "",
        email: l.email || "",
        phone: l.mobileNumber || "",
        date: l.createdAt
          ? new Date(l.createdAt).toISOString().split("T")[0]
          : "",
        status: l.status || "New",
        description: l.description || "",
      }));
      setLeads(mappedList);
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    filteredLeads,
    hasActiveFilters,
    clearFilters,
  } = useFilters(leads);

  const handleViewLead = (lead: Lead) => {
    setViewingLead(lead);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingLead(null);
  };

  const handleOpenChangeStatus = (lead: Lead) => {
    setStatusChangeLead(lead);
    setIsChangeStatusModalOpen(true);
  };

  const handleCloseChangeStatus = () => {
    setIsChangeStatusModalOpen(false);
    setStatusChangeLead(null);
  };

  const handleStatusChange = async (
    leadId: string | number,
    newStatus: LeadStatus,
    reason?: string,
  ) => {
    try {
      await updateLead(leadId.toString(), { status: newStatus });
      await loadLeads();

      // Update local viewing lead if it matches
      setViewingLead((prev) =>
        prev && prev.id === leadId ? { ...prev, status: newStatus } : prev,
      );
      console.log(
        `Status changed for lead ${leadId} to ${newStatus}`,
        reason ? `Reason: ${reason}` : "",
      );
    } catch (err) {
      console.error("Failed to update lead status:", err);
    }
  };

  const getStatusColor = (status: LeadStatus, isDark: boolean): string => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    const colors = {
      New: isDark
        ? "bg-blue-500/20 text-blue-400"
        : "bg-blue-100 text-blue-700",
      Contacted: isDark
        ? "bg-yellow-500/20 text-yellow-400"
        : "bg-yellow-100 text-yellow-700",
      Qualified: isDark
        ? "bg-green-500/20 text-green-400"
        : "bg-green-100 text-green-700",
      "Proposal Sent": isDark
        ? "bg-cyan-500/20 text-cyan-400"
        : "bg-cyan-100 text-cyan-700",
      Lost: isDark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700",
      Won: isDark
        ? "bg-emerald-500/20 text-emerald-400"
        : "bg-emerald-100 text-emerald-700",
    };
    return `${baseClasses} ${colors[status]}`;
  };

  return {
    leads: filteredLeads,
    allLeads: leads,
    loading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    hasActiveFilters,
    clearFilters,
    getStatusColor,
    viewingLead,
    isViewModalOpen,
    handleViewLead,
    handleCloseViewModal,
    handleStatusChange,
    statusChangeLead,
    isChangeStatusModalOpen,
    handleOpenChangeStatus,
    handleCloseChangeStatus,
  };
}
