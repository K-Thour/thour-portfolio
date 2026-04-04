import {
  Home,
  User,
  ClipboardList,
  UserCog,
  Code,
  Briefcase,
  GraduationCap,
  Handshake,
  BookUser,
  Target,
} from "lucide-react";
import { type NavigationItem } from "./navbar";

export const getNavItems = (): NavigationItem[] => {
  const navConfig: NavigationItem[] = [
    {
      title: "Dashboard",
      icon: <Home size={24} />,
      path: "/dashboard",
    },
    {
      title: "Personal",
      icon: <User size={24} />,
      children: [
        {
          title: "Experience",
          icon: <Briefcase size={24} />,
          path: "/experience",
        },
        {
          title: "Education",
          icon: <GraduationCap size={24} />,
          path: "/education",
        },
      ],
    },
    {
      title: "Products",
      icon: <ClipboardList size={24} />,
      children: [
        {
          title: "Technologies",
          icon: <Code size={20} />,
          path: "/technologies",
        },
        {
          title: "Services",
          icon: <UserCog size={20} />,
          path: "/services",
        },
        {
          title: "Projects",
          icon: <ClipboardList size={20} />,
          path: "/projects",
        },
        {
          title: "Portfolio Links",
          icon: <ClipboardList size={20} />,
          path: "/shared-portfolio",
        },
      ],
    },
    {
      title: "Engagement",
      icon: <Handshake size={24} />,
      children: [
        {
          title: "Contacts",
          icon: <BookUser size={20} />,
          path: "/contacts",
        },
        {
          title: "Leads",
          icon: <Target size={20} />,
          path: "/leads",
        },
      ],
    },
  ];

  return navConfig;
};
