import { Instagram, Linkedin, Github } from "lucide-react";
import type { SocialInputsProps } from "../types";

export function SocialInputs({
  formData,
  isDark,
  onSocialChange,
}: SocialInputsProps) {
  const socialInputs = [
    {
      icon: Instagram,
      field: "InstagramURL" as const,
      placeholder: "Instagram profile URL",
    },
    {
      icon: Linkedin,
      field: "LinkedInURL" as const,
      placeholder: "LinkedIn profile URL",
    },
    {
      icon: Github,
      field: "GitHubURL" as const,
      placeholder: "GitHub profile URL",
    },
  ];

  return (
    <div>
      <h3
        className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        Social Media Links
      </h3>
      <div className="space-y-3">
        {socialInputs.map(({ icon: Icon, field, placeholder }) => (
          <div key={field} className="relative">
            <Icon
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <input
              type="url"
              value={formData[field]}
              onChange={(e) => onSocialChange(field, e.target.value)}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
              }`}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
