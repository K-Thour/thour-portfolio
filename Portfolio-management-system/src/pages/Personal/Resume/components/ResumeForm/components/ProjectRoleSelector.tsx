import { useEffect, useState, useMemo } from "react";
import {
  Briefcase,
  FolderGit2,
  Check,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { fetchProjects } from "../../../../../../services/api";

interface ProjectItem {
  id: string;
  title: string;
  role?: string;
  description: string;
  technologies: string[];
}

interface ProjectRoleSelectorProps {
  targetRole: string;
  jobDescription: string;
  selectedProjectIds: string[];
  isDark: boolean;
  onRoleChange: (role: string) => void;
  onProjectsChange: (projectIds: string[]) => void;
}

const ROLE_PRESETS = [
  { label: "Full Stack Engineer", tag: "Full Stack" },
  { label: "Frontend / React Developer", tag: "Frontend" },
  { label: "Backend & Cloud Engineer", tag: "Backend" },
  { label: "Mobile Application Developer", tag: "Mobile" },
  { label: "AI & Full Stack Specialist", tag: "AI / ML" },
];

export function ProjectRoleSelector({
  targetRole,
  jobDescription,
  selectedProjectIds,
  isDark,
  onRoleChange,
  onProjectsChange,
}: ProjectRoleSelectorProps) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isManualMode, setIsManualMode] = useState(
    selectedProjectIds.length > 0,
  );

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProjects();
        if (isMounted && Array.isArray(data)) {
          const mapped: ProjectItem[] = data.map((p: any) => ({
            id: p._id || p.id,
            title: p.title || "Untitled Project",
            role: p.role || "Full Stack Engineer",
            description: p.description || p.fullDescription || "",
            technologies: Array.isArray(p.techStack)
              ? p.techStack.map((t: any) =>
                  typeof t === "string" ? t : t.name || "",
                )
              : [],
          }));
          setProjects(mapped);
        }
      } catch (err) {
        console.error("Failed to load projects for role selector:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute match score for each project based on targetRole + jobDescription
  const scoredProjects = useMemo(() => {
    const roleLower = (targetRole || "").toLowerCase();
    const descLower = (jobDescription || "").toLowerCase();

    return projects
      .map((p) => {
        let score = 50; // base score
        const titleLower = p.title.toLowerCase();
        const techLower = p.technologies.map((t) => t.toLowerCase());

        if (
          roleLower.includes("front") ||
          roleLower.includes("react") ||
          roleLower.includes("ui")
        ) {
          if (
            techLower.some((t) =>
              ["react", "next", "type", "tail", "redux", "css", "vue"].some(
                (k) => t.includes(k),
              ),
            )
          ) {
            score += 30;
          }
          if (
            titleLower.includes("portfolio") ||
            titleLower.includes("front") ||
            titleLower.includes("ui")
          ) {
            score += 15;
          }
        } else if (
          roleLower.includes("back") ||
          roleLower.includes("node") ||
          roleLower.includes("cloud")
        ) {
          if (
            techLower.some((t) =>
              [
                "node",
                "express",
                "mongo",
                "postgre",
                "docker",
                "redis",
                "api",
              ].some((k) => t.includes(k)),
            )
          ) {
            score += 30;
          }
          if (
            titleLower.includes("backend") ||
            titleLower.includes("api") ||
            titleLower.includes("management")
          ) {
            score += 15;
          }
        } else if (roleLower.includes("mobile")) {
          if (
            techLower.some((t) =>
              ["native", "flutter", "mobile", "ios", "android"].some((k) =>
                t.includes(k),
              ),
            )
          ) {
            score += 35;
          }
        } else if (roleLower.includes("ai") || roleLower.includes("ml")) {
          if (
            techLower.some((t) =>
              ["python", "ai", "gemini", "llm", "openai", "ml"].some((k) =>
                t.includes(k),
              ),
            )
          ) {
            score += 40;
          }
        } else {
          // Full stack default
          if (techLower.length >= 3) score += 20;
        }

        // Keyword match with job description
        const keywords = descLower
          .split(/[\s,.-]+/)
          .filter((w) => w.length > 3);
        for (const kw of keywords.slice(0, 20)) {
          if (titleLower.includes(kw)) score += 5;
          if (techLower.some((t) => t.includes(kw))) score += 5;
        }

        return {
          ...p,
          matchScore: Math.min(score, 99),
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [projects, targetRole, jobDescription]);

  // Auto-selection: top 3 scored projects
  const autoSelectedIds = useMemo(() => {
    return scoredProjects.slice(0, 3).map((p) => p.id);
  }, [scoredProjects]);

  const activeSelectedIds = isManualMode ? selectedProjectIds : autoSelectedIds;

  const toggleProject = (id: string) => {
    setIsManualMode(true);
    if (selectedProjectIds.includes(id)) {
      const next = selectedProjectIds.filter((pId) => pId !== id);
      onProjectsChange(next);
    } else {
      const next = [...selectedProjectIds, id];
      onProjectsChange(next);
    }
  };

  const handleResetToAuto = () => {
    setIsManualMode(false);
    onProjectsChange([]);
  };

  return (
    <div className="space-y-4">
      {/* Target Role Selector */}
      <div className="space-y-2">
        <label
          className={`block text-xs font-semibold uppercase tracking-wider flex items-center justify-between ${
            isDark ? "text-slate-300" : "text-slate-700"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-blue-500" />
            Target Role & Specialization
          </span>
          <span className="text-[11px] text-blue-500 font-normal lowercase">
            influences project & skill ranking
          </span>
        </label>

        {/* Role Presets */}
        <div className="flex flex-wrap gap-1.5">
          {ROLE_PRESETS.map((preset) => {
            const isSelected = targetRole === preset.label;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => onRoleChange(preset.label)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  isSelected
                    ? "bg-blue-600 border-blue-600 text-white font-medium shadow-sm"
                    : isDark
                      ? "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800"
                      : "bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Custom Role Input */}
        <input
          type="text"
          value={targetRole}
          onChange={(e) => onRoleChange(e.target.value)}
          placeholder="Or type specific target role (e.g. Lead Frontend Architect)"
          className={`w-full px-3 py-2 text-xs rounded-xl border transition-all ${
            isDark
              ? "bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-blue-500"
              : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500"
          }`}
        />
      </div>

      {/* Project Selector Section */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <label
            className={`block text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5 text-blue-500" />
            Projects for this Resume
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                isDark
                  ? "bg-blue-900/60 text-blue-300"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {activeSelectedIds.length} Selected
            </span>
          </label>

          {isManualMode ? (
            <button
              type="button"
              onClick={handleResetToAuto}
              className="text-[11px] font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Reset to AI Auto-Match
            </button>
          ) : (
            <span className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI Role Auto-Matched
            </span>
          )}
        </div>

        {isLoading ? (
          <div className="p-3 text-center text-xs text-slate-500">
            Loading portfolio projects...
          </div>
        ) : scoredProjects.length === 0 ? (
          <div className="p-3 text-center text-xs text-slate-500">
            No database projects found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
            {scoredProjects.map((p) => {
              const isSelected = activeSelectedIds.includes(p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => toggleProject(p.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-2.5 ${
                    isSelected
                      ? isDark
                        ? "bg-blue-950/40 border-blue-500/70 shadow-sm"
                        : "bg-blue-50/80 border-blue-400 shadow-sm"
                      : isDark
                        ? "bg-slate-900/50 border-slate-800 hover:border-slate-700 opacity-70"
                        : "bg-white border-slate-200 hover:border-slate-300 opacity-75"
                  }`}
                >
                  <div className="flex items-start gap-2 min-w-0">
                    <div
                      className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center border transition-all shrink-0 ${
                        isSelected
                          ? "bg-blue-600 border-blue-600 text-white"
                          : isDark
                            ? "border-slate-700 bg-slate-800"
                            : "border-slate-300 bg-slate-50"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h5
                          className={`text-xs font-bold truncate ${
                            isSelected
                              ? isDark
                                ? "text-blue-300"
                                : "text-blue-950"
                              : isDark
                                ? "text-slate-300"
                                : "text-slate-800"
                          }`}
                        >
                          {p.title}
                        </h5>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-medium ${
                            p.matchScore >= 80
                              ? isDark
                                ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800/60"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : isDark
                                ? "bg-slate-800 text-slate-400"
                                : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {p.matchScore}% Match
                        </span>
                      </div>
                      <p
                        className={`text-[11px] truncate mt-0.5 ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {p.description}
                      </p>
                      {p.technologies.length > 0 && (
                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          {p.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                                isDark
                                  ? "bg-slate-800 text-slate-400"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectRoleSelector;
