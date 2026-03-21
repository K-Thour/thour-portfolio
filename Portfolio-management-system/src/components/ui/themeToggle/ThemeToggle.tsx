import { motion } from "motion/react";
import { Shield, Axe } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { toggleTheme } from "../../../store/slices/theme.slice";

export function ThemeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
        theme === "dark"
          ? "bg-slate-800/50 border-red-500/30 hover:border-red-500/50"
          : "bg-blue-50 border-blue-300/50 hover:border-blue-400"
      }`}
      title={`Switch to ${theme === "dark" ? "God of War" : "Avengers"} theme`}
    >
      <motion.div
        className="flex items-center gap-2"
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {theme === "dark" ? (
          <Shield className="w-5 h-5 text-red-500" />
        ) : (
          <Axe className="w-5 h-5 text-blue-700" />
        )}
      </motion.div>
    </button>
  );
}
