interface Props {
  value: string | undefined;
  error?: string;
  isDark: boolean;
  onChange: (value: string) => void;
}

export function LatexInput({ value, error, isDark, onChange }: Props) {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 resize-none font-mono text-sm ${
          isDark
            ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
            : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
        } ${error ? "border-red-500" : ""}`}
        placeholder={`\\documentclass{article}\n\\begin{document}\n\\section{Resume}\nYour LaTeX code here...\n\\end{document}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
