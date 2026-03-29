import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check } from "lucide-react";
import type { LeadStatus } from "../../types";
import { getStatusColor } from "../../utils/leadsUtils";

interface StatusFilterProps {
  value: LeadStatus | "All";
  isOpen: boolean;
  isDark: boolean;
  onToggle: () => void;
  onSelect: (status: LeadStatus | "All") => void;
}

const statusOptions: (LeadStatus | "All")[] = [
  "All",
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

export function StatusFilter({
  value,
  isOpen,
  isDark,
  onToggle,
  onSelect,
}: StatusFilterProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all min-w-35 ${
          isDark
            ? "bg-slate-800/50 border-red-500/20 text-white hover:border-red-500/50"
            : "bg-white border-blue-300/50 text-gray-900 hover:border-blue-500/60"
        }`}
      >
        {value !== "All" && (
          <span
            className={`w-2 h-2 rounded-full ${getStatusColor(value, isDark)}`}
          />
        )}
        <span className="flex-1 text-left">
          {value === "All" ? "All Status" : value}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full left-0 right-0 mt-2 rounded-xl border overflow-hidden z-50 ${
              isDark
                ? "bg-slate-800/95 border-slate-600 backdrop-blur-sm"
                : "bg-white border-gray-200 shadow-lg"
            }`}
          >
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => onSelect(status)}
                className={`w-full flex items-center gap-2 px-4 py-2 transition-colors ${
                  isDark
                    ? "hover:bg-slate-700/50 text-white"
                    : "hover:bg-gray-50 text-gray-900"
                } ${value === status ? (isDark ? "bg-slate-700/30" : "bg-blue-50/50") : ""}`}
              >
                {status !== "All" && (
                  <span
                    className={`w-2 h-2 rounded-full ${getStatusColor(status, isDark)}`}
                  />
                )}
                <span>{status === "All" ? "All Status" : status}</span>
                {value === status && (
                  <Check
                    className={`w-4 h-4 ml-auto ${isDark ? "text-blue-400" : "text-blue-500"}`}
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
