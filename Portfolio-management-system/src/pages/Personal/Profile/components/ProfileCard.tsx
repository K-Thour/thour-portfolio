import { motion } from "motion/react";
import type { ProfileCardProps } from "../types";
import { ProfileImage } from "./ProfileImage";
import { ProfileContact } from "./ProfileContact";
import { SocialLinks } from "./SocialLinks";

export function ProfileCard({ profileData }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 26, stiffness: 280 }}
      className="p-6 sm:p-8 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs relative overflow-hidden transition-all duration-200"
    >
      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
        <ProfileImage profileData={profileData} />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {profileData.name}
            </h2>
          </div>
          <ProfileContact profileData={profileData} />
          <SocialLinks profileData={profileData} />
        </div>
      </div>
    </motion.div>
  );
}
