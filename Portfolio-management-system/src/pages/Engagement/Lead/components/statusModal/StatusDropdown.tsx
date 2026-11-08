import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import type { LeadStatus } from "../../types";

const statusOptions: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
];

const statusDotColors: Record<LeadStatus, string> = {
  New: "bg-blue-500",
  Contacted: "bg-amber-500",
  Qualified: "bg-emerald-500",
  "Proposal Sent": "bg-cyan-500",
  Won: "bg-emerald-500",
  Lost: "bg-destructive",
};

interface StatusDropdownProps {
  selectedStatus: LeadStatus;
  isDropdownOpen: boolean;
  isDark?: boolean;
  onToggle: () => void;
  onSelect: (status: LeadStatus) => void;
}

export function StatusDropdown({
  selectedStatus,
  isDropdownOpen,
  onToggle,
  onSelect,
}: StatusDropdownProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-foreground">
        Lead Status
      </label>

      {/* Trigger Button */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.99 }}
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-border/50 bg-accent/30 hover:bg-accent/50 text-foreground transition-all duration-200 cursor-pointer shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/25"
        aria-expanded={isDropdownOpen}
      >
        <div className="flex items-center gap-2.5">
          <span
            className={`w-2.5 h-2.5 rounded-full ${statusDotColors[selectedStatus] || "bg-muted-foreground"} ring-2 ring-background`}
          />
          <span className="font-semibold text-sm">{selectedStatus}</span>
        </div>
        <motion.div
          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </motion.button>

      {/* Inline Apple-grade Expandable Options List */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="overflow-hidden"
          >
            <div className="mt-2.5 p-1.5 rounded-2xl border border-border/50 bg-accent/20 backdrop-blur-xl space-y-1">
              {statusOptions.map((status) => {
                const isSelected = selectedStatus === status;
                return (
                  <motion.button
                    key={status}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(status)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                      isSelected
                        ? "bg-card font-semibold text-foreground border border-border/60 shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${statusDotColors[status]} ring-2 ring-background`}
                      />
                      <span>{status}</span>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          damping: 20,
                          stiffness: 350,
                        }}
                      >
                        <Check className="w-4 h-4 text-primary" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
