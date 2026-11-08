import { Folder, Briefcase, GitBranch, Mail, ArrowUpRight } from "lucide-react";
import Card from "../../../components/ui/card/Card";
import utils from "../../../utils";

const { cn } = utils.tailwindUtils;

interface KpiCardsProps {
  isDark: boolean;
  kpis: {
    projects: number;
    services: number;
    commits: number;
    messages: number;
    unreadMessages: number;
  } | null;
}

const formatNumber = (num: number) => num.toLocaleString();

export const KpiCards = ({ kpis }: KpiCardsProps) => {
  const cards = [
    {
      id: "projects",
      title: "Total Projects",
      value: kpis ? kpis.projects : 0,
      subtitle: "+2 this month",
      icon: <Folder className="size-5 text-blue-500" />,
      iconBg: "bg-blue-500/10 ring-1 ring-blue-500/20",
      trendIcon: <ArrowUpRight className="size-4 text-emerald-500" />,
    },
    {
      id: "services",
      title: "Active Services",
      value: kpis ? kpis.services : 0,
      subtitle: "All operational",
      icon: <Briefcase className="size-5 text-purple-500" />,
      iconBg: "bg-purple-500/10 ring-1 ring-purple-500/20",
      trendIcon: <ArrowUpRight className="size-4 text-emerald-500" />,
    },
    {
      id: "commits",
      title: "Git Commits",
      value: kpis ? kpis.commits : 0,
      subtitle: "+42 this week",
      icon: <GitBranch className="size-5 text-emerald-500" />,
      iconBg: "bg-emerald-500/10 ring-1 ring-emerald-500/20",
      trendIcon: <ArrowUpRight className="size-4 text-emerald-500" />,
    },
    {
      id: "messages",
      title: "New Messages",
      value: kpis ? kpis.messages : 0,
      subtitle: kpis ? `${kpis.unreadMessages} unread` : "0 unread",
      icon: <Mail className="size-5 text-amber-500" />,
      iconBg: "bg-amber-500/10 ring-1 ring-amber-500/20",
      trendIcon: <ArrowUpRight className="size-4 text-emerald-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      {cards.map((card) => (
        <Card
          key={card.id}
          className={cn(
            "p-5 flex flex-col justify-between rounded-2xl select-none",
            "bg-card/75 backdrop-blur-xl border border-border/40 shadow-sm hover:shadow-md",
            "transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer",
          )}
        >
          <div className="flex justify-between items-start mb-5">
            <div
              className={cn(
                "size-11 rounded-xl flex items-center justify-center transition-colors",
                card.iconBg,
              )}
            >
              {card.icon}
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full ring-1 ring-emerald-500/20">
              {card.trendIcon}
              <span>Active</span>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {card.title}
            </h3>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {formatNumber(card.value)}
              </p>
              <span className="text-xs text-muted-foreground">
                {card.subtitle}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
