import React, { useRef } from "react";
import { Upload, FileCode, CheckCircle2, RotateCcw, Copy, Check } from "lucide-react";
import { useState } from "react";

interface LatexUploadEditorProps {
  latexCode: string;
  isDark: boolean;
  onChange: (code: string) => void;
}

const DEFAULT_LATEX_TEMPLATE = `\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape Karan Thour} \\\\ \\vspace{1pt}
    \\small +1 (555) 019-2834 $|$ \\href{mailto:karan@example.com}{\\underline{karan@example.com}} $|$ 
    \\href{https://linkedin.com/in/karan-thour}{\\underline{linkedin.com/in/karan-thour}} $|$
    \\href{https://github.com/K-Thour}{\\underline{github.com/K-Thour}}
\\end{center}

\\section{Summary}
Senior Full Stack Engineer specializing in scalable cloud applications, high-performance web systems, and AI integrations.

\\section{Experience}
\\textbf{Lead Full Stack Engineer} \\hfill 2023 -- Present \\\\
\\textit{Thour Technologies} \\hfill \\textit{Full-Time}
\\begin{itemize}[noitemsep,topsep=0pt]
    \\item Architected and deployed microservices handling 100k+ daily API requests with 99.99\\% uptime.
    \\item Implemented AI resume optimization pipelines utilizing LLMs and modern React/TypeScript stack.
\\end{itemize}

\\section{Education}
\\textbf{B.Tech in Computer Science} \\hfill \\textit{First Class Distinction}

\\section{Languages}
\\textbf{Languages:} Punjabi (Mother tongue) $|$ Hindi (Conversationally fluent) $|$ English (Business knowledge)

\\section{Technical Skills}
\\textbf{Languages/Frameworks:} TypeScript, React, Next.js, Node.js, Express, Python, TailwindCSS \\\\
\\textbf{Developer Tools & Cloud:} Git, Docker, Kubernetes, AWS, MongoDB, PostgreSQL, CI/CD Pipelines

\\end{document}`;

export function LatexUploadEditor({
  latexCode,
  isDark,
  onChange,
}: LatexUploadEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const lineCount = latexCode ? latexCode.split("\n").length : 0;
  const byteSize = new Blob([latexCode || ""]).size;

  const handleFileUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        onChange(text);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleCopy = () => {
    if (!latexCode) return;
    navigator.clipboard.writeText(latexCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetToDefault = () => {
    onChange(DEFAULT_LATEX_TEMPLATE);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="latex-source-textarea"
          className={`block text-xs font-semibold flex items-center gap-1.5 ${
            isDark ? "text-slate-200" : "text-slate-700"
          }`}
        >
          <FileCode className="w-4 h-4 text-blue-500" />
          LaTeX Template Source Code (.tex)
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!latexCode}
            className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 transition-all disabled:opacity-40 ${
              isDark
                ? "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Copy
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleResetToDefault}
            className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 transition-all ${
              isDark
                ? "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <RotateCcw className="w-3 h-3" /> Reset Template
          </button>
        </div>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-3 rounded-xl border border-dashed transition-all cursor-pointer flex items-center justify-between gap-4 ${
          dragOver
            ? isDark
              ? "border-blue-400 bg-blue-950/40"
              : "border-blue-500 bg-blue-50"
            : isDark
              ? "border-slate-700 bg-slate-900/40 hover:bg-slate-800/40 hover:border-slate-600"
              : "border-slate-300 bg-slate-50/70 hover:bg-slate-100 hover:border-blue-400"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".tex,.txt"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
          }}
        />
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              isDark ? "bg-blue-950/60 text-blue-400" : "bg-blue-100 text-blue-600"
            }`}
          >
            <Upload className="w-4 h-4" />
          </div>
          <div>
            <p
              className={`text-xs font-semibold ${
                isDark ? "text-slate-200" : "text-slate-800"
              }`}
            >
              Upload .tex or .txt file
            </p>
            <p
              className={`text-[11px] ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Drag and drop your custom LaTeX resume template
            </p>
          </div>
        </div>

        {lineCount > 0 && (
          <div className="text-right">
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                isDark
                  ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              {lineCount} lines ({(byteSize / 1024).toFixed(1)} KB)
            </span>
          </div>
        )}
      </div>

      {/* Direct In-App Code Editor */}
      <div className="relative rounded-xl overflow-hidden border border-slate-700/80">
        <textarea
          id="latex-source-textarea"
          value={latexCode || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste or write your LaTeX code here..."
          rows={8}
          className={`w-full p-3 font-mono text-xs leading-relaxed focus:outline-none transition-colors ${
            isDark
              ? "bg-slate-950 text-emerald-400 placeholder-slate-600 focus:bg-black"
              : "bg-slate-900 text-emerald-300 placeholder-slate-500 focus:bg-slate-950"
          }`}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
