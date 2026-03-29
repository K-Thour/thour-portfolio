import { Modal } from "../../../../components/ui/model/Model";
import { StatusDropdown, ReasonInput, ActionButtons } from "./statusModal";
import type { ChangeStatusModalProps } from "../types";
import { useChangeStatus } from "../hooks/useChangeStatus";

export function ChangeStatusModal({
  lead,
  isOpen,
  onClose,
  isDark,
  onConfirm,
}: ChangeStatusModalProps) {
  const {
    selectedStatus,
    isDropdownOpen,
    reason,
    requiresReason,
    canConfirm,
    setIsDropdownOpen,
    setReason,
    handleStatusSelect,
    reset,
  } = useChangeStatus(lead);

  if (!lead) return null;

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm(lead.id, selectedStatus, reason || undefined);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Change Lead Status"
      size="sm"
    >
      <div className="space-y-6">
        <StatusDropdown
          selectedStatus={selectedStatus}
          isDropdownOpen={isDropdownOpen}
          isDark={isDark}
          onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
          onSelect={handleStatusSelect}
        />

        {requiresReason && (
          <ReasonInput reason={reason} isDark={isDark} onChange={setReason} />
        )}

        <ActionButtons
          isDark={isDark}
          canConfirm={canConfirm}
          onCancel={handleClose}
          onConfirm={handleConfirm}
        />
      </div>
    </Modal>
  );
}
