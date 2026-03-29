import { navBtn } from "../../utils/leadsUtils";

interface ActionButtonsProps {
  isDark: boolean;
  canConfirm: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ActionButtons({
  isDark,
  canConfirm,
  onCancel,
  onConfirm,
}: ActionButtonsProps) {
  return (
    <div className="flex justify-between items-center rounded-xl">
      <button onClick={onCancel} className={navBtn(isDark, "secondary")}>
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={!canConfirm}
        className={`${navBtn(isDark, "primary")} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Update Status
      </button>
    </div>
  );
}
