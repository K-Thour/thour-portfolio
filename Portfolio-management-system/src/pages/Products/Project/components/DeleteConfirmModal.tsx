import ConfirmModel from "../../../../components/common/confirmModel/confirmModel";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isDark: boolean;
  isLoading?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  isDark,
  isLoading = false,
}: DeleteConfirmModalProps) {
  return (
    <ConfirmModel
      isOpen={isOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
      isLoading={isLoading}
      loadingText="Deleting..."
      title={isDark ? "Delete Project?" : "Remove Project?"}
      message={
        isDark
          ? "This will permanently remove this project from your portfolio. Visitors will no longer see it."
          : "This project will be removed from your portfolio. It cannot be restored."
      }
      confirmText="Delete"
      cancelText="Cancel"
    />
  );
}
