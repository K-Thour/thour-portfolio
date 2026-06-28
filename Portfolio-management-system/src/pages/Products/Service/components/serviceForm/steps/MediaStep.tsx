import React, { useState, useEffect } from "react";
import { Upload, Link2, Loader2, Library, CheckCircle2 } from "lucide-react";

import utils from "../../../../../../utils";
import { serviceMediaSchema } from "../../../../../../validations/service";
import { ImageCropperModal } from "../../../../../../components/common/imageCropper/ImageCropperModal";
import { uploadImage, fetchServices } from "../../../../../../services/api";

import { useStore } from "@tanstack/react-form";

const { cn } = utils.tailwindUtils;

interface MediaStepProps {
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
    (state: any) => state.values.iconType || "library",
  );

  const [photoCropperOpen, setPhotoCropperOpen] = useState(false);
  const [photoSrcImage, setPhotoSrcImage] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);

  const [iconCropperOpen, setIconCropperOpen] = useState(false);
  const [iconSrcImage, setIconSrcImage] = useState("");
  const [iconUploading, setIconUploading] = useState(false);

  // Library of previously uploaded service icons
  const [libraryIcons, setLibraryIcons] = useState<
    { url: string; name: string }[]
  >([]);
  const [libraryLoading, setLibraryLoading] = useState(false);

  useEffect(() => {
    // Fetch existing service icons for the library picker
    setLibraryLoading(true);
    fetchServices()
      .then((list: any[]) => {
        const icons = list
          .filter(
            (s) =>
              s.iconUrl?.url &&
              !s.iconUrl.publicId?.startsWith("emoji:") &&
              s.iconUrl.url !== "https://placehold.co/100",
          )
          .map((s) => ({ url: s.iconUrl.url, name: s.name || "Service" }))
          // deduplicate by url
          .filter(
            (item, idx, arr) =>
              arr.findIndex((a) => a.url === item.url) === idx,
          );
        setLibraryIcons(icons);
      })
      .catch(() => {})
      .finally(() => setLibraryLoading(false));
  }, []);

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

        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Library tab */}
          <button
            type="button"
            onClick={() => {
              form.setFieldValue("iconType", "library");
              form.setFieldValue("icon", "");
              form.setFieldValue("iconFile", undefined);
            }}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-xl border-2 font-medium transition-all text-xs",
              iconType === "library"
                ? isDark
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-blue-500 bg-blue-100 text-gray-900"
                : isDark
                  ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                  : "border-gray-300 text-gray-600 hover:border-blue-400",
            )}
          >
            <Library className="w-4 h-4" />
            Library
          </button>

          {/* URL tab */}
          <button
            type="button"
            onClick={() => {
              form.setFieldValue("iconType", "url");
              form.setFieldValue("icon", "");
              form.setFieldValue("iconFile", undefined);
            }}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-xl border-2 font-medium transition-all text-xs",
              iconType === "url"
                ? isDark
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-blue-500 bg-blue-100 text-gray-900"
                : isDark
                  ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                  : "border-gray-300 text-gray-600 hover:border-blue-400",
            )}
          >
            <Link2 className="w-4 h-4" />
            URL
          </button>

          {/* Upload tab */}
          <button
            type="button"
            onClick={() => {
              form.setFieldValue("iconType", "upload");
              form.setFieldValue("icon", "");
              form.setFieldValue("iconUrl", "");
            }}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-xl border-2 font-medium transition-all text-xs",
              iconType === "upload"
                ? isDark
                  ? "border-red-500 bg-red-500/20 text-white"
                  : "border-blue-500 bg-blue-100 text-gray-900"
                : isDark
                  ? "border-slate-700 text-gray-400 hover:border-red-500/50"
                  : "border-gray-300 text-gray-600 hover:border-blue-400",
            )}
          >
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>

        {/* ── Icon Library picker ───────────────────────── */}
        {iconType === "library" && (
          <form.Field name="iconUrl">
            {(field: any) => (
              <div>
                {libraryLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2
                      className={cn(
                        "w-8 h-8 animate-spin",
                        isDark ? "text-red-500" : "text-blue-500",
                      )}
                    />
                  </div>
                ) : libraryIcons.length === 0 ? (
                  <div
                    className={cn(
                      "text-center py-8 rounded-xl border-2 border-dashed",
                      isDark
                        ? "border-slate-700 text-gray-500"
                        : "border-gray-300 text-gray-400",
                    )}
                  >
                    <Library className="w-10 h-10 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No uploaded icons found yet.</p>
                    <p className="text-xs mt-1">
                      Upload an icon on another service first.
                    </p>
                  </div>
                ) : (
                  <>
                    <p
                      className={cn(
                        "text-xs mb-3",
                        isDark ? "text-gray-400" : "text-gray-500",
                      )}
                    >
                      Select an icon from previously uploaded service icons:
                    </p>
                    <div className="grid grid-cols-5 gap-3 max-h-56 overflow-y-auto pr-1">
                      {libraryIcons.map((item) => {
                        const isSelected = field.state.value === item.url;
                        return (
                          <button
                            key={item.url}
                            type="button"
                            title={item.name}
                            onClick={() => {
                              field.handleChange(item.url);
                              form.setFieldValue("iconUrl", item.url);
                            }}
                            className={cn(
                              "relative aspect-square rounded-xl border-2 overflow-hidden transition-all hover:scale-105",
                              isSelected
                                ? isDark
                                  ? "border-red-500 ring-2 ring-red-500/40"
                                  : "border-blue-500 ring-2 ring-blue-500/30"
                                : isDark
                                  ? "border-slate-700 hover:border-red-500/50"
                                  : "border-gray-200 hover:border-blue-400",
                            )}
                          >
                            <img
                              src={item.url}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            {isSelected && (
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-white drop-shadow" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {field.state.value && (
                      <div
                        className={cn(
                          "mt-3 flex items-center gap-3 p-3 rounded-xl border",
                          isDark
                            ? "bg-slate-900/50 border-red-500/20"
                            : "bg-gray-50 border-gray-300",
                        )}
                      >
                        <img
                          src={field.state.value}
                          alt="Selected icon"
                          className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                        />
                        <p
                          className={cn(
                            "text-xs truncate",
                            isDark ? "text-gray-400" : "text-gray-600",
                          )}
                        >
                          Selected: {field.state.value.split("/").pop()}
                        </p>
                      </div>
                    )}
                  </>
                )}
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
