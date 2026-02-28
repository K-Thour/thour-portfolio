import { motion } from 'motion/react';
import { Shield, Axe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
        theme === 'avengers'
          ? 'bg-slate-800/50 border-red-500/30 hover:border-red-500/50'
          : 'bg-blue-50 border-blue-300/50 hover:border-blue-400'
      }`}
      title={`Switch to ${theme === 'avengers' ? 'God of War' : 'Avengers'} theme`}
    >
      <motion.div
        className="flex items-center gap-2"
        animate={{ rotate: theme === 'avengers' ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {theme === 'avengers' ? (
          <Shield className="w-5 h-5 text-red-500" />
        ) : (
          <Axe className="w-5 h-5 text-blue-700" />
        )}
      </motion.div>
    </button>
  );
}
