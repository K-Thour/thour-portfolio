import { motion } from "motion/react";
import { useAppSelector } from "../../../../hooks/useRedux";
import type { ProfileCardProps } from "../types";
import { ProfileImage } from "./ProfileImage";
import { ProfileContact } from "./ProfileContact";
import { SocialLinks } from "./SocialLinks";

export function ProfileCard({ profileData }: ProfileCardProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-8 rounded-2xl border relative overflow-hidden ${
        isDark
          ? "bg-slate-800/50 border-red-500/20"
          : "bg-linear-to-br from-white to-blue-50 border-blue-300/40 shadow-xl shadow-blue-500/10"
      }`}
    >
      <div
        className={`absolute inset-0 opacity-5 ${
          isDark
            ? "bg-linear-to-br from-red-600 to-yellow-500"
            : "bg-linear-to-br from-blue-600 to-blue-400"
        }`}
      />
      <div className="relative flex flex-col md:flex-row gap-8">
        <ProfileImage profileData={profileData} isDark={isDark} />
        <div className="flex-1">
          <h2
            className={`text-3xl font-bold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {profileData.name}
          </h2>
          <ProfileContact profileData={profileData} isDark={isDark} />
          <SocialLinks profileData={profileData} />
        </div>
      </div>
    </motion.div>
  );
}
