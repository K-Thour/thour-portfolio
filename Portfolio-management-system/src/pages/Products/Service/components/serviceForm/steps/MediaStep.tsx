import React, { useState } from "react";
import { Upload, Link2, Image as ImageIcon, Loader2 } from "lucide-react";

import utils from "../../../../../../utils";
import { EMOJI_OPTIONS } from "../constants";
import { serviceMediaSchema } from "../../../../../../validations/service";
import { ImageCropperModal } from "../../../../../../components/common/imageCropper/ImageCropperModal";
import { uploadImage } from "../../../../../../services/api";

import { useStore } from "@tanstack/react-form";

const { cn } = utils.tailwindUtils;

interface MediaStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isDark: boolean;
}

export const MediaStep: React.FC<MediaStepProps> = ({ form, isDark }) => {
  const photoType = useStore(
    form.store,
    (state: any) => state.values.photoType || "url",
  );
  const iconType = useStore(
    form.store,
    (state: any) => state.values.iconType || "emoji",
  );

  const [photoCropperOpen, setPhotoCropperOpen] = useState(false);
  const [photoSrcImage, setPhotoSrcImage] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);

  const [iconCropperOpen, setIconCropperOpen] = useState(false);
  const [iconSrcImage, setIconSrcImage] = useState("");
  const [iconUploading, setIconUploading] = useState(false);

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoSrcImage(reader.result as string);
        setPhotoCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoCropComplete = async (croppedBase64: string, field: any) => {
    setPhotoUploading(true);
    try {
      const res = await uploadImage(croppedBase64);
      form.setFieldValue("photoUrl", res.url);
      field.handleChange(res.url);
    } catch (err) {
      console.error("Failed to upload service photo:", err);
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleIconFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIconSrcImage(reader.result as string);
        setIconCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconCropComplete = async (croppedBase64: string, field: any) => {
    setIconUploading(true);
    try {
      const res = await uploadImage(croppedBase64);
      form.setFieldValue("iconUrl", res.url);
      field.handleChange(res.url);
    } catch (err) {
      console.error("Failed to upload service icon:", err);
    } finally {
      setIconUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Service Photo */}
      <div className="relative">
        {photoUploading && (
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
                Uploading photo...
              </p>
            </div>
          </div>
        )}

        <label
          className={cn(
            "block text-sm font-medium mb-3",
            isDark ? "text-gray-300" : "text-gray-800",
          )}
        >
          Service Photo <span className="text-red-500">*</span>
        </label>

        <div className="flex gap-3 mb-4">
          <button
            type="button"
            onClick={() => {
              form.setFieldValue("photoType", "url");
              form.setFieldValue("photoFile", undefined);
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all",
              photoType === "url"
                ? isDark
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-blue-500 bg-blue-100 text-gray-900"
                : isDark
                  ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                  : "border-gray-300 text-gray-600 hover:border-blue-400",
            )}
          >
            <Link2 className="w-5 h-5" />
            Photo URL
          </button>
          <button
            type="button"
            onClick={() => {
              form.setFieldValue("photoType", "upload");
              form.setFieldValue("photoUrl", "");
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all",
              photoType === "upload"
                ? isDark
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-blue-500 bg-blue-100 text-gray-900"
                : isDark
                  ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                  : "border-gray-300 text-gray-600 hover:border-blue-400",
            )}
          >
            <Upload className="w-5 h-5" />
            Upload Photo
          </button>
        </div>

        {photoType === "url" ? (
          <form.Field
            name="photoUrl"
            validators={{
              onChange: ({ value }: { value: string }) => {
                if (form.getFieldValue("photoType") !== "url") return undefined;
                try {
                  serviceMediaSchema.validateSyncAt("photoUrl", {
                    photoType: "url",
                    photoUrl: value,
                  });
                  return undefined;
                } catch (err: any) {
                  return err.message;
                }
              },
            }}
          >
            {(field: any) => (
              <div>
                <input
                  type="url"
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                    isDark
                      ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                      : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 focus:ring-blue-500",
                    field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                      ? "border-red-500"
                      : "",
                  )}
                  placeholder="https://images.unsplash.com/..."
                />
                {field.state.value && (
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
                      src={field.state.value}
                      alt="Photo preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                )}
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-sm mt-2">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
              </div>
            )}
          </form.Field>
        ) : (
          <form.Field
            name="photoFile"
            validators={{
              onChange: ({ value }: { value: string }) => {
                if (form.getFieldValue("photoType") !== "upload")
                  return undefined;
                try {
                  serviceMediaSchema.validateSyncAt("photoFile", {
                    photoType: "upload",
                    photoFile: value,
                  });
                  return undefined;
                } catch (err: any) {
                  return err.message;
                }
              },
            }}
          >
            {(field: any) => (
              <div>
                <label
                  className={cn(
                    "block w-full cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all bg-transparent",
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
                    Click to upload photo
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
                    onChange={handlePhotoFileChange}
                    className="hidden"
                  />
                </label>
                {field.state.value && (
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
                      src={field.state.value}
                      alt="Photo preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                )}
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-sm mt-2">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                <ImageCropperModal
                  isOpen={photoCropperOpen}
                  imageSrc={photoSrcImage}
                  isDark={isDark}
                  onClose={() => setPhotoCropperOpen(false)}
                  onCropComplete={(croppedBase64) =>
                    handlePhotoCropComplete(croppedBase64, field)
                  }
                  title="Crop Service Photo"
                  defaultCircular={false}
                />
              </div>
            )}
          </form.Field>
        )}
      </div>

      {/* Service Icon */}
      <div className="relative">
        {iconUploading && (
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
                Uploading icon...
              </p>
            </div>
          </div>
        )}

        <label
          className={cn(
            "block text-sm font-medium mb-3",
            isDark ? "text-gray-300" : "text-gray-800",
          )}
        >
          Service Icon <span className="text-red-500">*</span>
        </label>

        <div className="flex gap-3 mb-4">
          <button
            type="button"
            onClick={() => {
              form.setFieldValue("iconType", "emoji");
              form.setFieldValue("iconUrl", "");
              form.setFieldValue("iconFile", undefined);
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all",
              iconType === "emoji"
                ? isDark
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-blue-500 bg-blue-100 text-gray-900"
                : isDark
                  ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                  : "border-gray-300 text-gray-600 hover:border-blue-400",
            )}
          >
            <ImageIcon className="w-5 h-5" />
            Select Emoji
          </button>
          <button
            type="button"
            onClick={() => {
              form.setFieldValue("iconType", "url");
              form.setFieldValue("icon", "");
              form.setFieldValue("iconFile", undefined);
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all",
              iconType === "url"
                ? isDark
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-blue-500 bg-blue-100 text-gray-900"
                : isDark
                  ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                  : "border-gray-300 text-gray-600 hover:border-blue-400",
            )}
          >
            <Link2 className="w-5 h-5" />
            Icon URL
          </button>
          <button
            type="button"
            onClick={() => {
              form.setFieldValue("iconType", "upload");
              form.setFieldValue("icon", "");
              form.setFieldValue("iconUrl", "");
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-medium transition-all",
              iconType === "upload"
                ? isDark
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-blue-500 bg-blue-100 text-gray-900"
                : isDark
                  ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                  : "border-gray-300 text-gray-600 hover:border-blue-400",
            )}
          >
            <Upload className="w-5 h-5" />
            Upload Icon
          </button>
        </div>

        {iconType === "emoji" && (
          <form.Field name="icon">
            {(field: any) => (
              <div className="grid grid-cols-6 gap-2">
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => field.handleChange(emoji)}
                    className={cn(
                      "p-4 text-3xl rounded-xl border-2 transition-all hover:scale-110 bg-transparent",
                      field.state.value === emoji
                        ? isDark
                          ? "border-red-500 bg-red-500/20 text-white"
                          : "border-blue-500 bg-blue-100 text-slate-900"
                        : isDark
                          ? "border-slate-700 hover:border-red-500/50 text-slate-400"
                          : "border-gray-300 hover:border-blue-400 text-slate-600",
                    )}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </form.Field>
        )}

        {iconType === "url" && (
          <form.Field
            name="iconUrl"
            validators={{
              onChange: ({ value }: { value: string }) => {
                if (form.getFieldValue("iconType") !== "url") return undefined;
                try {
                  serviceMediaSchema.validateSyncAt("iconUrl", {
                    iconType: "url",
                    iconUrl: value,
                  });
                  return undefined;
                } catch (err: any) {
                  return err.message;
                }
              },
            }}
          >
            {(field: any) => (
              <div>
                <input
                  type="url"
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                    isDark
                      ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                      : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 focus:ring-blue-500",
                    field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                      ? "border-red-500"
                      : "",
                  )}
                  placeholder="https://cdn.example.com/icon.svg"
                />
                {field.state.value && (
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
                      src={field.state.value}
                      alt="Icon preview"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                )}
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-sm mt-2">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
              </div>
            )}
          </form.Field>
        )}

        {iconType === "upload" && (
          <form.Field
            name="iconFile"
            validators={{
              onChange: ({ value }: { value: string }) => {
                if (form.getFieldValue("iconType") !== "upload")
                  return undefined;
                try {
                  serviceMediaSchema.validateSyncAt("iconFile", {
                    iconType: "upload",
                    iconFile: value,
                  });
                  return undefined;
                } catch (err: any) {
                  return err.message;
                }
              },
            }}
          >
            {(field: any) => (
              <div>
                <label
                  className={cn(
                    "block w-full cursor-pointer border-2 border-dashed rounded-xl p-6 text-center transition-all bg-transparent",
                    isDark
                      ? "border-red-500/20 hover:border-red-500/50 bg-slate-900/50"
                      : "border-blue-300/50 hover:border-blue-500/70 bg-gray-50",
                  )}
                >
                  <Upload
                    className={cn(
                      "w-10 h-10 mx-auto mb-2",
                      isDark ? "text-gray-400" : "text-gray-500",
                    )}
                  />
                  <p
                    className={cn(
                      "text-sm mb-1",
                      isDark ? "text-gray-300" : "text-gray-700",
                    )}
                  >
                    Click to upload icon
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      isDark ? "text-gray-500" : "text-gray-500",
                    )}
                  >
                    PNG, SVG (max 1MB)
                  </p>
                  <input
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg"
                    onChange={handleIconFileChange}
                    className="hidden"
                  />
                </label>
                {field.state.value && (
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
                      src={field.state.value}
                      alt="Icon preview"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                )}
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-red-500 text-sm mt-2">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                <ImageCropperModal
                  isOpen={iconCropperOpen}
                  imageSrc={iconSrcImage}
                  isDark={isDark}
                  onClose={() => setIconCropperOpen(false)}
                  onCropComplete={(croppedBase64) =>
                    handleIconCropComplete(croppedBase64, field)
                  }
                  title="Crop Service Icon"
                  defaultCircular={false}
                />
              </div>
            )}
          </form.Field>
        )}
      </div>
    </div>
  );
};

export default MediaStep;
