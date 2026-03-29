import { useState } from "react";
import type { LeadsFiltersProps } from "../types";
import {
  SearchInput,
  StatusFilter,
  DateRangeFilter,
  FilterActions,
} from "./filters";

export function LeadsFilters({
  isDark,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  hasActiveFilters,
  onClearFilters,
}: LeadsFiltersProps) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <SearchInput
        value={searchQuery}
        isDark={isDark}
        onChange={onSearchChange}
      />

      <div className="flex flex-wrap items-center gap-3">
        <StatusFilter
          value={statusFilter}
          isOpen={isStatusOpen}
          isDark={isDark}
          onToggle={() => setIsStatusOpen(!isStatusOpen)}
          onSelect={(status) => {
            onStatusChange(status);
            setIsStatusOpen(false);
          }}
        />

        <DateRangeFilter
          dateFrom={dateFrom}
          dateTo={dateTo}
          isDark={isDark}
          onDateFromChange={onDateFromChange}
          onDateToChange={onDateToChange}
        />

        <FilterActions
          isDark={isDark}
          hasActiveFilters={hasActiveFilters}
          onClear={onClearFilters}
        />
      </div>
    </div>
  );
}
