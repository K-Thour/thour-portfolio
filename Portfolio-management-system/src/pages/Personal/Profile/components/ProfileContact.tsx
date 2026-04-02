import { Mail, Phone } from "lucide-react";
import type { ProfileCardProps } from "../types";

interface ProfileContactProps extends Pick<ProfileCardProps, "profileData"> {
  isDark: boolean;
}

export function ProfileContact({ profileData, isDark }: ProfileContactProps) {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex items-center gap-3">
        <Mail
          className={`w-5 h-5 ${isDark ? "text-red-400" : "text-blue-600"}`}
        />
        <a
          href={`mailto:${profileData.email}`}
          className={`hover:underline ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          {profileData.email}
        </a>
      </div>
      <div className="flex items-center gap-3">
        <Phone
          className={`w-5 h-5 ${isDark ? "text-red-400" : "text-blue-600"}`}
        />
        <a
          href={`tel:${profileData.phoneNumber}`}
          className={`hover:underline ${isDark ? "text-gray-300" : "text-gray-700"}`}
        >
          {profileData.phoneNumber}
        </a>
      </div>
    </div>
  );
}
