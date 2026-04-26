interface Props {
  label: React.ReactNode;
  type?: string;
  value: string;
  error?: string;
  isDark: boolean;
  placeholder?: string;
  rows?: number;
  onChange: (value: string) => void;
}

export function FormInput({
  label,
  type = "text",
  value,
  error,
  isDark,
  placeholder,
  rows,
  onChange,
}: Props) {
  const baseClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
    isDark
      ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
      : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
  } ${error ? "border-red-500" : ""}`;

  return (
    <div>
      <label
        className={`block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}
      >
        {label}
      </label>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={`${baseClass} resize-none`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          placeholder={placeholder}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
