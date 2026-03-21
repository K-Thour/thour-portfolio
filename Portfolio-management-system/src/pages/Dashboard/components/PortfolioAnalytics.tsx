import { Eye, TrendingUp, Clock } from "lucide-react";
import Card from "../../../components/ui/card/Card";
import utils from "../../../utils";

const { cn } = utils.tailwindUtils;

interface PortfolioAnalyticsProps {
  isDark: boolean;
}

export const PortfolioAnalytics = ({ isDark }: PortfolioAnalyticsProps) => {
  const analytics = [
    {
      id: "views",
      title: "Total Views",
      value: "12,459",
      trend: "+23% from last month",
      icon: <Eye className="w-5 h-5" />,
      iconColorDark: "text-red-500",
      iconColorLight: "text-blue-500",
    },
    {
      id: "conversion",
      title: "Conversion Rate",
      value: "34.5%",
      trend: "+5.2% improvement",
      icon: <TrendingUp className="w-5 h-5" />,
      iconColorDark: "text-yellow-500",
      iconColorLight: "text-blue-400",
    },
    {
      id: "session",
      title: "Avg. Session Time",
      value: "00:03:45",
      trend: "+12s from last week",
      icon: <Clock className="w-5 h-5" />,
      iconColorDark: "text-blue-500",
      iconColorLight: "text-blue-300",
    },
  ];

  return (
    <Card
      className={cn(
        "p-6 flex flex-col h-full transition-all duration-300",
        isDark
          ? "bg-[#151726]/90 border-slate-800/60 shadow-black/40"
          : "bg-white border-blue-50/80 shadow-blue-100/50",
      )}
    >
      <h2
        className={cn(
          "text-lg font-semibold mb-6",
          isDark ? "text-slate-100" : "text-slate-800",
        )}
      >
        Portfolio Analytics
      </h2>

      <div className="flex flex-col gap-4">
        {analytics.map((item) => (
          <div
            key={item.id}
            className={cn(
              "p-4 rounded-xl flex items-center justify-between transition-colors",
              isDark ? "bg-slate-900/50" : "bg-blue-50/50",
            )}
          >
            <div>
              <p
                className={cn(
                  "text-sm mb-1",
                  isDark ? "text-slate-400" : "text-slate-500",
                )}
              >
                {item.title}
              </p>
              <p
                className={cn(
                  "text-2xl font-bold tracking-tight mb-1",
                  isDark ? "text-slate-100" : "text-slate-800",
                )}
              >
                {item.value}
              </p>
              <p className="text-xs text-emerald-500">{item.trend}</p>
            </div>
            <div
              className={cn(
                "p-2 rounded-lg",
                isDark ? item.iconColorDark : item.iconColorLight,
              )}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
