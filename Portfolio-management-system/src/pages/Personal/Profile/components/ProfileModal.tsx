import type { ProfileModalProps } from "../types";
import { ProfileFormWizard } from "./ProfileFormWizard";
import { useTheme } from "../../../../context/ThemeContext";

export function ProfileModal({
  isOpen,
  isLoading = false,
  onClose,
  onSubmit,
  initialData,
}: ProfileModalProps) {
  const { theme } = useTheme();
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
      isEditing={Boolean(initialData?.name)}
    />
  );
}
