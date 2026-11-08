import { motion, AnimatePresence } from "motion/react";
import { Download, FileText, X, FileCode, FileType2 } from "lucide-react";
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
  const [selectedFormat, setSelectedFormat] = useState<DownloadFormat>("pdf");

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  const formatOptions: {
    value: DownloadFormat;
    label: string;
    icon: typeof FileText;
  }[] = [
    { value: "pdf", label: "PDF Document", icon: FileText },
    { value: "docx", label: "Word (DOCX)", icon: FileType2 },
    { value: "json", label: "JSON Raw Data", icon: FileCode },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-60"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative z-70 w-full max-w-2xl"
          >
            <div className="rounded-3xl border border-border/50 bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] text-foreground">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border/40 shrink-0 bg-card/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold tracking-tight text-foreground">
                      {title}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate max-w-xs sm:max-w-md">
                      {fileName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onCancel}
                  aria-label="Close download dialog"
                  className="p-1.5 rounded-xl hover:bg-accent/60 text-muted-foreground hover:text-foreground active:scale-95 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row overflow-y-auto flex-1">
                {/* Preview Section */}
                <div className="flex-1 p-6 bg-accent/20">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Document Preview
                  </p>

                  <div className="rounded-2xl border border-border/50 bg-card/80 p-5 shadow-xs">
                    {/* Header */}
                    <div className="border-b border-border/40 pb-3 mb-3">
                      <h4 className="font-bold text-base text-foreground">
                        {previewData?.name || "Candidate Name"}
                      </h4>
                      <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                        {previewData?.email && <p>{previewData.email}</p>}
                        {previewData?.phone && <p>{previewData.phone}</p>}
                      </div>
                    </div>

                    {/* Summary */}
                    {previewData?.summary && (
                      <div className="mb-3">
                        <p className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-1">
                          Professional Summary
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-3">
                          {previewData.summary}
                        </p>
                      </div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-border/40">
                      <div className="text-center p-2 rounded-xl bg-accent/30">
                        <p className="text-base font-bold text-foreground">
                          {previewData?.experienceCount || 0}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Roles
                        </p>
                      </div>
                      <div className="text-center p-2 rounded-xl bg-accent/30">
                        <p className="text-base font-bold text-foreground">
                          {previewData?.educationCount || 0}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Degrees
                        </p>
                      </div>
                      <div className="text-center p-2 rounded-xl bg-accent/30">
                        <p className="text-base font-bold text-foreground">
                          {previewData?.skillsCount || 0}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Skills
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-muted-foreground mt-3">
                    Estimated size: {fileSize}
                  </p>
                </div>

                {/* Options Section */}
                <div className="w-full md:w-64 p-6 border-t md:border-t-0 md:border-l border-border/40 bg-card/40 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Select Format
                    </p>

                    <div className="space-y-2">
                      {formatOptions.map((format) => {
                        const Icon = format.icon;
                        const isSelected = selectedFormat === format.value;

                        return (
                          <button
                            key={format.value}
                            type="button"
                            onClick={() => setSelectedFormat(format.value)}
                            className={`w-full flex items-center gap-3 p-3 rounded-2xl text-xs font-medium transition-all active:scale-[0.98] cursor-pointer ${
                              isSelected
                                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                                : "bg-accent/40 hover:bg-accent/70 border border-border/40 text-foreground"
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span>{format.label}</span>
                            {isSelected && (
                              <div className="ml-auto w-2 h-2 rounded-full bg-white" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 space-y-2">
                    <button
                      type="button"
                      onClick={() => onConfirm(selectedFormat)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download {selectedFormat.toUpperCase()}</span>
                    </button>

                    <button
                      type="button"
                      onClick={onCancel}
                      className="w-full px-4 py-2 rounded-xl font-medium text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmDownloadModal;
