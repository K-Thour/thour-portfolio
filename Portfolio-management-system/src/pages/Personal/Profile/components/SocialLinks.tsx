import { Instagram, Linkedin, Github } from "lucide-react";
import type { SocialLink, SocialLinksProps } from "../types";

export function SocialLinks({ profileData }: SocialLinksProps) {
  const socialLinks: SocialLink[] = [
    {
      icon: Instagram,
      label: "Instagram",
      url: profileData.InstagramURL,
      color: "",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: profileData.LinkedInURL,
      color: "",
    },
    {
      icon: Github,
      label: "GitHub",
      url: profileData.GitHubURL,
      color: "",
    },
  ].filter((link) => link.url);

  if (socialLinks.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-medium text-xs text-foreground bg-accent/50 hover:bg-accent border border-border/40 shadow-xs active:scale-[0.97] transition-all"
          >
            <Icon className="w-4 h-4 text-primary" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
