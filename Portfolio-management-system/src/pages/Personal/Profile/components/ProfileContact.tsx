import { Mail, Phone } from "lucide-react";
import type { ProfileCardProps } from "../types";

interface ProfileContactProps extends Pick<ProfileCardProps, "profileData"> {
  isDark?: boolean;
}

export function ProfileContact({ profileData }: ProfileContactProps) {
  return (
    <div className="space-y-2 mb-5">
      <div className="flex items-center justify-center sm:justify-start gap-2.5 text-sm">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary/10 text-primary shrink-0">
          <Mail className="w-3.5 h-3.5" />
        </div>
        <a
          href={`mailto:${profileData.email}`}
          className="text-foreground hover:text-primary transition-colors hover:underline"
        >
          {profileData.email}
        </a>
      </div>
      <div className="flex items-center justify-center sm:justify-start gap-2.5 text-sm">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary/10 text-primary shrink-0">
          <Phone className="w-3.5 h-3.5" />
        </div>
        <a
          href={`tel:${profileData.phoneNumber}`}
          className="text-foreground hover:text-primary transition-colors hover:underline"
        >
          {profileData.phoneNumber}
        </a>
      </div>
    </div>
  );
}
