import { Loader2 } from "lucide-react";

interface FormActionsProps {
  onSubmit: () => void;
  onCancel: () => void;
  isEditing?: boolean;
  isLoading?: boolean;
}

export function FormActions({
  onSubmit,
  onCancel,
  isEditing = false,
  isLoading = false,
}: FormActionsProps) {
  return (
    <div className="flex gap-3 pt-4 border-t border-border/40">
      <button
        type="button"
        onClick={onCancel}
        disabled={isLoading}
        className="flex-1 px-5 py-2.5 rounded-xl font-medium text-sm transition-all border border-border/60 hover:bg-accent/60 text-foreground active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading}
        className="flex-1 px-5 py-2.5 rounded-xl font-medium text-sm transition-all bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.97] shadow-sm disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{isEditing ? "Updating..." : "Adding..."}</span>
          </>
        ) : (
          <span>{isEditing ? "Update Technology" : "Add Technology"}</span>
        )}
      </button>
    </div>
  );
}
