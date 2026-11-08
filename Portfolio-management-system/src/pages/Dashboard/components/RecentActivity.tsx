import Card from "../../../components/ui/card/Card";
import { DateTime } from "luxon";
import utils from "../../../utils";

const { cn } = utils.tailwindUtils;

interface RecentActivityProps {
  isDark: boolean;
  activities: Array<{
    id: string;
    title: string;
    description: string;
    time: string;
  }> | null;
}

const formatRelativeTime = (timeStr: string) => {
  const dt = DateTime.fromISO(timeStr);
  if (!dt.isValid) return timeStr;
  return dt.toRelative() || timeStr;
};

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  const activityList = activities || [];

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
          Recent Activity
        </h2>
        <span className="text-xs text-muted-foreground font-medium">Live Feed</span>
      </div>

      <div className="flex flex-col flex-1 divide-y divide-border/30">
        {activityList.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground min-h-[160px]">
            No recent activity recorded yet.
          </div>
        ) : (
          activityList.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0 group"
            >
              <div className="mt-1 size-2 rounded-full bg-primary/70 shrink-0 ring-4 ring-primary/10" />
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground tracking-tight truncate">
                    {activity.title}
                  </p>
                  <span className="text-[11px] text-muted-foreground shrink-0 font-mono">
                    {formatRelativeTime(activity.time)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {activity.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
