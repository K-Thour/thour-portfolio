import React from "react";
import { useAppSelector } from "../../hooks/useRedux";
import { KpiCards } from "./components/KpiCards";
import { RecentActivity } from "./components/RecentActivity";
import { PortfolioAnalytics } from "./components/PortfolioAnalytics";
import utils from "../../utils";

const { cn } = utils.tailwindUtils;

export const Dashboard: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "flex-1 flex flex-col transition-colors duration-500",
        // MainLayout provides base padding, we structure our dashboard cleanly
      )}
    >
      <div className="mb-8">
        <h1
          className={cn(
            "text-3xl font-bold tracking-tight mb-2",
            isDark ? "text-white" : "text-slate-900",
          )}
        >
          {isDark ? "Mission Dashboard" : "Command Overview"}
        </h1>
        <p
          className={cn(
            "text-sm",
            isDark ? "text-slate-400" : "text-slate-500",
          )}
        >
          {isDark
            ? "Your portfolio performance at a glance"
            : "Survey your digital realm"}
        </p>
      </div>

      <KpiCards isDark={isDark} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity isDark={isDark} />
        <PortfolioAnalytics isDark={isDark} />
      </div>
    </div>
  );
};

export default Dashboard;
