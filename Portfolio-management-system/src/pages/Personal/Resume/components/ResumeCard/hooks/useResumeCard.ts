import {
  FileText,
  Image as ImageIcon,
  FileCode,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import type { Resume, ResumeDesignType } from "../../../types";

export function useResumeCard(resume: Resume, isDark: boolean) {
  const statusConfig = {
    pending: {
      icon: Clock,
      color: isDark
        ? "text-yellow-400 bg-yellow-400/10"
        : "text-yellow-600 bg-yellow-100",
    },
    generating: {
      icon: Loader2,
      color: isDark
        ? "text-blue-400 bg-blue-400/10"
        : "text-blue-600 bg-blue-100",
      spin: true,
    },
    completed: {
      icon: CheckCircle,
      color: isDark
        ? "text-green-400 bg-green-400/10"
        : "text-green-600 bg-green-100",
    },
    failed: {
      icon: XCircle,
      color: isDark ? "text-red-400 bg-red-400/10" : "text-red-600 bg-red-100",
    },
  };

  const designIcons: Record<
    Exclude<ResumeDesignType, null>,
    typeof FileText
  > = { image: ImageIcon, pdf: FileText, latex: FileCode };
  const DesignIcon = resume.designType
    ? designIcons[resume.designType]
    : FileText;
  const StatusIcon = statusConfig[resume.status].icon;
  const statusColor = statusConfig[resume.status].color;
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return { DesignIcon, StatusIcon, statusColor, formatDate, statusConfig };
}
