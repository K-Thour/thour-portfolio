import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import { KpiCards } from "./components/KpiCards";
import { RecentActivity } from "./components/RecentActivity";
import { PortfolioAnalytics } from "./components/PortfolioAnalytics";
import { fetchDashboard } from "../../services/api";

function DashboardSkeleton() {
  return (
    <div className="flex-1 flex flex-col animate-pulse select-none">
      <div className="mb-8">
        <div className="h-8 w-64 bg-muted/70 rounded-lg mb-2" />
        <div className="h-4 w-48 bg-muted/50 rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-36 rounded-2xl bg-card/60 border border-border/30 p-5 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="size-11 rounded-xl bg-muted/60" />
              <div className="size-5 rounded bg-muted/40" />
            </div>
            <div>
              <div className="h-4 w-24 bg-muted/50 rounded mb-2" />
              <div className="h-7 w-16 bg-muted/70 rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 rounded-2xl bg-card/60 border border-border/30 p-6" />
        <div className="h-80 rounded-2xl bg-card/60 border border-border/30 p-6" />
      </div>
    </div>
  );
}

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
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex-1 flex flex-col transition-colors duration-200 select-none">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1.5">
          Command Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time analytics and management pulse for your digital portfolio.
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
