import { useState, useMemo } from "react";
import type { Lead, LeadStatus } from "../types";

export interface FilterState {
  searchQuery: string;
  statusFilter: LeadStatus | "All";
  dateFrom: string;
  dateTo: string;
}

export function useFilters(leads: Lead[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery);

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      const leadDate = new Date(lead.date);
      const matchesDateFrom = !dateFrom || leadDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || leadDate <= new Date(dateTo);

      return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
    });
  }, [leads, searchQuery, statusFilter, dateFrom, dateTo]);

  const hasActiveFilters = Boolean(
    searchQuery || statusFilter !== "All" || dateFrom || dateTo,
  );

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setDateFrom("");
    setDateTo("");
  };

  return {
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
  };
}
