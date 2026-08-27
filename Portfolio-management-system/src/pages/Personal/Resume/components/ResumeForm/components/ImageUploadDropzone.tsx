import React, { useRef, useState } from "react";
import {
  Image as ImageIcon,
  Upload,
  X,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

interface ImageUploadDropzoneProps {
  file?: File;
  previewUrl?: string;
  isDark: boolean;
  onFileChange: (file?: File, previewUrl?: string) => void;
}

export function ImageUploadDropzone({
  file,
  previewUrl,
  isDark,
  onFileChange,
}: ImageUploadDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleProcessFile = (selectedFile: File) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, JPEG, WEBP)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      onFileChange(selectedFile, url);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(undefined, "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label
        className={`block text-xs font-semibold flex items-center gap-1.5 ${
          isDark ? "text-slate-200" : "text-slate-700"
        }`}
      >
        <ImageIcon className="w-4 h-4 text-blue-500" />
        Design Mockup Image (PNG, JPG, WEBP)
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleProcessFile(e.target.files[0]);
        }}
      />

      {previewUrl ? (
        <div
          className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
            isDark
              ? "bg-slate-900/60 border-slate-700"
              : "bg-white border-slate-200 shadow-sm"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-700 bg-black/40 shrink-0 flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Design Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p
                className={`text-xs font-semibold truncate ${
                  isDark ? "text-slate-200" : "text-slate-800"
                }`}
              >
                {file?.name || "Mockup Image"}
              </p>
              <p
                className={`text-[11px] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {file
                  ? `${(file.size / 1024).toFixed(1)} KB`
                  : "Attached Image"}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-500 font-medium mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Ready for AI parsing
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 font-medium transition-all ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
              title="Replace image"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`p-5 rounded-xl border border-dashed text-center transition-all cursor-pointer ${
            dragOver
              ? isDark
                ? "border-blue-400 bg-blue-950/40"
                : "border-blue-500 bg-blue-50"
              : isDark
                ? "border-slate-700 bg-slate-900/40 hover:bg-slate-800/40 hover:border-slate-600"
                : "border-slate-300 bg-slate-50/70 hover:bg-slate-100 hover:border-blue-400"
          }`}
        >
          <div
            className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${
              isDark
                ? "bg-blue-950/60 text-blue-400"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            <Upload className="w-5 h-5" />
          </div>
          <p
            className={`text-xs font-semibold ${
              isDark ? "text-slate-200" : "text-slate-800"
            }`}
          >
            Click or drag & drop resume mockup
          </p>
          <p
            className={`text-[11px] mt-0.5 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            PNG, JPG, or WEBP up to 10MB
          </p>
        </div>
      )}
    </div>
  );
}
