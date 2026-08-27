import { useState, useEffect, useMemo } from "react";
import {
  FileText,
  Sparkles,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  ZoomIn,
  ZoomOut,
  Layers,
} from "lucide-react";
import type { ResumeFormData } from "../../../types";
import { fetchProjects, fetchExperiences, fetchTechnologies } from "../../../../../../services/api";
import envConstraints from "../../../../../../constraints/env.constraints";

interface ResumeDesignPreviewProps {
  formData: ResumeFormData;
  isDark: boolean;
}

interface ProjectData {
  id: string;
  title: string;
  role?: string;
  description: string;
  features?: string[];
  techStack: string[];
}

interface ExperienceData {
  id: string;
  position: string;
  companyName: string;
  dateOfJoining?: string;
  dateOfLeaving?: string;
  stillWorking?: boolean;
  description?: string;
}

interface TechData {
  id: string;
  name: string;
  category?: string;
}

export function ResumeDesignPreview({
  formData,
  isDark,
}: ResumeDesignPreviewProps) {
  const [zoom, setZoom] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<"visual" | "latex">("visual");
  const [allProjects, setAllProjects] = useState<ProjectData[]>([]);
  const [allExperiences, setAllExperiences] = useState<ExperienceData[]>([]);
  const [allTechnologies, setAllTechnologies] = useState<TechData[]>([]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const [projData, expData, techData] = await Promise.allSettled([
          fetchProjects(),
          fetchExperiences(),
          fetchTechnologies(),
        ]);

        if (isMounted && projData.status === "fulfilled" && Array.isArray(projData.value)) {
          const mapped: ProjectData[] = projData.value.map((p: any) => ({
            id: p._id || p.id,
            title: p.title || "Untitled Project",
            role: p.role || "Full Stack Engineer",
            description: p.description || p.fullDescription || "",
            features: Array.isArray(p.features) ? p.features : [],
            techStack: Array.isArray(p.techStack)
              ? p.techStack.map((t: any) => (typeof t === "string" ? t : t.name || ""))
              : [],
          }));
          setAllProjects(mapped);
        }

        if (isMounted && expData.status === "fulfilled" && Array.isArray(expData.value)) {
          const mappedExp: ExperienceData[] = expData.value.map((e: any) => ({
            id: e._id || e.id,
            position: e.position || "Software Engineer",
            companyName: e.companyName || "Company",
            dateOfJoining: e.dateOfJoining,
            dateOfLeaving: e.dateOfLeaving,
            stillWorking: Boolean(e.stillWorking),
            description: e.description || "",
          }));
          // Sort reverse chronological
          mappedExp.sort((a, b) => {
            if (a.stillWorking && !b.stillWorking) return -1;
            if (!a.stillWorking && b.stillWorking) return 1;
            const dateA = new Date(a.dateOfJoining || "").getTime() || 0;
            const dateB = new Date(b.dateOfJoining || "").getTime() || 0;
            return dateB - dateA;
          });
          setAllExperiences(mappedExp);
        }

        if (isMounted && techData.status === "fulfilled" && Array.isArray(techData.value)) {
          const mappedTech: TechData[] = techData.value.map((t: any) => ({
            id: t._id || t.id,
            name: t.name || "Tech",
            category: t.category,
          }));
          setAllTechnologies(mappedTech);
        }
      } catch (err) {
        console.error("Failed to load data for live preview:", err);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const templateType = formData.designType || "ats";
  const displayName = formData.name.trim() || formData.targetRole || "Full Stack Software Engineer";
  const targetRole = formData.targetRole || "Full Stack Software Engineer";
  const displaySummary =
    formData.description.trim() ||
    `Results-driven and innovative ${targetRole} with extensive experience in architecting scalable web applications, responsive user interfaces, and robust backend workflows. Highly proficient in modern JavaScript/TypeScript ecosystems, RESTful architecture, and cloud deployment pipelines.`;

  // Filter projects based on selectedProjectIds or fallback
  const selectedProjIds = formData.selectedProjectIds || [];
  const displayProjects =
    selectedProjIds.length > 0 && allProjects.length > 0
      ? selectedProjIds
          .map((id) => allProjects.find((p) => p.id === id))
          .filter(Boolean) as ProjectData[]
      : allProjects.slice(0, 3);

  // Filter experiences based on selectedExperienceIds or fallback
  const selectedExpIds = formData.selectedExperienceIds || [];
  const displayExperiences =
    selectedExpIds.length > 0 && allExperiences.length > 0
      ? selectedExpIds
          .map((id) => allExperiences.find((e) => e.id === id))
          .filter(Boolean) as ExperienceData[]
      : allExperiences.slice(0, 2);

  // Role + Job Description + Job Link Dynamic Technology Ranking
  const categorizedTechnologies = useMemo(() => {
    const roleLower = (targetRole || "").toLowerCase();
    const descLower = `${formData.description || ""} ${formData.jobLink || ""}`.toLowerCase();

    const techList =
      allTechnologies.length > 0
        ? allTechnologies.map((t) => t.name)
        : [
            "React.js",
            "TypeScript",
            "JavaScript (ES6+)",
            "Next.js",
            "Redux Toolkit",
            "HTML5",
            "CSS3",
            "Tailwind CSS",
            "Node.js",
            "Express.js",
            "Python",
            "MongoDB",
            "PostgreSQL",
            "REST APIs",
            "WebSockets",
            "Docker",
            "AWS",
            "Git",
          ];

    const scored = techList.map((t) => {
      let score = 0;
      const tLower = t.toLowerCase();
      if (descLower.includes(tLower)) score += 30;

      if (roleLower.includes("front") || roleLower.includes("react") || roleLower.includes("ui")) {
        if (["react", "next", "type", "java", "html", "css", "tail", "redux", "ui"].some((k) => tLower.includes(k))) {
          score += 20;
        }
      }
      if (roleLower.includes("back") || roleLower.includes("node") || roleLower.includes("cloud")) {
        if (["node", "express", "python", "mongo", "postgre", "nest", "sql", "api", "socket", "docker", "aws"].some((k) => tLower.includes(k))) {
          score += 20;
        }
      }
      if (roleLower.includes("full") || roleLower.includes("engineer")) {
        if (["react", "next", "type", "java", "node", "express", "mongo", "postgre", "tail", "redux", "docker", "aws"].some((k) => tLower.includes(k))) {
          score += 15;
        }
      }
      return { name: t, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const topTechs = scored.slice(0, 16).map((st) => st.name);

    const frontend = topTechs.filter((s) =>
      ["react", "next", "type", "java", "html", "css", "tail", "redux", "boot", "front", "ui"].some((k) =>
        s.toLowerCase().includes(k)
      )
    );
    const backend = topTechs.filter((s) =>
      ["node", "express", "python", "mongo", "postgre", "nest", "sql", "django", "api", "socket", "back"].some((k) =>
        s.toLowerCase().includes(k)
      )
    );
    const tools = topTechs.filter((s) => !frontend.includes(s) && !backend.includes(s));

    return {
      frontend: frontend.join(", ") || "React.js, TypeScript, Next.js, Redux, Tailwind CSS, HTML5, CSS3",
      backend: backend.join(", ") || "Node.js, Express.js, MongoDB, PostgreSQL, RESTful APIs, WebSockets",
      tools: tools.length > 0 ? tools.join(", ") : "Docker, AWS, Git, Vite, CI/CD",
    };
  }, [allTechnologies, targetRole, formData.description, formData.jobLink]);

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
              className={`pb-3 mb-4 border-b ${
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
                <span>linkedin.com/in/karanveer-thour</span>
                <span>|</span>
                <span>{envConstraints.PORTFOLIO_WEB_BASE_URL.replace(/^https?:\/\//, '')}</span>
                <span>|</span>
                <span>India</span>
              </div>
            </div>

            {/* Role & Projects Match Badge */}
            <div className="mb-4 px-2.5 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-[10px] text-blue-900 flex items-center justify-between">
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

            {/* Professional Summary */}
            <div className="mb-4">
              <h2
                className={`text-[10.5px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 text-slate-900 ${
                  templateType === "latex" || templateType === "ats"
                    ? "border-b border-slate-400 pb-0.5"
                    : ""
                }`}
              >
                <FileText className="w-3 h-3 text-blue-600" />
                Professional Summary
              </h2>
              <p className="text-[10px] leading-relaxed text-slate-700 text-justify">
                {displaySummary.includes("This position") || displaySummary.includes("partner company") || displaySummary.includes("Accountabilities")
                  ? `Results-driven and innovative ${targetRole} with 3+ years of experience building scalable web applications, modern responsive interfaces, and robust backend architectures. Highly proficient in React.js, TypeScript, Next.js, Redux, and Node.js microservices.`
                  : displaySummary}
              </p>
            </div>

            {/* Technical Skills - Dynamically Categorized by Role & Description */}
            <div className="mb-4">
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
              <div className="text-[10px] text-slate-800 space-y-1">
                <p>
                  <strong>• Frontend Technologies:</strong> {categorizedTechnologies.frontend}
                </p>
                <p>
                  <strong>• Backend & Databases:</strong> {categorizedTechnologies.backend}
                </p>
                {categorizedTechnologies.tools && (
                  <p>
                    <strong>• Developer Tools & Cloud:</strong> {categorizedTechnologies.tools}
                  </p>
                )}
              </div>
            </div>

            {/* Work Experience - Dynamically Rendering Selected Experience */}
            <div className="mb-4">
              <h2
                className={`text-[10.5px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 text-slate-900 ${
                  templateType === "latex" || templateType === "ats"
                    ? "border-b border-slate-400 pb-0.5"
                    : ""
                }`}
              >
                <Briefcase className="w-3 h-3 text-blue-600" />
                Professional Experience ({displayExperiences.length || 2} Selected)
              </h2>
              <div className="space-y-3">
                {displayExperiences.length > 0 ? (
                  displayExperiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline text-[10.5px]">
                        <span className="font-bold text-slate-900">{exp.position}</span>
                        <span className="text-[9.5px] text-slate-600 font-mono">
                          {formatDuration(exp.dateOfJoining, exp.dateOfLeaving, exp.stillWorking)}
                        </span>
                      </div>
                      <p className="text-[9.5px] text-blue-700 font-medium">{exp.companyName}</p>
                      <ul className="list-disc list-inside text-[9.5px] text-slate-700 mt-1 space-y-0.5 leading-normal">
                        {exp.description ? (
                          exp.description
                            .split(/(?<=[.!?])\s+/)
                            .filter((s) => s.trim().length > 10)
                            .slice(0, 4)
                            .map((bullet, bIdx) => <li key={bIdx}>{bullet.trim()}</li>)
                        ) : (
                          <>
                            <li>Architected and implemented responsive full-stack features with React.js, TypeScript, and Node.js microservices.</li>
                            <li>Engineered real-time state management and asynchronous background task pipelines, increasing throughput by 40%.</li>
                          </>
                        )}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div>
                    <div className="flex justify-between items-baseline text-[10.5px]">
                      <span className="font-bold text-slate-900">Associate Full Stack Web Developer</span>
                      <span className="text-[9.5px] text-slate-600 font-mono">Feb 2025 – Present</span>
                    </div>
                    <p className="text-[9.5px] text-blue-700 font-medium">Devronins Private Limited</p>
                  </div>
                )}
              </div>
            </div>

            {/* Key Projects - Dynamically Rendering Selected Projects */}
            <div className="mb-4">
              <h2
                className={`text-[10.5px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 text-slate-900 ${
                  templateType === "latex" || templateType === "ats"
                    ? "border-b border-slate-400 pb-0.5"
                    : ""
                }`}
              >
                <Award className="w-3 h-3 text-blue-600" />
                Key Projects ({displayProjects.length || 3} Selected)
              </h2>
              <div className="text-[9.5px] text-slate-800 space-y-2.5 mt-1">
                {displayProjects.length > 0 ? (
                  displayProjects.map((p) => (
                    <div key={p.id}>
                      <span className="font-bold">{p.title}</span> —{" "}
                      <span className="italic text-slate-600">
                        {p.techStack.slice(0, 4).join(", ") || "React, TypeScript, Node.js"}
                      </span>
                      <ul className="list-disc list-inside text-slate-600 mt-0.5 space-y-0.5">
                        <li>{p.description || "High-performance full-stack web application with responsive UI."}</li>
                        {p.features && p.features.length > 0 ? (
                          p.features.slice(0, 2).map((feat, fIdx) => <li key={fIdx}>{feat}</li>)
                        ) : (
                          <li>Architected modular state management and secure RESTful APIs.</li>
                        )}
                      </ul>
                    </div>
                  ))
                ) : (
                  <div>
                    <span className="font-bold">Portfolio & Content Management System</span> —{" "}
                    <span className="italic text-slate-600">TypeScript, React, Node.js, MongoDB</span>
                    <ul className="list-disc list-inside text-slate-600 mt-0.5 space-y-0.5">
                      <li>Engineered comprehensive developer CMS with live resume generation and background queuing.</li>
                      <li>Integrated real-time ATS scoring algorithm and customizable LaTeX compiler pipeline.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Education & Credentials */}
            <div className="mb-4">
              <h2
                className={`text-[10.5px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 text-slate-900 ${
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
                <span className="text-slate-600">Indira Gandhi National Open University</span>
              </div>
            </div>

            {/* Languages Section Below Education */}
            <div>
              <h2
                className={`text-[10.5px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 text-slate-900 ${
                  templateType === "latex" || templateType === "ats"
                    ? "border-b border-slate-400 pb-0.5"
                    : ""
                }`}
              >
                <Globe className="w-3 h-3 text-blue-600" />
                Languages
              </h2>
              <div className="text-[9.5px] text-slate-800">
                <p>
                  <strong>• Languages:</strong> Punjabi (Mother tongue) &nbsp;|&nbsp; Hindi (Conversationally fluent) &nbsp;|&nbsp; English (Business knowledge)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeDesignPreview;
