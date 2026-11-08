import React from "react";
import { X } from "lucide-react";

interface WizardHeaderProps {
  title: string;
  isDark: boolean;
  onCancel: () => void;
}

export const WizardHeader: React.FC<WizardHeaderProps> = ({
  title,
  onCancel,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 shrink-0 bg-card/50">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-foreground">
          {title}
        </h2>
      </div>
      <button
        type="button"
        onClick={onCancel}
        aria-label="Close dialog"
        className="p-1.5 rounded-xl transition-colors hover:bg-accent/60 text-muted-foreground hover:text-foreground active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default WizardHeader;
