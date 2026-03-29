export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: LeadStatus;
  description: string;
}

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal Sent"
  | "Lost"
  | "Won";

export interface LeadsHeaderProps {
  isDark: boolean;
}

export interface LeadsFiltersProps {
  isDark: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: LeadStatus | "All";
  onStatusChange: (status: LeadStatus | "All") => void;
  dateFrom: string;
  onDateFromChange: (date: string) => void;
  dateTo: string;
  onDateToChange: (date: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export interface LeadsTableProps {
  leads: Lead[];
  isDark: boolean;
  onView: (lead: Lead) => void;
  onOpenChangeStatus: (lead: Lead) => void;
}

export interface LeadRowProps {
  lead: Lead;
  index: number;
  isDark: boolean;
  getStatusColor: (status: LeadStatus) => string;
  onView: (lead: Lead) => void;
  onOpenChangeStatus: (lead: Lead) => void;
}

export interface LeadViewModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onStatusChange: (
    leadId: number,
    newStatus: LeadStatus,
    reason?: string,
  ) => void;
}

export interface ChangeStatusModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onConfirm: (leadId: number, newStatus: LeadStatus, reason?: string) => void;
}
