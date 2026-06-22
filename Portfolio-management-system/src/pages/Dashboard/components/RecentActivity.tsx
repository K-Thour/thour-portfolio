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

export const RecentActivity = ({ isDark, activities }: RecentActivityProps) => {
  const activityList = activities || [];

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
        Recent Activity
      </h2>

      <div className="flex flex-col flex-1">
        {activityList.length === 0 ? (
          <div
            className={cn(
              "flex-1 flex items-center justify-center text-sm",
              isDark ? "text-slate-500" : "text-slate-400",
            )}
          >
            No recent activity
          </div>
        ) : (
          activityList.map((activity, index) => (
            <div
              key={activity.id}
              className={cn(
                "flex items-start gap-4 pb-4 mb-4",
                index !== activityList.length - 1
                  ? isDark
                    ? "border-b border-slate-800/60"
                    : "border-b border-blue-50/80"
                  : "pb-0 mb-0",
              )}
            >
              <div className="mt-1.5 flex-shrink-0">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    isDark ? "bg-red-500" : "bg-blue-500",
                  )}
                />
              </div>
              <div className="flex flex-col">
                <p
                  className={cn(
                    "text-sm font-medium mb-1",
                    isDark ? "text-slate-200" : "text-slate-800",
                  )}
                >
                  {activity.title}
                </p>
                <p
                  className={cn(
                    "text-xs mb-1",
                    isDark ? "text-slate-400" : "text-slate-500",
                  )}
                >
                  {activity.description}
                </p>
                <p
                  className={cn(
                    "text-xs",
                    isDark ? "text-slate-500" : "text-slate-400",
                  )}
                >
                  {formatRelativeTime(activity.time)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
