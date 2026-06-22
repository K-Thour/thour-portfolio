import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import { KpiCards } from "./components/KpiCards";
import { RecentActivity } from "./components/RecentActivity";
import { PortfolioAnalytics } from "./components/PortfolioAnalytics";
import { fetchDashboard } from "../../services/api";
import utils from "../../utils";

const { cn } = utils.tailwindUtils;

export const Dashboard: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadDashboardData = async () => {
      try {
        const res = await fetchDashboard();
        if (active) {
          setData(res);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard metrics:", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };
    loadDashboardData();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px]">
        <div
          className={cn(
            "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2",
            isDark ? "border-red-500" : "border-blue-500",
          )}
        ></div>
      </div>
    );
  }

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

      <KpiCards isDark={isDark} kpis={data?.kpis || null} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity
          isDark={isDark}
          activities={data?.recentActivity || null}
        />
        <PortfolioAnalytics
          isDark={isDark}
          analytics={data?.analytics || null}
        />
      </div>
    </div>
  );
};

export default Dashboard;
