import React, { useState } from "react";
import { motion } from "motion/react";
import { Image as ImageIcon, Upload, Link2, Loader2 } from "lucide-react";
import utils from "../../../../../../utils";
import type { ProfileFormData } from "../types";
import { ImageCropperModal } from "../../../../../../components/common/imageCropper/ImageCropperModal";
import { uploadImage } from "../../../../../../services/api";

const { cn } = utils.tailwindUtils;

interface PhotoStepProps {
  form: any;
  isDark: boolean;
}

export const PhotoStep: React.FC<PhotoStepProps> = ({ form, isDark }) => {
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

  const handleCropComplete = async (croppedBase64: string, field: any) => {
    setUploading(true);
    try {
      const res = await uploadImage(croppedBase64);
      field.handleChange({
        type: "url",
        url: res.url,
        publicId: res.publicId,
        file: croppedBase64,
      });
    } catch (err) {
      console.error("Failed to upload image:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form.Field
      name="image"
      validators={{
        onChange: ({ value }: { value: ProfileFormData["image"] }) => {
          if (value.type === "url" && (!value.url || !value.url.trim())) {
            return "Image URL is required";
          }
          if (value.type === "file" && !value.file) {
            return "Please upload an image";
          }
          return undefined;
        },
      }}
    >
      {(field: any) => {
        const imageVal = field.state.value;
        const imageType = imageVal?.type || "url";
        const hasError =
          field.state.meta.isTouched && field.state.meta.errors.length > 0;

        return (
          <div className="space-y-4 relative">
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
                    Uploading image...
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  isDark
                    ? "bg-linear-to-br from-red-600 to-yellow-500"
                    : "bg-linear-to-br from-blue-600 to-blue-400",
                )}
              >
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3
                  className={cn(
                    "font-bold",
                    isDark ? "text-white" : "text-gray-900",
                  )}
                >
                  Profile Photo
                </h3>
                <p
                  className={cn(
                    "text-sm",
                    isDark ? "text-gray-400" : "text-gray-600",
                  )}
                >
                  Upload your profile image
                </p>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <button
                type="button"
                onClick={() => field.handleChange({ ...imageVal, type: "url" })}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all",
                  imageType === "url"
                    ? isDark
                      ? "border-red-500 bg-red-500/20 text-white"
                      : "border-blue-500 bg-blue-100 text-gray-900"
                    : isDark
                      ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                      : "border-gray-300 text-gray-600 hover:border-blue-400",
                )}
              >
                <Link2 className="w-5 h-5" />
                Image URL
              </button>
              <button
                type="button"
                onClick={() =>
                  field.handleChange({ ...imageVal, type: "file" })
                }
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all",
                  imageType === "file"
                    ? isDark
                      ? "border-red-500 bg-red-500/20 text-white"
                      : "border-blue-500 bg-blue-100 text-gray-900"
                    : isDark
                      ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                      : "border-gray-300 text-gray-600 hover:border-blue-400",
                )}
              >
                <Upload className="w-5 h-5" />
                Upload Image
              </button>
            </div>

            {imageType === "url" ? (
              <div>
                <input
                  type="url"
                  value={imageVal?.url || ""}
                  onChange={(e) =>
                    field.handleChange({ ...imageVal, url: e.target.value })
                  }
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                    isDark
                      ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                      : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 focus:ring-blue-500",
                    hasError ? "border-red-500" : "",
                  )}
                  placeholder="https://example.com/your-photo.jpg"
                />
                {imageVal?.url && (
                  <div
                    className={cn(
                      "mt-3 p-4 rounded-xl border",
                      isDark
                        ? "bg-slate-900/50 border-red-500/20"
                        : "bg-gray-50 border-gray-300",
                    )}
                  >
                    <p
                      className={cn(
                        "text-xs mb-2",
                        isDark ? "text-gray-400" : "text-gray-600",
                      )}
                    >
                      Preview:
                    </p>
                    <img
                      src={imageVal.url}
                      alt="Profile preview"
                      className="w-32 h-32 object-cover rounded-full mx-auto"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label
                  className={cn(
                    "block w-full cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all",
                    isDark
                      ? "border-red-500/20 hover:border-red-500/50 bg-slate-900/50"
                      : "border-blue-300/50 hover:border-blue-500/70 bg-gray-50",
                  )}
                >
                  <Upload
                    className={cn(
                      "w-12 h-12 mx-auto mb-3",
                      isDark ? "text-gray-400" : "text-gray-500",
                    )}
                  />
                  <p
                    className={cn(
                      "text-sm mb-1",
                      isDark ? "text-gray-300" : "text-gray-700",
                    )}
                  >
                    Click to upload profile photo
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      isDark ? "text-gray-500" : "text-gray-500",
                    )}
                  >
                    PNG, JPG, WEBP (max 5MB)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>
                {imageVal?.file && (
                  <div
                    className={cn(
                      "mt-3 p-4 rounded-xl border",
                      isDark
                        ? "bg-slate-900/50 border-red-500/20"
                        : "bg-gray-50 border-gray-300",
                    )}
                  >
                    <p
                      className={cn(
                        "text-xs mb-2",
                        isDark ? "text-gray-400" : "text-gray-600",
                      )}
                    >
                      Preview:
                    </p>
                    <img
                      src={imageVal.file}
                      alt="Profile preview"
                      className="w-32 h-32 object-cover rounded-full mx-auto"
                    />
                  </div>
                )}
              </div>
            )}
            {hasError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1"
              >
                <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                {field.state.meta.errors.join(", ")}
              </motion.p>
            )}

            <ImageCropperModal
              isOpen={cropperOpen}
              imageSrc={srcImage}
              isDark={isDark}
              onClose={() => setCropperOpen(false)}
              onCropComplete={(croppedBase64) =>
                handleCropComplete(croppedBase64, field)
              }
              title="Crop Profile Photo"
              defaultCircular={true}
            />
          </div>
        );
      }}
    </form.Field>
  );
};

export default PhotoStep;
