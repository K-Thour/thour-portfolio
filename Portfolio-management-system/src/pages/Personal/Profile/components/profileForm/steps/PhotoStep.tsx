import { motion } from "motion/react";
import { Image as ImageIcon, Upload, Link2 } from "lucide-react";
import type { PhotoStepProps } from "../types";

export function PhotoStep({
  formData,
  imageType,
  error,
  isDark,
  onImageTypeChange,
  onUrlChange,
  onFileChange,
}: PhotoStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isDark
              ? "bg-linear-to-br from-red-600 to-yellow-500"
              : "bg-linear-to-br from-blue-600 to-blue-400"
          }`}
        >
          <ImageIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3
            className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Profile Photo
          </h3>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Upload your profile image
          </p>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <button
          type="button"
          onClick={() => onImageTypeChange("url")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
            imageType === "url"
              ? isDark
                ? "border-red-500 bg-red-500/20 text-white"
                : "border-blue-500 bg-blue-100 text-gray-900"
              : isDark
                ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                : "border-gray-300 text-gray-600 hover:border-blue-400"
          }`}
        >
          <Link2 className="w-5 h-5" />
          Image URL
        </button>
        <button
          type="button"
          onClick={() => onImageTypeChange("file")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
            imageType === "file"
              ? isDark
                ? "border-red-500 bg-red-500/20 text-white"
                : "border-blue-500 bg-blue-100 text-gray-900"
              : isDark
                ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                : "border-gray-300 text-gray-600 hover:border-blue-400"
          }`}
        >
          <Upload className="w-5 h-5" />
          Upload Image
        </button>
      </div>

      {imageType === "url" ? (
        <div>
          <input
            type="url"
            value={formData.image.url}
            onChange={(e) => onUrlChange(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
            } ${error ? "border-red-500" : ""}`}
            placeholder="https://example.com/your-photo.jpg"
          />
          {formData.image.url && (
            <div
              className={`mt-3 p-4 rounded-xl border ${
                isDark
                  ? "bg-slate-900/50 border-red-500/20"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              <p
                className={`text-xs mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Preview:
              </p>
              <img
                src={formData.image.url}
                alt="Profile preview"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          <label
            className={`block w-full cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              isDark
                ? "border-red-500/20 hover:border-red-500/50 bg-slate-900/50"
                : "border-blue-300/50 hover:border-blue-500/70 bg-gray-50"
            }`}
          >
            <Upload
              className={`w-12 h-12 mx-auto mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}
            />
            <p
              className={`text-sm mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Click to upload profile photo
            </p>
            <p
              className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
            >
              PNG, JPG, WEBP (max 5MB)
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
          </label>
          {formData.image.file && (
            <div
              className={`mt-3 p-4 rounded-xl border ${
                isDark
                  ? "bg-slate-900/50 border-red-500/20"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              <p
                className={`text-xs mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Preview:
              </p>
              <img
                src={formData.image.file}
                alt="Profile preview"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>
          )}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </motion.div>
  );
}
