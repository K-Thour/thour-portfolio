import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  activeBtn,
  btnBase,
  getPageNumbers,
  inactiveBtn,
} from "../../utils/leadsUtils";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  isDark: boolean;
  onFirstPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
  onGoToPage: (page: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  isDark,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
  onGoToPage,
}: PaginationControlsProps) {
  const getPagesWrapper = getPageNumbers(totalPages, currentPage);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={onFirstPage}
        disabled={currentPage === 1}
        className={btnBase(isDark)}
      >
        <ChevronsLeft className="w-4 h-4" />
      </button>
      <button
        onClick={onPreviousPage}
        disabled={currentPage === 1}
        className={btnBase(isDark)}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {getPagesWrapper.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onGoToPage(page)}
          disabled={page === "..."}
          className={
            page === currentPage ? activeBtn(isDark) : inactiveBtn(isDark)
          }
        >
          {page}
        </button>
      ))}

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={btnBase(isDark)}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <button
        onClick={onLastPage}
        disabled={currentPage === totalPages}
        className={btnBase(isDark)}
      >
        <ChevronsRight className="w-4 h-4" />
      </button>
    </div>
  );
}
