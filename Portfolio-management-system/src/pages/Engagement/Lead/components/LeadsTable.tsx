import type { LeadsTableProps } from "../types";
import { TableContent } from "./TableContent";
import { PaginationControls, PaginationInfo } from "./pagination";
import { usePagination } from "../hooks/usePagination";
import PageLoadingSkeleton from "../../../../components/common/loading/PageLoadingSkeleton";

const ITEMS_PER_PAGE = 5;

export function LeadsTable({
  leads,
  isDark,
  isLoading = false,
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

  if (isLoading) {
    return <PageLoadingSkeleton count={5} type="table" />;
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl border border-dashed border-border/60 bg-card/40 backdrop-blur-md text-center">
        <p className="text-lg font-semibold tracking-tight text-foreground mb-1">
          No leads found
        </p>
        <p className="text-sm text-muted-foreground">
          New client inquiries from public portfolio forms will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border/40 overflow-hidden flex flex-col bg-card/75 backdrop-blur-xl shadow-xs">
      <TableContent
        leads={paginatedData}
        isDark={isDark}
        onView={onView}
        onOpenChangeStatus={onOpenChangeStatus}
      />

      {/* Pagination Footer */}
      <div className="border-t border-border/40 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/40">
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
