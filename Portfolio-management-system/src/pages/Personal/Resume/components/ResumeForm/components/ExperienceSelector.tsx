import { useEffect, useState, useMemo } from "react";
import { History, Check, Sparkles, RefreshCw, Calendar, Building2 } from "lucide-react";
import { fetchExperiences } from "../../../../../../services/api";

export interface ExperienceItem {
  id: string;
  companyName: string;
  position: string;
  dateOfJoining?: string;
  dateOfLeaving?: string;
  stillWorking?: boolean;
  description?: string;
}

interface ExperienceSelectorProps {
  selectedExperienceIds: string[];
  isDark: boolean;
  onExperiencesChange: (experienceIds: string[]) => void;
}

export function ExperienceSelector({
  selectedExperienceIds,
  isDark,
  onExperiencesChange,
}: ExperienceSelectorProps) {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isManualMode, setIsManualMode] = useState(selectedExperienceIds.length > 0);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchExperiences();
        if (isMounted && Array.isArray(data)) {
          const mapped: ExperienceItem[] = data.map((e: any) => ({
            id: e._id || e.id,
            companyName: e.companyName || "Company",
            position: e.position || "Software Engineer",
            dateOfJoining: e.dateOfJoining,
            dateOfLeaving: e.dateOfLeaving,
            stillWorking: Boolean(e.stillWorking),
            description: e.description || "",
          }));
          setExperiences(mapped);
        }
      } catch (err) {
        console.error("Failed to load experiences for selector:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sort experiences: stillWorking first, then dateOfJoining desc
  const sortedExperiences = useMemo(() => {
    return [...experiences].sort((a, b) => {
      if (a.stillWorking && !b.stillWorking) return -1;
      if (!a.stillWorking && b.stillWorking) return 1;
      const dateA = new Date(a.dateOfJoining || "").getTime() || 0;
      const dateB = new Date(b.dateOfJoining || "").getTime() || 0;
      return dateB - dateA;
    });
  }, [experiences]);

  // Auto-selection: top 2 latest experiences
  const autoSelectedIds = useMemo(() => {
    return sortedExperiences.slice(0, 2).map((e) => e.id);
  }, [sortedExperiences]);

  const activeSelectedIds = isManualMode ? selectedExperienceIds : autoSelectedIds;

  const toggleExperience = (id: string) => {
    setIsManualMode(true);
    if (selectedExperienceIds.includes(id)) {
      const next = selectedExperienceIds.filter((eId) => eId !== id);
      onExperiencesChange(next);
    } else {
      const next = [...selectedExperienceIds, id];
      onExperiencesChange(next);
    }
  };

  const handleResetToAuto = () => {
    setIsManualMode(false);
    onExperiencesChange([]);
  };

  const formatDuration = (joining?: string, leaving?: string, stillWorking?: boolean) => {
    const formatDate = (d?: string) => {
      if (!d) return "";
      const dt = new Date(d);
      if (isNaN(dt.getTime())) return d.split("T")[0];
      return dt.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };
    const start = formatDate(joining) || "Feb 2025";
    const end = stillWorking ? "Present" : formatDate(leaving) || "Present";
    return `${start} — ${end}`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          className={`block text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}
        >
          <History className="w-3.5 h-3.5 text-blue-500" />
          Work Experience Selection
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              isDark ? "bg-blue-900/60 text-blue-300" : "bg-blue-100 text-blue-700"
            }`}
          >
            {activeSelectedIds.length} Selected (Min 5 Points Each)
          </span>
        </label>

        {isManualMode ? (
          <button
            type="button"
            onClick={handleResetToAuto}
            className="text-[11px] font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Reset to 2 Latest
          </button>
        ) : (
          <span className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Auto (2 Latest Experiences)
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="p-3 text-center text-xs text-slate-500">Loading work experiences...</div>
      ) : sortedExperiences.length === 0 ? (
        <div className="p-3 text-center text-xs text-slate-500">No database experiences found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
          {sortedExperiences.map((exp) => {
            const isSelected = activeSelectedIds.includes(exp.id);
            return (
              <div
                key={exp.id}
                onClick={() => toggleExperience(exp.id)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                  isSelected
                    ? isDark
                      ? "bg-blue-950/40 border-blue-600/80 text-white shadow-sm"
                      : "bg-blue-50/80 border-blue-500/80 text-blue-950 shadow-sm"
                    : isDark
                      ? "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:border-slate-600"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs truncate">{exp.position}</span>
                    {exp.stillWorking && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 truncate">
                      <Building2 className="w-2.5 h-2.5" />
                      {exp.companyName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {formatDuration(exp.dateOfJoining, exp.dateOfLeaving, exp.stillWorking)}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white"
                      : isDark
                        ? "border-slate-600 bg-slate-900"
                        : "border-slate-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ExperienceSelector;
