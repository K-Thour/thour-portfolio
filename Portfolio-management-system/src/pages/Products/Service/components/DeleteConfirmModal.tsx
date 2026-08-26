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
      title={isDark ? "Delete Service?" : "Remove Service Offering?"}
      message={
        isDark
          ? "This will permanently remove this service from your offerings. Clients will no longer see it."
          : "This service will be removed from the sacred offerings. It cannot be restored."
      }
      confirmText="Delete"
      cancelText="Cancel"
    />
  );
}
