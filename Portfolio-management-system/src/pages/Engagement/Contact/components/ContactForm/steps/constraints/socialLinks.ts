import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

export const socialLinks = [
  {
    field: "website" as const,
    icon: Globe,
    label: "Website",
    placeholder: "https://yourwebsite.com",
  },
  {
    field: "linkedin" as const,
    icon: Linkedin,
    label: "LinkedIn",
    placeholder: "LinkedIn profile URL",
  },
  {
    field: "github" as const,
    icon: Github,
    label: "GitHub",
    placeholder: "GitHub profile URL",
  },
  {
    field: "twitter" as const,
    icon: Twitter,
    label: "Twitter",
    placeholder: "Twitter/X profile URL",
  },
  {
    field: "instagram" as const,
    icon: Instagram,
    label: "Instagram",
    placeholder: "Instagram profile URL",
  },
  {
    field: "facebook" as const,
    icon: Facebook,
    label: "Facebook",
    placeholder: "Facebook profile URL",
  },
  {
    field: "youtube" as const,
    icon: Youtube,
    label: "YouTube",
    placeholder: "YouTube channel URL",
  },
];
