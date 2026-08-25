import { FileCode, Layout, FileCheck, Code, Check } from "lucide-react";
import type { ResumeDesignType } from "../../../types";

interface TemplateSelectorProps {
  selectedType: ResumeDesignType;
  isDark: boolean;
  onSelectType: (type: ResumeDesignType) => void;
  onOpenCustomModal?: () => void;
}

export function TemplateSelector({
  selectedType,
  isDark,
  onSelectType,
  onOpenCustomModal,
}: TemplateSelectorProps) {
  const templates: {
    id: ResumeDesignType;
    title: string;
    description: string;
    icon: typeof Layout;
    badge: string;
  }[] = [
    {
      id: "ats",
      title: "ATS Standard / Minimalist",
      description: "Clean single-column layout engineered for maximum ATS parser scores.",
      icon: FileCheck,
      badge: "Highest ATS Score",
    },
    {
      id: "modern",
      title: "Modern Professional",
      description: "Balanced typography and clean section accents for human & ATS screening.",
      icon: Layout,
      badge: "Professional",
    },
    {
      id: "latex",
      title: "LaTeX Academic / Tech",
      description: "Computer Modern formal serif structure with Overleaf LaTeX syntax support.",
      icon: FileCode,
      badge: "Overleaf / Tech",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          className={`block text-sm font-semibold flex items-center gap-1.5 ${
            isDark ? "text-slate-200" : "text-slate-700"
          }`}
        >
          <Layout className="w-4 h-4 text-blue-500" />
          Choose Resume Template Style
        </label>
        {selectedType === "latex" && onOpenCustomModal && (
          <button
            type="button"
            onClick={onOpenCustomModal}
            className={`text-xs font-semibold flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
              isDark
                ? "bg-slate-800 border-slate-700 text-blue-400 hover:bg-slate-700"
                : "bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Edit LaTeX Code
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {templates.map((template) => {
          const isSelected = selectedType === template.id;
          const Icon = template.icon;

          return (
            <button
              key={template.title}
              type="button"
              onClick={() => onSelectType(template.id)}
              className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? isDark
                    ? "bg-blue-950/40 border-blue-500 shadow-md shadow-blue-500/20 ring-1 ring-blue-500"
                    : "bg-blue-50/80 border-blue-500 shadow-md shadow-blue-500/10 ring-1 ring-blue-500"
                  : isDark
                    ? "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40"
                    : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/60"
              }`}
            >
              <div className="flex items-start justify-between w-full mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : isDark
                          ? "bg-slate-800 text-slate-400"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4
                      className={`text-xs font-bold ${
                        isSelected
                          ? isDark
                            ? "text-blue-300"
                            : "text-blue-950"
                          : isDark
                            ? "text-slate-200"
                            : "text-slate-800"
                      }`}
                    >
                      {template.title}
                    </h4>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : isDark
                        ? "bg-slate-800 text-slate-400"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {template.badge}
                </span>
              </div>

              <p
                className={`text-[11px] leading-relaxed line-clamp-2 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {template.description}
              </p>

              {isSelected && (
                <div className="absolute top-2 right-2 hidden">
                  <Check className="w-4 h-4 text-blue-500" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
