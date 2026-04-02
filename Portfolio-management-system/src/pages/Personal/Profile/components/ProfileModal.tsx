import { Modal } from "../../../../components/ui/model/Model";
import type { ProfileModalProps } from "../types";
import { ProfileForm } from "./profileForm/ProfileForm";

export function ProfileModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ProfileModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" size="lg">
      <ProfileForm
        onSubmit={onSubmit}
        onCancel={onClose}
        initialData={initialData}
      />
    </Modal>
  );
}
