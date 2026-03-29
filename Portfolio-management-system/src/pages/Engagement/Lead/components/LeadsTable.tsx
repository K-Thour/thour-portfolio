import type { LeadsTableProps } from "../types";
import { TableContent } from "./TableContent";
import { PaginationControls, PaginationInfo } from "./pagination";
import { usePagination } from "../hooks/usePagination";

const ITEMS_PER_PAGE = 5;

export function LeadsTable({
  leads,
  isDark,
  onView,
  onOpenChangeStatus,
}: LeadsTableProps) {
  const {
    currentPage,
    totalPages,
    paginatedData,
    startIndex,
    endIndex,
    totalItems,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
  } = usePagination({ data: leads, itemsPerPage: ITEMS_PER_PAGE });

  return (
    <div
      className={`rounded-2xl border overflow-hidden flex flex-col ${
        isDark
          ? "bg-slate-800/50 border-red-500/20"
          : "bg-white border-blue-300/40 shadow-lg shadow-blue-500/10"
      }`}
    >
      <TableContent
        leads={paginatedData}
        isDark={isDark}
        onView={onView}
        onOpenChangeStatus={onOpenChangeStatus}
      />

      {/* Pagination Footer */}
      <div
        className={`border-t px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark
            ? "border-slate-700/50 bg-slate-900/30"
            : "border-gray-200 bg-gray-50/50"
        }`}
      >
        <PaginationInfo
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          isDark={isDark}
        />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          isDark={isDark}
          onFirstPage={goToFirstPage}
          onPreviousPage={goToPreviousPage}
          onNextPage={goToNextPage}
          onLastPage={goToLastPage}
          onGoToPage={goToPage}
        />
      </div>
    </div>
  );
}
