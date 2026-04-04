interface NameInputProps {
  isDark: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function NameInput({ isDark, value, onChange }: NameInputProps) {
  return (
    <div>
      <label
        className={`block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        Collection Name *
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter portfolio name"
        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-hidden focus:ring-2 transition-all ${
          isDark
            ? "bg-slate-900/50 border-slate-700 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20"
            : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
        }`}
      />
    </div>
  );
}
