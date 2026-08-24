import { ResumeForm } from "./ResumeForm/index";
import type { ResumeFormData } from "../types";
import { Modal } from "../../../../components/ui/model/Model";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ResumeFormData) => void;
}

export function ResumeModal({ isOpen, onClose, onSubmit }: ResumeModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title="AI Resume Builder & Tailor"
    >
      <ResumeForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal>
  );
}
