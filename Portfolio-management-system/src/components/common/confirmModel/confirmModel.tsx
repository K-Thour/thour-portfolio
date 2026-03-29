import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle } from "lucide-react";
import { useAppSelector } from "../../../hooks/useRedux";

interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
}: ConfirmDialogProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md"
            >
              <div
                className={`rounded-2xl border p-6 ${
                  isDark
                    ? "bg-slate-800 border-red-500/30 shadow-2xl shadow-red-500/20"
                    : "bg-white border-blue-300/50 shadow-2xl shadow-blue-500/30"
                }`}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isDark ? "bg-red-500/20" : "bg-red-100"
                    }`}
                  >
                    <AlertTriangle
                      className={`w-8 h-8 ${
                        isDark ? "text-red-500" : "text-red-600"
                      }`}
                    />
                  </motion.div>
                </div>

                {/* Title */}
                <h3
                  className={`text-xl font-bold text-center mb-3 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {title}
                </h3>

                {/* Message */}
                <p
                  className={`text-center mb-6 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {message}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onCancel}
                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                      isDark
                        ? "bg-slate-700/50 text-white hover:bg-slate-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 px-4 py-3 rounded-xl font-medium transition-all hover:scale-105 bg-linear-to-r from-red-600 to-red-500 text-white hover:shadow-lg hover:shadow-red-500/50"
                  >
                    {confirmText}
                  </button>
                </div>

                {/* Warning Text */}
                <p
                  className={`text-xs text-center mt-4 ${
                    isDark ? "text-gray-600" : "text-gray-500"
                  }`}
                >
                  {isDark
                    ? "⚠️ This action cannot be undone"
                    : "⚠️ This cannot be reversed"}
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ConfirmModal;
