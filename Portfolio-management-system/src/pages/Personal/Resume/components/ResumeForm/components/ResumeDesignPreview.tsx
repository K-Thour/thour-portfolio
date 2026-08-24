import { useState } from "react";
import {
  FileText,
  Sparkles,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  ZoomIn,
  ZoomOut,
  Layers,
} from "lucide-react";
import type { ResumeFormData } from "../../../types";

interface ResumeDesignPreviewProps {
  formData: ResumeFormData;
  isDark: boolean;
}

export function ResumeDesignPreview({
  formData,
  isDark,
}: ResumeDesignPreviewProps) {
  const [zoom, setZoom] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<"visual" | "latex">("visual");

  const templateType = formData.designType || "ats";
  const displayName = formData.name.trim() || formData.targetRole || "Full Stack Software Engineer";
  const targetRole = formData.targetRole || "Full Stack Software Engineer";
  const displaySummary =
    formData.description.trim() ||
    `Results-driven and innovative ${targetRole} with extensive experience in architecting scalable web applications, responsive user interfaces, and robust backend workflows. Highly proficient in modern JavaScript/TypeScript ecosystems, RESTful architecture, and cloud deployment pipelines.`;

  const sampleSkills = [
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
    "Redux Toolkit",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
    "RESTful APIs",
    "Docker",
    "Git",
  ];

  return (
    <div
      data-testid="resume-design-preview"
      className={`rounded-2xl border flex flex-col h-full overflow-hidden transition-all ${
        isDark
          ? "bg-slate-900/80 border-slate-700/80 shadow-xl"
          : "bg-slate-50/80 border-slate-200/80 shadow-md"
      }`}
    >
      {/* Top Preview Bar */}
      <div
        className={`px-4 py-3 border-b flex items-center justify-between shrink-0 ${
          isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span
            className={`text-xs font-semibold ml-2 flex items-center gap-1.5 ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            Live Preview (
            {templateType === "latex"
              ? "LaTeX Academic"
              : templateType === "modern"
                ? "Modern Professional"
                : "ATS Standard"}
            )
          </span>
        </div>

        <div className="flex items-center gap-2">
          {formData.designType === "latex" && formData.latexCode && (
            <div className="flex items-center bg-slate-800/40 rounded-lg p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => setActiveTab("visual")}
                className={`px-2 py-0.5 text-xs rounded font-medium transition-all ${
                  activeTab === "visual"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Visual
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("latex")}
                className={`px-2 py-0.5 text-xs rounded font-medium transition-all ${
                  activeTab === "latex"
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                LaTeX Code
              </button>
            </div>
          )}

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(80, z - 10))}
              disabled={zoom <= 80}
              className={`p-1 rounded transition-colors disabled:opacity-30 ${
                isDark ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-600"
              }`}
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-slate-400 min-w-8 text-center">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(120, z + 10))}
              disabled={zoom >= 120}
              className={`p-1 rounded transition-colors disabled:opacity-30 ${
                isDark ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-600"
              }`}
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 p-4 overflow-y-auto flex items-start justify-center">
        {activeTab === "latex" && formData.latexCode ? (
          <div className="w-full h-full bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
            {formData.latexCode}
          </div>
        ) : (
          <div
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
            className={`w-full max-w-md bg-white text-slate-900 rounded-lg shadow-xl p-6 border transition-all duration-300 ${
              templateType === "latex"
                ? "font-serif border-slate-300"
                : templateType === "ats"
                  ? "font-sans border-slate-300 bg-white"
                  : "font-sans border-slate-200"
            }`}
          >
            {/* Template Header */}
            <div
              className={`pb-3 mb-3 border-b ${
                templateType === "latex"
                  ? "border-slate-800 text-center"
                  : templateType === "ats"
                    ? "border-slate-900 text-center"
                    : "border-slate-200"
              }`}
            >
              {templateType === "modern" && (
                <div className="w-12 h-1.5 rounded-full bg-blue-600 mb-2" />
              )}
              <h1 className="text-xl font-bold tracking-tight text-slate-950">
                Karanveer Thour
              </h1>
              <p
                className={`text-xs font-bold uppercase tracking-wider mt-0.5 ${
                  templateType === "ats" ? "text-slate-900" : "text-blue-600"
                }`}
              >
                {displayName}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] text-slate-600 mt-1.5">
                <span>+91 8847009521</span>
                <span>|</span>
                <span>karanveerthour76@gmail.com</span>
                <span>|</span>
                <span>github.com/K-Thour</span>
                <span>|</span>
                <span>India</span>
              </div>
            </div>

            {/* Role & Projects Match Badge */}
            <div className="mb-3 px-2.5 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-[10px] text-blue-900 flex items-center justify-between">
              <div className="flex items-center gap-1.5 truncate">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">
                  Role: <strong className="font-semibold">{targetRole}</strong>
                </span>
              </div>
              <span className="font-bold text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded">
                98% ATS Scored
              </span>
            </div>

            {/* Summary Section */}
            <div className="mb-3">
              <h2
                className={`text-[10.5px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1 text-slate-900 ${
                  templateType === "latex" || templateType === "ats"
                    ? "border-b border-slate-400 pb-0.5"
                    : ""
                }`}
              >
                <FileText className="w-3 h-3 text-blue-600" />
                Professional Summary
              </h2>
              <p className="text-[10px] leading-relaxed text-slate-700 text-justify">
                {displaySummary}
              </p>
            </div>

            {/* Technical Skills Section */}
            <div className="mb-3">
              <h2
                className={`text-[10.5px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 text-slate-900 ${
                  templateType === "latex" || templateType === "ats"
                    ? "border-b border-slate-400 pb-0.5"
                    : ""
                }`}
              >
                <Code2 className="w-3 h-3 text-blue-600" />
                Technical Skills
              </h2>
              {templateType === "ats" ? (
                <div className="text-[10px] text-slate-800 space-y-0.5">
                  <p>
                    <strong>• Frontend:</strong> React.js, TypeScript, Next.js, Redux, Tailwind CSS, HTML5, CSS3
                  </p>
                  <p>
                    <strong>• Backend:</strong> Node.js, Express.js, MongoDB, PostgreSQL, RESTful APIs, WebSockets
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {sampleSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[9px] font-medium text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Work Experience Section */}
            <div className="mb-3">
              <h2
                className={`text-[10.5px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 text-slate-900 ${
                  templateType === "latex" || templateType === "ats"
                    ? "border-b border-slate-400 pb-0.5"
                    : ""
                }`}
              >
                <Briefcase className="w-3 h-3 text-blue-600" />
                Work Experience
              </h2>
              <div>
                <div className="flex justify-between items-baseline text-[10.5px]">
                  <span className="font-bold text-slate-900">Associate Full Stack Web Developer</span>
                  <span className="text-[9.5px] text-slate-600 font-mono">Feb 2025 – Present</span>
                </div>
                <p className="text-[9.5px] text-blue-700 font-medium">Devronins Private Limited (Remote)</p>
                <ul className="list-disc list-inside text-[9.5px] text-slate-700 mt-1 space-y-0.5 leading-normal">
                  <li>Architected and implemented responsive full-stack features using React.js and TypeScript.</li>
                  <li>Engineered real-time state pipelines increasing throughput by 40%.</li>
                </ul>
              </div>
            </div>

            {/* Key Projects */}
            <div className="mb-3">
              <h2
                className={`text-[10.5px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1 text-slate-900 ${
                  templateType === "latex" || templateType === "ats"
                    ? "border-b border-slate-400 pb-0.5"
                    : ""
                }`}
              >
                <Award className="w-3 h-3 text-blue-600" />
                Key Projects ({formData.selectedProjectIds?.length || 3} Tailored)
              </h2>
              <div className="text-[9.5px] text-slate-800 space-y-1 mt-1">
                <div>
                  <span className="font-bold">Portfolio & Content Management System</span> —{" "}
                  <span className="italic text-slate-600">TypeScript, React, Node.js, MongoDB</span>
                  <p className="text-slate-600">• Engineered comprehensive developer CMS with live resume generation and background queuing.</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2
                className={`text-[10.5px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1 text-slate-900 ${
                  templateType === "latex" || templateType === "ats"
                    ? "border-b border-slate-400 pb-0.5"
                    : ""
                }`}
              >
                <GraduationCap className="w-3 h-3 text-blue-600" />
                Education & Credentials
              </h2>
              <div className="flex justify-between text-[9.5px] text-slate-800">
                <span className="font-semibold">Bachelor of Computer Applications (BCA)</span>
                <span className="text-slate-600">IGNOU</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeDesignPreview;
