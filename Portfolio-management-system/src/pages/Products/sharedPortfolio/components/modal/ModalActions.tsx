import { Loader2 } from "lucide-react";

interface ModalActionsProps {
  isDark?: boolean;
  isEditing: boolean;
  isLoading?: boolean;
  onCancel: () => void;
}

export function ModalActions({
  isEditing,
  isLoading = false,
  onCancel,
}: ModalActionsProps) {
  return (
    <div className="flex items-center gap-3 pt-4 border-t border-border/40">
      <button
        type="button"
        disabled={isLoading}
        onClick={onCancel}
        className="flex-1 px-4 py-2.5 rounded-xl font-medium text-sm bg-accent/60 hover:bg-accent text-foreground active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="flex-1 px-4 py-2.5 rounded-xl font-medium text-sm bg-primary text-primary-foreground shadow-xs hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{isEditing ? "Updating..." : "Creating..."}</span>
          </>
        ) : isEditing ? (
          "Update Collection"
        ) : (
          "Create Collection"
        )}
      </button>
    </div>
  );
}

