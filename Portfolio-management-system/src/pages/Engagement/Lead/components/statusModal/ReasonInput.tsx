import { motion } from "motion/react";
import { AlertCircle } from "lucide-react";

interface ReasonInputProps {
  reason: string;
  isDark: boolean;
  onChange: (value: string) => void;
}

export function ReasonInput({ reason, isDark, onChange }: ReasonInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-2"
    >
      <div className="flex items-center gap-2">
        <AlertCircle
          className={`w-4 h-4 ${isDark ? "text-yellow-400" : "text-yellow-600"}`}
        />
        <label
          className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          Reason for Change *
        </label>
      </div>
      <textarea
        value={reason}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter reason for status change..."
        rows={3}
        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 resize-none ${
          isDark
            ? "bg-slate-900/50 border-slate-600 text-white focus:ring-blue-500 placeholder:text-gray-500"
            : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 placeholder:text-gray-400"
        }`}
      />
    </motion.div>
  );
}
