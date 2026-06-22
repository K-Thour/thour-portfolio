import React, { useState } from "react";

import { Upload, Link2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import utils from "../../../../../../utils";
import { projectBasicInfoSchema } from "../../../../../../validations/project";
import { ImageCropperModal } from "../../../../../../components/common/imageCropper/ImageCropperModal";
import { uploadImage } from "../../../../../../services/api";

const { cn } = utils.tailwindUtils;

interface BasicInfoStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  isDark: boolean;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  form,
  isDark,
}) => {
  const [cropperOpen, setCropperOpen] = useState(false);
  const [srcImage, setSrcImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageType, setImageType] = useState<"url" | "file">("url");

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
      field.handleChange(res.url);
    } catch (err) {
      console.error("Failed to upload image:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }: { value: string }) => {
            try {
              projectBasicInfoSchema.validateSyncAt("title", { title: value });
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
                "block text-sm font-medium mb-2",
                isDark ? "text-gray-300" : "text-gray-800",
              )}
            >
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500",
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? "border-red-500"
                  : "",
              )}
              placeholder="AI Code Assistant"
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="subtitle"
        validators={{
          onChange: ({ value }: { value: string }) => {
            try {
              projectBasicInfoSchema.validateSyncAt("subtitle", {
                subtitle: value,
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
                "block text-sm font-medium mb-2",
                isDark ? "text-gray-300" : "text-gray-800",
              )}
            >
              Subtitle <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white placeholder:text-gray-500 focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500",
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? "border-red-500"
                  : "",
              )}
              placeholder="AI & Automation"
            />
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="category"
        validators={{
          onChange: ({ value }: { value: string }) => {
            try {
              projectBasicInfoSchema.validateSyncAt("category", {
                category: value,
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
                "block text-sm font-medium mb-2",
                isDark ? "text-gray-300" : "text-gray-800",
              )}
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                isDark
                  ? "bg-slate-900/50 border-red-500/20 text-white focus:border-red-500"
                  : "bg-white border-blue-300/50 text-gray-900 focus:border-blue-500 focus:ring-blue-500",
                field.state.meta.isTouched && field.state.meta.errors.length > 0
                  ? "border-red-500"
                  : "",
              )}
            >
              <option value="">Select a category</option>
              <option value="AI & Automation">AI & Automation</option>
              <option value="Web Application">Web Application</option>
              <option value="Mobile App">Mobile App</option>
              <option value="DevOps & Monitoring">DevOps & Monitoring</option>
              <option value="E-commerce">E-commerce</option>
            </select>
            {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 && (
                <p className="text-red-500 text-sm mt-1">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
          </div>
        )}
      </form.Field>

      <form.Field name="image">
        {(field: any) => {
          const imageVal = field.state.value || "";
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

              <label
                className={cn(
                  "block text-sm font-medium mb-2",
                  isDark ? "text-gray-300" : "text-gray-800",
                )}
              >
                Project Image
              </label>

              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setImageType("url")}
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
                  onClick={() => setImageType("file")}
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
                    value={imageVal}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 transition-all",
                      isDark
                        ? "bg-slate-900/50 border-red-500/20 text-white focus:ring-red-500"
                        : "bg-white border-blue-300/50 text-gray-900 focus:ring-blue-500 focus:ring-blue-500",
                      hasError ? "border-red-500" : "",
                    )}
                    placeholder="https://example.com/project-image.jpg"
                  />
                  {imageVal && (
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
                        src={imageVal}
                        alt="Project preview"
                        className="max-h-48 object-cover rounded-xl mx-auto"
                      />
                    </div>
                  )}
                </div>
              ) : (
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
                      Click to upload project photo
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
                  {imageVal && (
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
                        src={imageVal}
                        alt="Project preview"
                        className="max-h-48 object-cover rounded-xl mx-auto"
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
                title="Crop Project Image"
                defaultCircular={false}
              />
            </div>
          );
        }}
      </form.Field>
    </div>
  );
};

export default BasicInfoStep;
