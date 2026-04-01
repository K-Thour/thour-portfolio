import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useAppSelector } from "../../../hooks/useRedux";
import { useEffect } from "react";
import { sizeClasses } from "./constraints/constraints";
import type { ModalProps } from "./types";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className,
}: ModalProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    // Lock scroll
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";

      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`${className} fixed inset-0 bg-black/60 backdrop-blur-sm z-50 min-h-screen flex items-center justify-center `}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className={`w-full ${sizeClasses[size]} my-8`}
            >
              <div
                className={`rounded-2xl border ${
                  isDark
                    ? "bg-slate-800 border-red-500/20"
                    : "bg-white border-blue-300/40 shadow-2xl shadow-blue-500/20"
                }`}
              >
                {/* Header */}
                <div
                  className={`flex items-center justify-between p-6 border-b ${
                    isDark ? "border-red-500/20" : "border-blue-300/30"
                  }`}
                >
                  <h2
                    className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className={`p-2 rounded-lg transition-all ${
                      isDark
                        ? "hover:bg-slate-700/50 text-gray-400 hover:text-white"
                        : "hover:bg-blue-100 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">{children}</div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
