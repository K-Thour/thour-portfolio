import type { ProfileCardProps } from "../types";

interface ProfileImageProps extends Pick<ProfileCardProps, "profileData"> {
  isDark: boolean;
}

export function ProfileImage({ profileData, isDark }: ProfileImageProps) {
  return (
    <div className="shrink-0">
      <div
        className={`w-40 h-40 rounded-2xl overflow-hidden border-4 ${
          isDark
            ? "border-red-500/50 shadow-lg shadow-red-500/30"
            : "border-blue-500/50 shadow-lg shadow-blue-500/30"
        }`}
      >
        <img
          src={profileData.image.url || "https://via.placeholder.com/400"}
          alt={profileData.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
