import { Calendar, Users } from "lucide-react";

interface MetaInfoProps {
  date: string;
  team: string;
  isDark?: boolean;
}

export function MetaInfo({ date, team }: MetaInfoProps) {
  return (
    <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
      {date && (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{date}</span>
        </div>
      )}
      {team && (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <span>{team}</span>
        </div>
      )}
    </div>
  );
}

