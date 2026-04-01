import {
  Globe,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import type { Contact } from "../../../types";

interface ContactDetailsSocialProps {
  contact: Contact;
  isDark: boolean;
}

const socialLinksConfig = [
  { icon: Globe, label: "Website", field: "website" as const },
  { icon: Linkedin, label: "LinkedIn", field: "linkedin" as const },
  { icon: Github, label: "GitHub", field: "github" as const },
  { icon: Twitter, label: "Twitter", field: "twitter" as const },
  { icon: Instagram, label: "Instagram", field: "instagram" as const },
  { icon: Facebook, label: "Facebook", field: "facebook" as const },
  { icon: Youtube, label: "YouTube", field: "youtube" as const },
];

export function ContactDetailsSocial({
  contact,
  isDark,
}: ContactDetailsSocialProps) {
  const activeLinks = socialLinksConfig.filter(({ field }) => contact[field]);
  if (activeLinks.length === 0) return null;

  return (
    <div>
      <h3
        className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isDark
              ? "bg-linear-to-br from-red-600 to-yellow-500"
              : "bg-linear-to-br from-blue-600 to-blue-400"
          }`}
        >
          <Globe className="w-4 h-4 text-white" />
        </div>
        Social Media & Web
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activeLinks.map(({ icon: Icon, label, field }) => (
          <a
            key={field}
            href={contact[field]}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-xl border transition-all hover:scale-105 ${
              isDark
                ? "bg-slate-800/50 border-red-500/20 hover:border-red-500/50"
                : "bg-blue-50/50 border-blue-300/40 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                className={`w-5 h-5 ${isDark ? "text-red-400" : "text-blue-600"}`}
              />
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs mb-1 ${isDark ? "text-gray-500" : "text-gray-600"}`}
                >
                  {label}
                </p>
                <p
                  className={`font-medium truncate ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {contact[field]?.replace(/^https?:\/\/(www\.)?/, "")}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
