import type { ServiceModalProps } from "./types";
import { ServiceFormWizard } from "./ServiceFormWizard";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { RootState } from "../../../../store/store";

export function ServiceModal({
  isOpen,
  onClose,
  editingService,
  onSubmit,
}: ServiceModalProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  if (!isOpen) return null;

  return (
    <ServiceFormWizard
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={editingService || undefined}
      isDark={isDark}
      isEditing={!!editingService}
    />
  );
}

export default ServiceModal;
