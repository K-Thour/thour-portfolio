import {
  Home,
  User,
  UserSearch,
  ClipboardList,
  UserCog,
  Code,
  Shield,
  Key,
  Calendar,
  Briefcase,
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
      title: "Experience",
      icon: <Briefcase size={24} />,
      path: "/experience",
    },
    {
      title: "Personal",
      icon: <User size={24} />,
      children: [
        {
          title: "Users",
          icon: <User size={20} />,
          path: "/users",
        },
        {
          title: "Leaves",
          icon: <ClipboardList size={20} />,
          path: "/leaves",
        },
        {
          title: "Tasks",
          icon: <ClipboardList size={20} />,
          path: "/tasks",
        },
        {
          title: "Roles",
          icon: <Shield size={20} />,
          path: "/roles",
        },
        {
          title: "Permissions",
          icon: <Key size={20} />,
          path: "/permissions",
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
          path: "/portfolio-collections",
        },
      ],
    },
    {
      title: "Contact & Leads",
      icon: <UserSearch size={24} />,
      children: [
        {
          title: "Contacts",
          icon: <UserSearch size={20} />,
          path: "/contacts",
        },
        {
          title: "Leads",
          icon: <UserSearch size={20} />,
          path: "/leads",
        },
      ],
    },
    {
      title: "Holidays",
      icon: <Calendar size={24} />,
      path: "/holidays",
    },
  ];

  return navConfig;
};
