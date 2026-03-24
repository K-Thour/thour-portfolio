import { motion } from "motion/react";
import { Home, ArrowLeft } from "lucide-react";

interface ActionButtonsProps {
  isDark: boolean;
  onNavigateHome: () => void;
  onGoBack: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isDark,
  onNavigateHome,
  onGoBack,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      <button
        onClick={onNavigateHome}
        className={`flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all hover:scale-105 ${
          isDark
            ? "bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
            : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
        }`}
      >
        <Home className="w-5 h-5" />
        {isDark ? "Return to Base" : "Return to Hall"}
      </button>

      <button
        onClick={onGoBack}
        className={`flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all hover:scale-105 ${
          isDark
            ? "bg-slate-800/50 border border-red-500/20 text-white hover:border-red-500/50"
            : "bg-white border border-blue-300/40 text-gray-900 hover:border-blue-500/60 shadow-lg shadow-blue-500/10"
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        Go Back
      </button>
    </motion.div>
  );
};
