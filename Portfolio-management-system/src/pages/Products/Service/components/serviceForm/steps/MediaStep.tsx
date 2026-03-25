import { motion } from "motion/react";
import { Upload, Link2, Image as ImageIcon } from "lucide-react";
import type { MediaStepProps } from "../../types";
import { useAppSelector } from "../../../../../../hooks/useRedux";
import type { RootState } from "../../../../../../store/store";

export function MediaStep({
  formData,
  errors,
  photoType,
  iconType,
  emojiOptions,
  onPhotoTypeChange,
  onIconTypeChange,
  onFormDataChange,
  onPhotoFileChange,
  onIconFileChange,
}: MediaStepProps) {
  const { theme } = useAppSelector((state: RootState) => state.theme);
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Service Photo */}
      <div>
        <label
          className={`block text-sm font-medium mb-3 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Service Photo *
        </label>

        <div className="flex gap-3 mb-4">
          <button
            type="button"
            onClick={() => {
              onPhotoTypeChange("url");
              onFormDataChange({
                ...formData,
                photoUrl: "",
                photoFile: undefined,
              });
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
              photoType === "url"
                ? isDark
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-blue-500 bg-blue-100 text-gray-900"
                : isDark
                  ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                  : "border-gray-300 text-gray-600 hover:border-blue-400"
            }`}
          >
            <Link2 className="w-5 h-5" />
            Photo URL
          </button>
          <button
            type="button"
            onClick={() => {
              onPhotoTypeChange("upload");
              onFormDataChange({
                ...formData,
                photoUrl: "",
                photoFile: undefined,
              });
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
              photoType === "upload"
                ? isDark
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-blue-500 bg-blue-100 text-gray-900"
                : isDark
                  ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                  : "border-gray-300 text-gray-600 hover:border-blue-400"
            }`}
          >
            <Upload className="w-5 h-5" />
            Upload Photo
          </button>
        </div>

        {photoType === "url" ? (
          <div>
            <input
              type="url"
              value={formData.photoUrl}
              onChange={(e) =>
                onFormDataChange({ ...formData, photoUrl: e.target.value })
              }
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
              } ${errors.photo ? "border-red-500" : ""}`}
              placeholder="https://images.unsplash.com/..."
            />
            {formData.photoUrl && (
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
                  src={formData.photoUrl}
                  alt="Photo preview"
                  className="w-full h-40 object-cover rounded-lg"
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
                Click to upload photo
              </p>
              <p
                className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
              >
                PNG, JPG, WEBP (max 5MB)
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={onPhotoFileChange}
                className="hidden"
              />
            </label>
            {formData.photoFile && (
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
                  src={formData.photoFile}
                  alt="Photo preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        )}
        {errors.photo && (
          <p className="text-red-500 text-sm mt-2">{errors.photo}</p>
        )}
      </div>

      {/* Service Icon */}
      <div>
        <label
          className={`block text-sm font-medium mb-3 ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          Service Icon *
        </label>

        <div className="flex gap-3 mb-4">
          <button
            type="button"
            onClick={() => {
              onIconTypeChange("emoji");
              onFormDataChange({
                ...formData,
                iconUrl: "",
                iconFile: undefined,
              });
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
              iconType === "emoji"
                ? isDark
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-blue-500 bg-blue-100 text-gray-900"
                : isDark
                  ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                  : "border-gray-300 text-gray-600 hover:border-blue-400"
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            Select Emoji
          </button>
          <button
            type="button"
            onClick={() => {
              onIconTypeChange("url");
              onFormDataChange({
                ...formData,
                iconUrl: "",
                iconFile: undefined,
              });
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
              iconType === "url"
                ? isDark
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-blue-500 bg-blue-100 text-gray-900"
                : isDark
                  ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                  : "border-gray-300 text-gray-600 hover:border-blue-400"
            }`}
          >
            <Link2 className="w-5 h-5" />
            Icon URL
          </button>
          <button
            type="button"
            onClick={() => {
              onIconTypeChange("upload");
              onFormDataChange({
                ...formData,
                iconUrl: "",
                iconFile: undefined,
              });
            }}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
              iconType === "upload"
                ? isDark
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-blue-500 bg-blue-100 text-gray-900"
                : isDark
                  ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                  : "border-gray-300 text-gray-600 hover:border-blue-400"
            }`}
          >
            <Upload className="w-5 h-5" />
            Upload Icon
          </button>
        </div>

        {iconType === "emoji" && (
          <div className="grid grid-cols-6 gap-2">
            {emojiOptions.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => onFormDataChange({ ...formData, icon: emoji })}
                className={`p-4 text-3xl rounded-xl border-2 transition-all hover:scale-110 ${
                  formData.icon === emoji
                    ? isDark
                      ? "border-red-500 bg-red-500/20"
                      : "border-blue-500 bg-blue-100"
                    : isDark
                      ? "border-slate-700 hover:border-red-500/50"
                      : "border-gray-300 hover:border-blue-400"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {iconType === "url" && (
          <div>
            <input
              type="url"
              value={formData.iconUrl}
              onChange={(e) =>
                onFormDataChange({ ...formData, iconUrl: e.target.value })
              }
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
              } ${errors.icon ? "border-red-500" : ""}`}
              placeholder="https://cdn.example.com/icon.svg"
            />
            {formData.iconUrl && (
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
                  src={formData.iconUrl}
                  alt="Icon preview"
                  className="w-12 h-12 object-contain"
                />
              </div>
            )}
          </div>
        )}

        {iconType === "upload" && (
          <div>
            <label
              className={`block w-full cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                isDark
                  ? "border-red-500/20 hover:border-red-500/50 bg-slate-900/50"
                  : "border-blue-300/50 hover:border-blue-500/70 bg-gray-50"
              }`}
            >
              <Upload
                className={`w-10 h-10 mx-auto mb-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              />
              <p
                className={`text-sm mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                Click to upload icon
              </p>
              <p
                className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}
              >
                PNG, SVG (max 1MB)
              </p>
              <input
                type="file"
                accept="image/png,image/svg+xml"
                onChange={onIconFileChange}
                className="hidden"
              />
            </label>
            {formData.iconFile && (
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
                  src={formData.iconFile}
                  alt="Icon preview"
                  className="w-12 h-12 object-contain"
                />
              </div>
            )}
          </div>
        )}
        {errors.icon && (
          <p className="text-red-500 text-sm mt-2">{errors.icon}</p>
        )}
      </div>
    </motion.div>
  );
}
