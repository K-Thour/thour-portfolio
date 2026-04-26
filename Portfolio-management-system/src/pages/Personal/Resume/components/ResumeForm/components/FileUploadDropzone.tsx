import { Upload, File } from "lucide-react";

interface Props {
  fileName?: string;
  filePreviewUrl?: string;
  isImage: boolean;
  isDark: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUploadDropzone({
  fileName,
  filePreviewUrl,
  isImage,
  isDark,
  onFileChange,
}: Props) {
  return (
    <div>
      <label
        className={`block w-full cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition-all ${
          isDark
            ? "border-red-500/20 hover:border-red-500/50 bg-slate-900/50"
            : "border-blue-300/50 hover:border-blue-500/70 bg-gray-50"
        }`}
      >
        <Upload
          className={`w-8 h-8 mx-auto mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
        />
        <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          Click to upload {isImage ? "image" : "PDF"}
        </p>
        <input
          type="file"
          accept={isImage ? "image/*" : "application/pdf"}
          onChange={onFileChange}
          className="hidden"
        />
      </label>

      {filePreviewUrl && fileName && (
        <div
          className={`mt-3 p-3 rounded-lg border ${isDark ? "bg-slate-800" : "bg-gray-50"}`}
        >
          <p
            className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Selected: {fileName}
          </p>
          {isImage ? (
            <img
              src={filePreviewUrl}
              alt="Preview"
              className="w-full h-32 object-contain rounded-lg mt-2"
            />
          ) : (
            <div
              className={`flex items-center gap-2 p-3 rounded-lg mt-2 ${isDark ? "bg-slate-700" : "bg-white"}`}
            >
              <File className="w-8 h-8 text-red-500" />
              <span
                className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                {fileName}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
