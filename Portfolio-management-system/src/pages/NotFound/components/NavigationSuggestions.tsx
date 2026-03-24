import { motion } from "motion/react";
import { Search } from "lucide-react";

interface NavigationSuggestionsProps {
  isDark: boolean;
  onNavigate: (path: string) => void;
}

export const NavigationSuggestions: React.FC<NavigationSuggestionsProps> = ({
  isDark,
  onNavigate,
}) => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className={`mt-16 p-6 rounded-2xl border ${
        isDark
          ? "bg-slate-800/50 border-red-500/20 backdrop-blur-xl"
          : "bg-white/80 border-blue-300/40 backdrop-blur-xl shadow-lg shadow-blue-500/10"
      }`}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Search
          className={`w-5 h-5 ${isDark ? "text-red-500" : "text-blue-600"}`}
        />
        <h3
          className={`text-lg font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {isDark ? "Quick Access" : "Sacred Passages"}
        </h3>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => onNavigate(link.path)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
              isDark
                ? "bg-slate-700/50 text-gray-300 hover:bg-slate-700"
                : "bg-blue-50 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
