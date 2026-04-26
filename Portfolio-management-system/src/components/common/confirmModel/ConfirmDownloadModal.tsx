import { motion, AnimatePresence } from "motion/react";
import { Download, FileText, X, FileCode, FileType2 } from "lucide-react";
import { useAppSelector } from "../../../hooks/useRedux";
import { useEffect, useState } from "react";

export type DownloadFormat = "pdf" | "docx" | "json";

interface ConfirmDownloadModalProps {
  isOpen: boolean;
  onConfirm: (format: DownloadFormat) => void;
  onCancel: () => void;
  title: string;
  fileName: string;
  fileSize?: string;
  previewData?: {
    name?: string;
    email?: string;
    phone?: string;
    summary?: string;
    experienceCount?: number;
    educationCount?: number;
    skillsCount?: number;
  };
}

function ConfirmDownloadModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  fileName,
  fileSize = "~150 KB",
  previewData,
}: ConfirmDownloadModalProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat>("pdf");

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

  const formatOptions: {
    value: DownloadFormat;
    label: string;
    icon: typeof FileText;
    color: string;
  }[] = [
    { value: "pdf", label: "PDF", icon: FileText, color: "text-red-500" },
    { value: "docx", label: "Word", icon: FileType2, color: "text-blue-500" },
    { value: "json", label: "JSON", icon: FileCode, color: "text-green-500" },
  ];

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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60 w-full h-full"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl"
            >
              <div
                className={`rounded-2xl border overflow-hidden ${
                  isDark
                    ? "bg-slate-800 border-blue-500/30 shadow-2xl shadow-blue-500/20"
                    : "bg-white border-blue-300/50 shadow-2xl shadow-blue-500/30"
                }`}
              >
                {/* Header */}
                <div
                  className={`flex items-center justify-between p-4 border-b ${
                    isDark ? "border-slate-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring" }}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isDark ? "bg-blue-500/20" : "bg-blue-100"
                      }`}
                    >
                      <Download
                        className={`w-5 h-5 ${
                          isDark ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                    </motion.div>
                    <div>
                      <h3
                        className={`text-lg font-bold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {title}
                      </h3>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {fileName}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onCancel}
                    className={`p-2 rounded-lg transition-all ${
                      isDark
                        ? "hover:bg-slate-700 text-gray-400"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row">
                  {/* Preview Section */}
                  <div
                    className={`flex-1 p-6 ${
                      isDark ? "bg-slate-900/50" : "bg-gray-50"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium mb-4 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Preview
                    </p>

                    {/* Resume Preview Card */}
                    <div
                      className={`rounded-xl border p-4 ${
                        isDark
                          ? "bg-slate-800 border-slate-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      {/* Resume Header Preview */}
                      <div className="border-b pb-3 mb-3">
                        <h4
                          className={`font-bold text-lg ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {previewData?.name || "Resume Preview"}
                        </h4>
                        <div
                          className={`text-sm mt-1 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {previewData?.email && <p>{previewData.email}</p>}
                          {previewData?.phone && <p>{previewData.phone}</p>}
                        </div>
                      </div>

                      {/* Summary Preview */}
                      {previewData?.summary && (
                        <div className="mb-3">
                          <p
                            className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                              isDark ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            Summary
                          </p>
                          <p
                            className={`text-sm line-clamp-3 ${
                              isDark ? "text-gray-300" : "text-gray-700"
                            }`}
                          >
                            {previewData.summary}
                          </p>
                        </div>
                      )}

                      {/* Stats Preview */}
                      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t">
                        <div className="text-center">
                          <p
                            className={`text-lg font-bold ${
                              isDark ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            {previewData?.experienceCount || 0}
                          </p>
                          <p
                            className={`text-xs ${
                              isDark ? "text-gray-500" : "text-gray-600"
                            }`}
                          >
                            Experience
                          </p>
                        </div>
                        <div className="text-center">
                          <p
                            className={`text-lg font-bold ${
                              isDark ? "text-green-400" : "text-green-600"
                            }`}
                          >
                            {previewData?.educationCount || 0}
                          </p>
                          <p
                            className={`text-xs ${
                              isDark ? "text-gray-500" : "text-gray-600"
                            }`}
                          >
                            Education
                          </p>
                        </div>
                        <div className="text-center">
                          <p
                            className={`text-lg font-bold ${
                              isDark ? "text-purple-400" : "text-purple-600"
                            }`}
                          >
                            {previewData?.skillsCount || 0}
                          </p>
                          <p
                            className={`text-xs ${
                              isDark ? "text-gray-500" : "text-gray-600"
                            }`}
                          >
                            Skills
                          </p>
                        </div>
                      </div>
                    </div>

                    <p
                      className={`text-xs mt-3 ${
                        isDark ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      Estimated file size: {fileSize}
                    </p>
                  </div>

                  {/* Options Section */}
                  <div
                    className={`w-full md:w-64 p-6 border-t md:border-t-0 md:border-l ${
                      isDark ? "border-slate-700" : "border-gray-200"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium mb-4 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Select Format
                    </p>

                    <div className="space-y-2">
                      {formatOptions.map((format) => {
                        const Icon = format.icon;
                        const isSelected = selectedFormat === format.value;

                        return (
                          <button
                            key={format.value}
                            onClick={() => setSelectedFormat(format.value)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                              isSelected
                                ? isDark
                                  ? "bg-blue-500/20 border border-blue-500/50"
                                  : "bg-blue-50 border border-blue-300"
                                : isDark
                                  ? "bg-slate-700/50 hover:bg-slate-700"
                                  : "bg-gray-100 hover:bg-gray-200"
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${format.color}`} />
                            <span
                              className={`font-medium ${
                                isSelected
                                  ? isDark
                                    ? "text-blue-300"
                                    : "text-blue-700"
                                  : isDark
                                    ? "text-gray-300"
                                    : "text-gray-700"
                              }`}
                            >
                              {format.label}
                            </span>
                            {isSelected && (
                              <motion.div
                                layoutId="check"
                                className={`ml-auto w-2 h-2 rounded-full ${
                                  isDark ? "bg-blue-400" : "bg-blue-500"
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => onConfirm(selectedFormat)}
                      className={`w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                        isDark
                          ? "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
                          : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
                      }`}
                    >
                      <Download className="w-5 h-5" />
                      Download {selectedFormat.toUpperCase()}
                    </button>

                    <button
                      onClick={onCancel}
                      className={`w-full mt-2 px-4 py-2 rounded-xl font-medium transition-all ${
                        isDark
                          ? "text-gray-400 hover:text-gray-300"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ConfirmDownloadModal;
