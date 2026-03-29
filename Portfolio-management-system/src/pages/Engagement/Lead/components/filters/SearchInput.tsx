import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  isDark: boolean;
  onChange: (value: string) => void;
}

export function SearchInput({ value, isDark, onChange }: SearchInputProps) {
  return (
    <div className="flex-1 relative">
      <Search
        className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
          isDark ? "text-gray-500" : "text-gray-400"
        }`}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search leads..."
        className={`w-full pl-12 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
          isDark
            ? "bg-slate-800/50 border-red-500/20 text-white focus:ring-red-500 placeholder:text-gray-500"
            : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 placeholder:text-gray-400"
        }`}
      />
    </div>
  );
}
