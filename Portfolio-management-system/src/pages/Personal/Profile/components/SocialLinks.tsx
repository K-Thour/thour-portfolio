import { Instagram, Linkedin, Github } from "lucide-react";
import type { SocialLink, SocialLinksProps } from "../types";

export function SocialLinks({ profileData }: SocialLinksProps) {
  const socialLinks: SocialLink[] = [
    {
      icon: Instagram,
      label: "Instagram",
      url: profileData.InstagramURL,
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: profileData.LinkedInURL,
      color: "from-blue-700 to-blue-500",
    },
    {
      icon: Github,
      label: "GitHub",
      url: profileData.GitHubURL,
      color: "from-gray-800 to-gray-600",
    },
  ].filter((link) => link.url);

  if (socialLinks.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white transition-all hover:scale-105 shadow-lg bg-linear-to-r ${link.color}`}
          >
            <Icon className="w-5 h-5" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
