import { motion } from "motion/react";
import { useAppSelector } from "../../../hooks/useRedux";
import { LeadsHeader } from "./components/LeadsHeader";
import { LeadsFilters } from "./components/LeadsFilters";
import { LeadsTable } from "./components/LeadsTable";
import { LeadViewModal } from "./components/LeadViewModal";
import { ChangeStatusModal } from "./components/ChangeStatusModal";
import { useLeads } from "./hooks/useLeads";

function LeadPage() {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";
  const {
    leads,
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
    viewingLead,
    isViewModalOpen,
    handleViewLead,
    handleCloseViewModal,
    handleStatusChange,
    statusChangeLead,
    isChangeStatusModalOpen,
    handleOpenChangeStatus,
    handleCloseChangeStatus,
  } = useLeads();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <LeadsHeader isDark={isDark} />

      <LeadsFilters
        isDark={isDark}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        dateFrom={dateFrom}
        onDateFromChange={setDateFrom}
        dateTo={dateTo}
        onDateToChange={setDateTo}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      <LeadsTable
        leads={leads}
        isDark={isDark}
        onView={handleViewLead}
        onOpenChangeStatus={handleOpenChangeStatus}
      />

      <LeadViewModal
        lead={viewingLead}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        isDark={isDark}
        onStatusChange={handleStatusChange}
      />

      <ChangeStatusModal
        lead={statusChangeLead}
        isOpen={isChangeStatusModalOpen}
        onClose={handleCloseChangeStatus}
        isDark={isDark}
        onConfirm={handleStatusChange}
      />
    </motion.div>
  );
}

export default LeadPage;
