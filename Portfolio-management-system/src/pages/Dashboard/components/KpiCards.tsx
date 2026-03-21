import { Folder, Briefcase, GitBranch, Mail, ArrowUpRight } from "lucide-react";
import Card from "../../../components/ui/card/Card";
import utils from "../../../utils";

const { cn } = utils.tailwindUtils;

interface KpiCardsProps {
  isDark: boolean;
}

const formatNumber = (num: number) => num.toLocaleString();

export const KpiCards = ({ isDark }: KpiCardsProps) => {
  const cards = [
    {
      id: "projects",
      title: "Total Projects",
      value: 12,
      subtitle: "+2 this month",
      icon: <Folder className="w-5 h-5 text-white" />,
      iconBg: "bg-red-500", // Red icon bg for projects based on screenshot
      trendIcon: <ArrowUpRight className="w-4 h-4 text-emerald-500" />,
      iconBgLight: "bg-blue-500",
    },
    {
      id: "services",
      title: "Active Services",
      value: 6,
      subtitle: "All operational",
      icon: <Briefcase className="w-5 h-5 text-white" />,
      iconBg: "bg-blue-500", // Blue icon bg for services
      trendIcon: <ArrowUpRight className="w-4 h-4 text-emerald-500" />,
      iconBgLight: "bg-blue-500",
    },
    {
      id: "commits",
      title: "Git Commits", // Replaced Total Leads with Git Commits
      value: 1248,
      subtitle: "+42 this week",
      icon: <GitBranch className="w-5 h-5 text-white" />,
      iconBg: "bg-purple-500", // Purple icon bg for leads/commits
      trendIcon: <ArrowUpRight className="w-4 h-4 text-emerald-500" />,
      iconBgLight: "bg-blue-500",
    },
    {
      id: "messages",
      title: "New Messages",
      value: 23,
      subtitle: "5 unread",
      icon: <Mail className="w-5 h-5 text-white" />,
      iconBg: "bg-amber-500", // Yellow icon bg for messages
      trendIcon: <ArrowUpRight className="w-4 h-4 text-emerald-500" />,
      iconBgLight: "bg-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      {cards.map((card) => (
        <Card
          key={card.id}
          className={cn(
            "p-5 flex flex-col justify-between shadow-md transition-all duration-300",
            isDark
              ? "bg-[#151726]/90 border border-slate-800/60 shadow-black/40"
              : "bg-white border border-blue-50/80 shadow-blue-100/50",
          )}
        >
          <div className="flex justify-between items-start mb-6">
            <div
              className={cn(
                "p-3 rounded-xl flex items-center justify-center shadow-lg",
                isDark ? card.iconBg : card.iconBgLight,
                isDark ? "shadow-black/20" : "shadow-blue-500/20",
              )}
            >
              {card.icon}
            </div>
            <div className="flex items-center">{card.trendIcon}</div>
          </div>
          <div>
            <h3
              className={cn(
                "text-sm font-medium mb-1",
                isDark ? "text-slate-400" : "text-slate-500",
              )}
            >
              {card.title}
            </h3>
            <p
              className={cn(
                "text-2xl sm:text-3xl font-bold tracking-tight mb-1",
                isDark ? "text-slate-100" : "text-slate-800",
              )}
            >
              {formatNumber(card.value)}
            </p>
            <p
              className={cn(
                "text-xs",
                isDark ? "text-slate-500" : "text-slate-500",
              )}
            >
              {card.subtitle}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};
