import React, { useMemo } from "react";
import {
  Link2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Briefcase,
} from "lucide-react";

interface JobLinkInputProps {
  value: string;
  error?: string;
  isDark: boolean;
  onChange: (value: string) => void;
}

export function JobLinkInput({
  value,
  error,
  isDark,
  onChange,
}: JobLinkInputProps) {
  const isValidUrl = useMemo(() => {
    if (!value.trim()) return false;
    return /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value.trim());
  }, [value]);

  const platformInfo = useMemo(() => {
    if (!isValidUrl) return null;
    const lower = value.toLowerCase();

    if (lower.includes("linkedin.com")) {
      return {
        name: "LinkedIn Job",
        color: isDark
          ? "bg-blue-950/80 border-blue-500/40 text-blue-300"
          : "bg-blue-50 border-blue-200 text-blue-700",
      };
    }
    if (lower.includes("indeed.com")) {
      return {
        name: "Indeed Job",
        color: isDark
          ? "bg-indigo-950/80 border-indigo-500/40 text-indigo-300"
          : "bg-indigo-50 border-indigo-200 text-indigo-700",
      };
    }
    if (lower.includes("greenhouse.io")) {
      return {
        name: "Greenhouse Portal",
        color: isDark
          ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
          : "bg-emerald-50 border-emerald-200 text-emerald-700",
      };
    }
    if (lower.includes("lever.co")) {
      return {
        name: "Lever Portal",
        color: isDark
          ? "bg-violet-950/80 border-violet-500/40 text-violet-300"
          : "bg-violet-50 border-violet-200 text-violet-700",
      };
    }
    if (lower.includes("workday") || lower.includes("myworkdayjobs.com")) {
      return {
        name: "Workday Portal",
        color: isDark
          ? "bg-amber-950/80 border-amber-500/40 text-amber-300"
          : "bg-amber-50 border-amber-200 text-amber-700",
      };
    }
    if (lower.includes("wellfound.com") || lower.includes("angel.co")) {
      return {
        name: "Wellfound Startup",
        color: isDark
          ? "bg-rose-950/80 border-rose-500/40 text-rose-300"
          : "bg-rose-50 border-rose-200 text-rose-700",
      };
    }

    try {
      const url = new URL(value);
      return {
        name: url.hostname.replace("www.", ""),
        color: isDark
          ? "bg-slate-800/90 border-slate-700 text-slate-300"
          : "bg-slate-100 border-slate-200 text-slate-700",
      };
    } catch {
      return null;
    }
  }, [value, isValidUrl, isDark]);

  const handleOpenLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isValidUrl) {
      window.open(value, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="job-link-input"
          className={`block text-sm font-semibold flex items-center gap-1.5 ${
            isDark ? "text-slate-200" : "text-slate-700"
          }`}
        >
          <Briefcase className="w-4 h-4 text-blue-500" />
          Target Job Posting Link (Optional)
        </label>
        {platformInfo && (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${platformInfo.color}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {platformInfo.name}
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none text-slate-400">
          <Link2 className="w-4 h-4" />
        </div>
        <input
          id="job-link-input"
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://www.linkedin.com/jobs/view/..."
          className={`w-full pl-10 pr-24 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
            error
              ? isDark
                ? "border-red-500 bg-red-950/20 text-red-200 focus:ring-red-500/40"
                : "border-red-400 bg-red-50 text-red-900 focus:ring-red-300"
              : isDark
                ? "border-slate-700 bg-slate-900/60 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                : "border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/20 shadow-xs"
          }`}
        />
        {isValidUrl && (
          <button
            type="button"
            onClick={handleOpenLink}
            title="Open job link in new tab to verify"
            className={`absolute right-2 px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer transition-all ${
              isDark
                ? "bg-slate-800 text-blue-400 hover:bg-slate-700 hover:text-blue-300 border border-slate-700"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
            }`}
          >
            Test <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>

      {error ? (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      ) : (
        <p
          className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
        >
          Paste the job URL. The AI will extract requirements to tailor your
          resume.
        </p>
      )}
    </div>
  );
}
