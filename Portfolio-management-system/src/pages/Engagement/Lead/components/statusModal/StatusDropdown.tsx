import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import type { LeadStatus } from "../../types";
import { getStatusColor } from "../../utils/leadsUtils";

const statusOptions: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

interface StatusDropdownProps {
  selectedStatus: LeadStatus;
  isDropdownOpen: boolean;
  isDark: boolean;
  onToggle: () => void;
  onSelect: (status: LeadStatus) => void;
}

export function StatusDropdown({
  selectedStatus,
  isDropdownOpen,
  isDark,
  onToggle,
  onSelect,
}: StatusDropdownProps) {
  return (
    <div className="space-y-2">
      <label
        className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
      >
        Lead Status
      </label>
      <div className="relative">
        <button
          onClick={onToggle}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
            isDark
              ? "bg-slate-800/80 border-slate-600 hover:border-slate-500 text-white"
              : "bg-white border-gray-300 hover:border-gray-400 text-gray-900"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`w-3 h-3 rounded-full ${getStatusColor(selectedStatus, isDark)}`}
            />
            <span className="font-medium">{selectedStatus}</span>
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""} ${isDark ? "text-gray-400" : "text-gray-500"}`}
          />
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
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
                  className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                    isDark
                      ? "hover:bg-slate-700/50 text-white"
                      : "hover:bg-gray-50 text-gray-900"
                  } ${selectedStatus === status ? (isDark ? "bg-slate-700/30" : "bg-blue-50/50") : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full ${getStatusColor(status, isDark)}`}
                    />
                    <span>{status}</span>
                  </div>
                  {selectedStatus === status && (
                    <Check
                      className={`w-5 h-5 ${isDark ? "text-blue-400" : "text-blue-500"}`}
                    />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
