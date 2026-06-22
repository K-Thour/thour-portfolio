import { useState } from "react";
import { motion } from "motion/react";
import { Grid3x3, Link2, Image, Upload, Loader2 } from "lucide-react";
import { useAppSelector } from "../../../../../hooks/useRedux";
import FieldWrapper from "../../../../../components/ui/fieldWrapper/FieldWrapper";
import { ImageCropperModal } from "../../../../../components/common/imageCropper/ImageCropperModal";
import { uploadImage } from "../../../../../services/api";
import utils from "../../../../../utils";

const { cn } = utils.tailwindUtils;

interface IconSelectorProps {
  iconType: "emoji" | "url" | "image";
  formData: {
    icon: string;
    iconUrl: string;
    iconImage: string;
  };
  errors: Record<string, string | undefined>;
  iconOptions: string[];
  onIconTypeChange: (type: "emoji" | "url" | "image") => void;
  onFormDataChange: (data: Record<string, string>) => void;
}

export function IconSelector({
  iconType,
  formData,
  errors,
  iconOptions,
  onIconTypeChange,
  onFormDataChange,
}: IconSelectorProps) {
  const { theme } = useAppSelector((state) => state.theme);
  const isDark = theme === "dark";

  const [imageType, setImageType] = useState<"url" | "file">("file");
  const [cropperOpen, setCropperOpen] = useState(false);
  const [srcImage, setSrcImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSrcImage(reader.result as string);
        setCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (croppedBase64: string) => {
    setUploading(true);
    try {
      const res = await uploadImage(croppedBase64);
      onFormDataChange({ ...formData, iconImage: res.url });
    } catch (err) {
      console.error("Failed to upload logo image:", err);
    } finally {
      setUploading(false);
      setCropperOpen(false);
    }
  };

  return (
    <FieldWrapper label="Icon Type" isDark={isDark}>
      {/* Icon Type Selector */}
      <div className="flex gap-3 mb-4">
        <button
          type="button"
          onClick={() => onIconTypeChange("emoji")}
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
          <Grid3x3 className="w-5 h-5" />
          Select Icon
        </button>
        <button
          type="button"
          onClick={() => onIconTypeChange("url")}
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
          onClick={() => onIconTypeChange("image")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
            iconType === "image"
              ? isDark
                ? "border-red-500 bg-red-500/20 text-white"
                : "border-blue-500 bg-blue-100 text-gray-900"
              : isDark
                ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                : "border-gray-300 text-gray-600 hover:border-blue-400"
          }`}
        >
          <Image className="w-5 h-5" />
          Image Upload
        </button>
      </div>

      {/* Icon Selection based on type */}
      {iconType === "emoji" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-8 gap-2">
            {iconOptions.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => onFormDataChange({ ...formData, icon })}
                className={`p-3 text-2xl rounded-xl border-2 transition-all hover:scale-110 ${
                  formData.icon === icon
                    ? isDark
                      ? "border-red-500 bg-red-500/20"
                      : "border-blue-500 bg-blue-100"
                    : isDark
                      ? "border-slate-700 hover:border-red-500/50"
                      : "border-gray-300 hover:border-blue-400"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {iconType === "url" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
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
            placeholder="https://cdn.example.com/react-icon.svg"
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
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </motion.div>
      )}

      {iconType === "image" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 relative"
        >
          {uploading && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-20 rounded-xl">
              <div className="flex flex-col items-center gap-2">
                <Loader2
                  className={cn(
                    "w-10 h-10 animate-spin",
                    isDark ? "text-red-500" : "text-blue-500",
                  )}
                />
                <p
                  className={cn(
                    "text-xs font-semibold",
                    isDark ? "text-white" : "text-gray-900",
                  )}
                >
                  Uploading logo...
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={() => setImageType("file")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 font-medium transition-all text-sm ${
                imageType === "file"
                  ? isDark
                    ? "border-red-500 bg-red-500/20 text-white"
                    : "border-blue-500 bg-blue-100 text-gray-900"
                  : isDark
                    ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                    : "border-gray-300 text-gray-600 hover:border-blue-400"
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload Logo
            </button>
            <button
              type="button"
              onClick={() => setImageType("url")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 font-medium transition-all text-sm ${
                imageType === "url"
                  ? isDark
                    ? "border-red-500 bg-red-500/20 text-white"
                    : "border-blue-500 bg-blue-100 text-gray-900"
                  : isDark
                    ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                    : "border-gray-300 text-gray-600 hover:border-blue-400"
              }`}
            >
              <Link2 className="w-4 h-4" />
              Logo URL
            </button>
          </div>

          {imageType === "url" ? (
            <div>
              <input
                type="text"
                value={formData.iconImage}
                onChange={(e) =>
                  onFormDataChange({ ...formData, iconImage: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                  isDark
                    ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                    : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500"
                } ${errors.icon ? "border-red-500" : ""}`}
                placeholder="https://images.unsplash.com/..."
              />
              <p
                className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}
              >
                Enter an image URL (PNG, JPG, SVG)
              </p>
            </div>
          ) : (
            <div>
              <label
                className={`block w-full cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition-all bg-transparent ${
                  isDark
                    ? "border-red-500/20 hover:border-red-500/50 bg-slate-900/50"
                    : "border-blue-300/50 hover:border-blue-500/70 bg-gray-50"
                }`}
              >
                <Upload
                  className={`w-8 h-8 mx-auto mb-2 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <p
                  className={`text-sm mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Click to upload logo photo
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, SVG, WEBP (max 2MB)
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {formData.iconImage && (
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
                src={formData.iconImage}
                alt="Icon preview"
                className="w-16 h-16 object-contain rounded-lg mx-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          <ImageCropperModal
            isOpen={cropperOpen}
            imageSrc={srcImage}
            isDark={isDark}
            onClose={() => setCropperOpen(false)}
            onCropComplete={handleCropComplete}
            title="Crop Technology Logo"
            defaultCircular={false}
          />
        </motion.div>
      )}

      {errors.icon && (
        <p className="text-red-500 text-sm mt-2">{errors.icon}</p>
      )}
    </FieldWrapper>
  );
}
