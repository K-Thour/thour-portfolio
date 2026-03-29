import { Calendar } from "lucide-react";

interface DateRangeFilterProps {
  dateFrom: string;
  dateTo: string;
  isDark: boolean;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}

export function DateRangeFilter({
  dateFrom,
  dateTo,
  isDark,
  onDateFromChange,
  onDateToChange,
}: DateRangeFilterProps) {
  const inputClasses = `px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${
    isDark
      ? "bg-slate-800/50 border-slate-600 text-white focus:ring-red-500"
      : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500"
  }`;

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Calendar
          className={`absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}
        />
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className={`${inputClasses} pl-8`}
        />
      </div>
      <span className={isDark ? "text-gray-400" : "text-gray-500"}>to</span>
      <div className="relative">
        <Calendar
          className={`absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className={`${inputClasses} pl-8`}
        />
      </div>
    </div>
  );
}
