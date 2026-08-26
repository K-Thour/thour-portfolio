import { Loader2 } from "lucide-react";
import { navBtn } from "../../utils/leadsUtils";

interface ActionButtonsProps {
  isDark: boolean;
  canConfirm: boolean;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ActionButtons({
  isDark,
  canConfirm,
  isLoading = false,
  onCancel,
  onConfirm,
}: ActionButtonsProps) {
  return (
    <div className="flex justify-between items-center rounded-xl">
      <button
        onClick={onCancel}
        disabled={isLoading}
        className={`${navBtn(isDark, "secondary")} disabled:opacity-50`}
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={!canConfirm || isLoading}
        className={`${navBtn(isDark, "primary")} flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Updating...</span>
          </>
        ) : (
          "Update Status"
        )}
      </button>
    </div>
  );
}
