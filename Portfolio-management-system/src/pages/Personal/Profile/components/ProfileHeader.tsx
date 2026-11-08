import { ArrowLeft, Edit2 } from "lucide-react";
import type { ProfileHeaderProps } from "../types";
import { ThemeToggle } from "../../../../components/ui/themeToggle/ThemeToggle";
import { useAuthentication } from "../../../../hooks/useAuthentication";

export function ProfileHeader({ onEdit, onBack }: ProfileHeaderProps) {
  const { isAuthenticated } = useAuthentication();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          type="button"
          aria-label="Go back"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all bg-card/80 hover:bg-accent/60 border border-border/50 text-foreground active:scale-[0.97] shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Profile Settings
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage your personal identity, contact details, and career metrics
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        <ThemeToggle />
        {isAuthenticated && (
          <button
            onClick={onEdit}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.97] shadow-sm cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
