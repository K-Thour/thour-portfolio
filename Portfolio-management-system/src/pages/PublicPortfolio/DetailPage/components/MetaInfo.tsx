import { Calendar, Users } from "lucide-react";

interface MetaInfoProps {
  date: string;
  team: string;
  isDark: boolean;
}

export function MetaInfo({ date, team, isDark }: MetaInfoProps) {
  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex items-center gap-2">
        <Calendar
          className={`w-5 h-5 ${isDark ? "text-red-500" : "text-blue-600"}`}
        />
        <span className={isDark ? "text-gray-400" : "text-gray-600"}>
          {date}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Users
          className={`w-5 h-5 ${isDark ? "text-yellow-500" : "text-blue-500"}`}
        />
        <span className={isDark ? "text-gray-400" : "text-gray-600"}>
          {team}
        </span>
      </div>
    </div>
  );
}
