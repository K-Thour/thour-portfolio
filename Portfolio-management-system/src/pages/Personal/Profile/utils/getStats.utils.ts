import { Calendar, CheckCircle, Code, Users } from "lucide-react";
import type { ProfileData } from "../types";

export const getStats = (profileData: ProfileData, _isDark?: boolean) => {
  return [
    {
      icon: Calendar,
      label: "Years of Experience",
      value: profileData.experience,
      suffix: "+",
    },
    {
      icon: CheckCircle,
      label: "Projects Completed",
      value: profileData.completedProjects,
      suffix: "+",
    },
    {
      icon: Code,
      label: "Problems Solved",
      value: profileData.solvedProblems,
      suffix: "+",
    },
    {
      icon: Users,
      label: "Happy Clients",
      value: profileData.happyClients,
      suffix: "+",
    },
  ];
};
