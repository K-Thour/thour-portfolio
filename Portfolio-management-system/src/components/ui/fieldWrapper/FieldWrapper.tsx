import { motion } from "motion/react";

interface FieldWrapperProps {
  label: string;
  error?: string;
  isDark: boolean;
  children: React.ReactNode;
}

const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  isDark,
  children,
}) => (
  <div className="space-y-1.5">
    <label
      className={`block text-sm font-semibold ${isDark ? "text-slate-300" : "text-slate-800"}`}
    >
      {label}
    </label>
    {children}
    {error && (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-red-500 font-medium flex items-center gap-1"
      >
        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
        {error}
      </motion.p>
    )}
  </div>
);

export default FieldWrapper;
