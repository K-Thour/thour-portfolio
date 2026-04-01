import { X } from "lucide-react";

interface ContactDetailsHeaderProps {
  label: string;
  isDark: boolean;
  onClose: () => void;
}

export function ContactDetailsHeader({
  label,
  isDark,
  onClose,
}: ContactDetailsHeaderProps) {
  return (
    <div
      className={`sticky top-0 z-10 px-8 py-6 border-b ${
        isDark
          ? "bg-slate-900/95 border-red-500/20 backdrop-blur-sm"
          : "bg-white/95 border-blue-300/40 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2
            className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {label}
          </h2>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Contact Information Details
          </p>
        </div>
        <button
          onClick={onClose}
          className={`p-2 rounded-lg transition-all ${
            isDark
              ? "hover:bg-slate-800 text-gray-400 hover:text-white"
              : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
          }`}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
