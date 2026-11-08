import { Eye, TrendingUp, Clock } from "lucide-react";
import Card from "../../../components/ui/card/Card";
import utils from "../../../utils";

const { cn } = utils.tailwindUtils;

interface PortfolioAnalyticsProps {
  isDark: boolean;
  analytics: {
    views: { value: string; trend: string };
    conversionRate: { value: string; trend: string };
    sessionTime: { value: string; trend: string };
  } | null;
}

export const PortfolioAnalytics = ({
  analytics,
}: PortfolioAnalyticsProps) => {
  const analyticsData = [
    {
      id: "views",
      title: "Total Impressions",
      value: analytics ? analytics.views.value : "0",
      trend: analytics ? analytics.views.trend : "+0%",
      icon: <Eye className="size-4.5 text-blue-500" />,
      iconBg: "bg-blue-500/10 ring-1 ring-blue-500/20",
    },
    {
      id: "conversion",
      title: "Lead Conversion",
      value: analytics ? analytics.conversionRate.value : "0.0%",
      trend: analytics ? analytics.conversionRate.trend : "+0%",
      icon: <TrendingUp className="size-4.5 text-emerald-500" />,
      iconBg: "bg-emerald-500/10 ring-1 ring-emerald-500/20",
    },
    {
      id: "session",
      title: "Avg. Engagement Duration",
      value: analytics ? analytics.sessionTime.value : "00:00:00",
      trend: analytics ? analytics.sessionTime.trend : "+0%",
      icon: <Clock className="size-4.5 text-purple-500" />,
      iconBg: "bg-purple-500/10 ring-1 ring-purple-500/20",
    },
  ];

  return (
    <Card
      className={cn(
        "p-6 flex flex-col h-full rounded-2xl select-none",
        "bg-card/75 backdrop-blur-xl border border-border/40 shadow-sm",
        "transition-colors duration-200",
      )}
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          Portfolio Analytics
        </h2>
        <span className="text-xs text-muted-foreground font-medium">30-day metrics</span>
      </div>

      <div className="flex flex-col gap-3.5 flex-1 justify-between">
        {analyticsData.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl flex items-center justify-between bg-accent/30 hover:bg-accent/50 border border-border/30 transition-all duration-150"
          >
            <div className="flex items-center gap-3.5">
              <div
                className={cn(
                  "size-10 rounded-xl flex items-center justify-center shrink-0",
                  item.iconBg,
                )}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {item.title}
                </p>
                <p className="text-xl font-bold tracking-tight text-foreground mt-0.5">
                  {item.value}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full ring-1 ring-emerald-500/20 font-mono">
                {item.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
