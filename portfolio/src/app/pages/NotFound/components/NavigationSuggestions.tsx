import { motion } from 'motion/react';
import { Search } from 'lucide-react';

interface NavigationSuggestionsProps {
  isDark: boolean;
  onNavigate: (path: string) => void;
}

export function NavigationSuggestions({
  isDark,
  onNavigate,
}: NavigationSuggestionsProps) {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className={`mt-12 p-6 rounded-2xl border w-full ${
        isDark
          ? 'bg-slate-900/60 border-red-500/10 backdrop-blur-xl'
          : 'bg-white/70 border-blue-300/30 backdrop-blur-xl shadow-lg shadow-blue-500/5'
      }`}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Search
          className={`w-4 h-4 ${isDark ? 'text-red-500' : 'text-blue-600'}`}
        />
        <h3
          className={`text-sm font-bold tracking-wide uppercase ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
        >
          {isDark ? 'Quick Access' : 'Sacred Passages'}
        </h3>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => onNavigate(link.path)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer ${
              isDark
                ? 'bg-slate-800/40 text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent hover:border-red-500/20'
                : 'bg-blue-50/60 text-slate-700 hover:bg-blue-100/80 hover:text-blue-900 border border-transparent hover:border-blue-300/30'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
