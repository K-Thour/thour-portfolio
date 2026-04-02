import { Calendar, CheckCircle, Code, Users } from "lucide-react";
import type { ProfileData } from "../types";

export const getStats = (profileData: ProfileData, isDark: boolean) => {
  return [
    {
      icon: Calendar,
      label: isDark ? "Years Experience" : "Years of Wisdom",
      value: profileData.experience,
      suffix: "+",
    },
    {
      icon: CheckCircle,
      label: isDark ? "Projects Completed" : "Quests Completed",
      value: profileData.completedProjects,
      suffix: "+",
    },
    {
      icon: Code,
      label: isDark ? "Problems Solved" : "Challenges Conquered",
      value: profileData.solvedProblems,
      suffix: "+",
    },
    {
      icon: Users,
      label: isDark ? "Happy Clients" : "Allied Warriors",
      value: profileData.happyClients,
      suffix: "+",
    },
  ];
};
