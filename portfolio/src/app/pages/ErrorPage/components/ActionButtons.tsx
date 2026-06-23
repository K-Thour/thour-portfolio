import { motion } from 'motion/react';
import { RefreshCw, Home } from 'lucide-react';

interface ActionButtonsProps {
  isDark: boolean;
  navigate: (path: string) => void;
}

export function ActionButtons({ isDark, navigate }: ActionButtonsProps) {
  const handleReload = () => window.location.reload();
  const handleGoHome = () => {
    try {
      navigate('/');
    } catch (e) {
      window.location.href = '/';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10"
    >
      <button
        onClick={handleReload}
        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 cursor-pointer ${
          isDark
            ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/40'
            : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/30'
        }`}
      >
        <RefreshCw className="w-5 h-5" />
        Try Again
      </button>

      <button
        onClick={handleGoHome}
        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 cursor-pointer border ${
          isDark
            ? 'bg-slate-800/40 border-red-500/20 text-white hover:border-red-500/50 backdrop-blur-sm'
            : 'bg-white border-blue-300/40 text-slate-800 hover:border-blue-500/60 shadow-md shadow-blue-500/5'
        }`}
      >
        <Home className="w-5 h-5" />
        {isDark ? 'Return to Base' : 'Return to Hall'}
      </button>
    </motion.div>
  );
}
