import { Modal } from "../../../../components/ui/model/Model";
import { ServiceForm } from "./serviceForm/ServiceForm";
import type { ServiceModalProps } from "./types";

export function ServiceModal({
  isOpen,
  onClose,
  editingService,
  onSubmit,
}: ServiceModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingService ? "Edit Service" : "Add New Service"}
      size="lg"
    >
      <ServiceForm
        onSubmit={onSubmit}
        onCancel={onClose}
        initialData={editingService || undefined}
      />
    </Modal>
  );
}
