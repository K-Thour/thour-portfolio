import type { ProfileModalProps } from "../types";
import { ProfileFormWizard } from "./ProfileFormWizard";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { RootState } from "../../../../store/store";

export function ProfileModal({
  isOpen,
  isLoading = false,
  onClose,
  onSubmit,
  initialData,
}: ProfileModalProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  if (!isOpen) return null;

  return (
    <ProfileFormWizard
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={initialData}
      isDark={isDark}
    />
  );
}
