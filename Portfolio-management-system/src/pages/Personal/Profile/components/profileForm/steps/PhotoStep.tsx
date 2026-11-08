import React, { useState } from "react";
import { motion } from "motion/react";
import { Image as ImageIcon, Upload, Link2, Loader2, AlertCircle } from "lucide-react";
import utils from "../../../../../../utils";
import type { ProfileFormData } from "../types";
import { ImageCropperModal } from "../../../../../../components/common/imageCropper/ImageCropperModal";
import { uploadImage } from "../../../../../../services/api";

const { cn } = utils.tailwindUtils;

interface PhotoStepProps {
  form: any;
  isDark?: boolean;
}

export const PhotoStep: React.FC<PhotoStepProps> = ({ form, isDark = false }) => {
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
        url: res?.url || croppedBase64,
        publicId: res?.publicId || "",
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
              <div className="absolute inset-0 bg-background/70 backdrop-blur-xs flex items-center justify-center z-20 rounded-2xl">
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-xs font-semibold text-foreground">
                    Uploading image...
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shadow-xs">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-foreground">
                  Profile Photo
                </h3>
                <p className="text-xs text-muted-foreground">
                  Choose a direct web link or upload & crop a local portrait
                </p>
              </div>
            </div>

            {/* Segmented Mode Selector */}
            <div className="p-1 rounded-2xl bg-accent/40 border border-border/40 grid grid-cols-2 gap-1 mb-4">
              <button
                type="button"
                onClick={() => field.handleChange({ ...imageVal, type: "url" })}
                className={cn(
                  "flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-medium text-xs transition-all cursor-pointer active:scale-[0.98]",
                  imageType === "url"
                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                )}
              >
                <Link2 className="w-4 h-4" />
                <span>Image URL</span>
              </button>
              <button
                type="button"
                onClick={() => field.handleChange({ ...imageVal, type: "file" })}
                className={cn(
                  "flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-medium text-xs transition-all cursor-pointer active:scale-[0.98]",
                  imageType === "file"
                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                )}
              >
                <Upload className="w-4 h-4" />
                <span>Upload & Crop</span>
              </button>
            </div>

            {imageType === "url" ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Image Direct URL
                  </label>
                  <input
                    type="url"
                    value={imageVal?.url || ""}
                    onChange={(e) =>
                      field.handleChange({ ...imageVal, url: e.target.value })
                    }
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border bg-accent/30 text-foreground placeholder:text-muted-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                      hasError
                        ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                        : "border-border/50",
                    )}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                {imageVal?.url && (
                  <div className="p-4 rounded-2xl border border-border/40 bg-accent/20 flex flex-col items-center">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 self-start">
                      Preview:
                    </p>
                    <div className="w-28 h-28 rounded-full overflow-hidden border border-border/50 ring-4 ring-primary/10 shadow-md">
                      <img
                        src={imageVal.url}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <label className="block w-full cursor-pointer border-2 border-dashed border-border/60 hover:border-primary/50 bg-accent/20 hover:bg-accent/30 rounded-2xl p-6 text-center transition-all">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold text-foreground mb-0.5">
                    Click to browse and crop photo
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    PNG, JPG, WEBP (under 5MB)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>

                {imageVal?.file && (
                  <div className="p-4 rounded-2xl border border-border/40 bg-accent/20 flex flex-col items-center">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 self-start">
                      Cropped Output:
                    </p>
                    <div className="w-28 h-28 rounded-full overflow-hidden border border-border/50 ring-4 ring-primary/10 shadow-md">
                      <img
                        src={imageVal.file}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {hasError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1.5 text-xs text-destructive font-medium flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{field.state.meta.errors.join(", ")}</span>
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
