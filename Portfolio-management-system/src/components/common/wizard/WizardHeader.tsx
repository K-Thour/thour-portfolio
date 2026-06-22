import React from "react";
import { X } from "lucide-react";
import utils from "../../../utils/index";

const { cn } = utils.tailwindUtils;

interface WizardHeaderProps {
  title: string;
  isDark: boolean;
  onCancel: () => void;
}

export const WizardHeader: React.FC<WizardHeaderProps> = ({
  title,
  isDark,
  onCancel,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-b shrink-0",
        isDark
          ? "border-slate-700 bg-slate-800"
          : "border-slate-200 bg-slate-50",
      )}
    >
      <div>
        <h2
          className={cn(
            "text-lg font-bold",
            isDark ? "text-white" : "text-slate-900",
          )}
        >
          {title}
        </h2>
      </div>
      <button
        type="button"
        onClick={onCancel}
        className={cn(
          "p-1.5 rounded-lg transition-colors",
          isDark
            ? "hover:bg-slate-700 text-slate-400 hover:text-white"
            : "hover:bg-slate-100 text-slate-500 hover:text-slate-700",
        )}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default WizardHeader;
