import type { ProfileCardProps } from "../types";

interface ProfileImageProps extends Pick<ProfileCardProps, "profileData"> {
  isDark?: boolean;
}

export function ProfileImage({ profileData }: ProfileImageProps) {
  return (
    <div className="relative shrink-0">
      <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border border-border/60 shadow-lg ring-4 ring-primary/10 transition-transform duration-200 hover:scale-[1.02]">
        <img
          src={profileData.image?.url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
          alt={profileData.name || "Profile avatar"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <span
        aria-label="Active status indicator"
        className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background ring-2 ring-emerald-500/20 shadow-xs"
      />
    </div>
  );
}
