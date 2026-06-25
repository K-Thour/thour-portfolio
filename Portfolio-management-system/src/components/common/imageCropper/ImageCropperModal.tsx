import React, { useState, useRef } from "react";
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { motion, AnimatePresence } from "motion/react";
import { Crop as CropIcon, X, Check } from "lucide-react";
import utils from "../../../utils";

const { cn } = utils.tailwindUtils;

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string;
  isDark: boolean;
  onClose: () => void;
  onCropComplete: (croppedBase64: string) => void;
  title?: string;
  defaultCircular?: boolean;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imageSrc,
  isDark,
  onClose,
  onCropComplete,
  title = "Crop Image",
  defaultCircular = false,
}) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [aspect, setAspect] = useState<number | undefined>(
    defaultCircular ? 1 : undefined,
  );
  const [circular, setCircular] = useState<boolean>(defaultCircular);
  const imgRef = useRef<HTMLImageElement>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    let initialCrop: Crop;
    if (aspect) {
      initialCrop = centerAspectCrop(width, height, aspect);
    } else {
      initialCrop = {
        unit: "%",
        x: 10,
        y: 10,
        width: 80,
        height: 80,
      };
    }
    setCrop(initialCrop);
    setCompletedCrop({
      unit: "px",
      x: ((initialCrop.x ?? 10) * width) / 100,
      y: ((initialCrop.y ?? 10) * height) / 100,
      width: ((initialCrop.width ?? 80) * width) / 100,
      height: ((initialCrop.height ?? 80) * height) / 100,
    });
  };

  const handleAspectToggle = (type: "free" | "square" | "circle") => {
    if (type === "free") {
      setAspect(undefined);
      setCircular(false);
      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const initialCrop: Crop = {
          unit: "%",
          x: 10,
          y: 10,
          width: 80,
          height: 80,
        };
        setCrop(initialCrop);
        setCompletedCrop({
          unit: "px",
          x: (initialCrop.x! * width) / 100,
          y: (initialCrop.y! * height) / 100,
          width: (initialCrop.width! * width) / 100,
          height: (initialCrop.height! * height) / 100,
        });
      }
    } else if (type === "square" || type === "circle") {
      const isCircle = type === "circle";
      setAspect(1);
      setCircular(isCircle);
      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const initialCrop = centerAspectCrop(width, height, 1);
        setCrop(initialCrop);
        setCompletedCrop({
          unit: "px",
          x: (initialCrop.x! * width) / 100,
          y: (initialCrop.y! * height) / 100,
          width: (initialCrop.width! * width) / 100,
          height: (initialCrop.height! * height) / 100,
        });
      }
    }
  };

  const generateCrop = async () => {
  if (!imgRef.current || !completedCrop) return;

  const image = imgRef.current;

  // Scale between displayed image and original image
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Create a high-resolution canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  // Canvas size should match the ORIGINAL crop size
  canvas.width = Math.floor(completedCrop.width * scaleX);
  canvas.height = Math.floor(completedCrop.height * scaleY);

  // High quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Transparent background for circular crop
  if (circular) {
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      Math.min(canvas.width, canvas.height) / 2,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.clip();
  }

  // Draw cropped image in ORIGINAL resolution
  ctx.drawImage(
    image,
    completedCrop.x * scaleX,
    completedCrop.y * scaleY,
    completedCrop.width * scaleX,
    completedCrop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  );

  // Export with maximum JPEG quality
  const base64Image = canvas.toDataURL("image/jpeg", 1.0);

  onCropComplete(base64Image);
  onClose();
};

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className={cn(
            "absolute inset-0 backdrop-blur-sm",
            isDark ? "bg-black/60" : "bg-black/40",
          )}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={cn(
            "relative z-10 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]",
            isDark
              ? "bg-slate-800 border border-slate-700 text-white"
              : "bg-white border border-slate-200 text-slate-900",
          )}
        >
          {/* Header */}
          <div
            className={cn(
              "px-6 py-4 border-b flex items-center justify-between shrink-0",
              isDark ? "border-slate-700" : "border-slate-200",
            )}
          >
            <div className="flex items-center gap-2">
              <CropIcon
                className={cn(
                  "w-5 h-5",
                  isDark ? "text-red-500" : "text-blue-500",
                )}
              />
              <h2 className="text-lg font-bold">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                isDark
                  ? "hover:bg-slate-700 text-gray-400 hover:text-white"
                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-900",
              )}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center min-h-[300px]">
            <div className="max-w-full max-h-[45vh] overflow-hidden rounded-lg border border-slate-600/30 flex items-center justify-center bg-black/5">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                circularCrop={circular}
                style={{ maxHeight: "45vh" }}
              >
                <img
                  ref={imgRef}
                  src={imageSrc}
                  alt="Source"
                  onLoad={onImageLoad}
                  crossOrigin="anonymous"
                  style={{ maxHeight: "45vh" }}
                  className="block max-w-full w-auto h-auto"
                />
              </ReactCrop>
            </div>

            {/* Controls */}
            <div className="w-full mt-6 flex flex-col gap-4">
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAspectToggle("free")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                    !aspect && !circular
                      ? isDark
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-blue-500 border-blue-500 text-white"
                      : isDark
                        ? "border-slate-700 text-gray-300 hover:bg-slate-700"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50",
                  )}
                >
                  Free Form
                </button>
                <button
                  type="button"
                  onClick={() => handleAspectToggle("square")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                    aspect === 1 && !circular
                      ? isDark
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-blue-500 border-blue-500 text-white"
                      : isDark
                        ? "border-slate-700 text-gray-300 hover:bg-slate-700"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50",
                  )}
                >
                  Square (1:1)
                </button>
                <button
                  type="button"
                  onClick={() => handleAspectToggle("circle")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                    circular
                      ? isDark
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-blue-500 border-blue-500 text-white"
                      : isDark
                        ? "border-slate-700 text-gray-300 hover:bg-slate-700"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50",
                  )}
                >
                  Circle Mask
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className={cn(
              "px-6 py-4 border-t flex justify-end gap-3 shrink-0",
              isDark
                ? "border-slate-700 bg-slate-800/80"
                : "border-slate-200 bg-gray-50",
            )}
          >
            <button
              onClick={onClose}
              className={cn(
                "px-4 py-2 text-sm font-semibold rounded-xl border transition-all",
                isDark
                  ? "border-slate-700 text-gray-300 hover:bg-slate-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100",
              )}
            >
              Cancel
            </button>
            <button
              onClick={generateCrop}
              disabled={!completedCrop?.width || !completedCrop?.height}
              className={cn(
                "px-4 py-2 text-sm font-semibold rounded-xl flex items-center gap-1.5 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed",
                isDark
                  ? "bg-linear-to-r from-red-600 to-yellow-500 hover:shadow-lg hover:shadow-red-500/30"
                  : "bg-linear-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/30",
              )}
            >
              <Check className="w-4 h-4" />
              Apply Crop
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ImageCropperModal;
