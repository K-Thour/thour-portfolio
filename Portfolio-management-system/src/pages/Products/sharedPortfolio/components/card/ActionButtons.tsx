import { Copy, ExternalLink, Pencil, Trash2 } from "lucide-react";
import type { ActionButtonsProps } from "../../types";

export function ActionButtons({
  url,
  isDark,
  isCopied,
  onCopy,
  onEdit,
  onDelete,
}: ActionButtonsProps) {
  const btnClass = (type: "copy" | "link" | "edit" | "delete") => {
    const base =
      "p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95";
    if (type === "copy") {
      return `${base} ${isCopied ? (isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600") : isDark ? "hover:bg-slate-700 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"}`;
    }
    if (type === "link") {
      return `${base} ${isDark ? "hover:bg-blue-500/20 text-gray-400 hover:text-blue-400" : "hover:bg-blue-50 text-gray-600 hover:text-blue-600"}`;
    }
    if (type === "edit") {
      return `${base} ${isDark ? "hover:bg-yellow-500/20 text-gray-400 hover:text-yellow-400" : "hover:bg-yellow-50 text-gray-600 hover:text-yellow-600"}`;
    }
    return `${base} ${isDark ? "hover:bg-red-500/20 text-gray-400 hover:text-red-400" : "hover:bg-red-50 text-gray-600 hover:text-red-600"}`;
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onCopy}
        className={btnClass("copy")}
        title={isCopied ? "Copied!" : "Copy URL"}
      >
        <Copy className={`w-4 h-4 ${isCopied ? "scale-110" : ""}`} />
      </button>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass("link")}
        title="Open Link"
      >
        <ExternalLink className="w-4 h-4" />
      </a>
      <button onClick={onEdit} className={btnClass("edit")} title="Edit">
        <Pencil className="w-4 h-4" />
      </button>
      <button onClick={onDelete} className={btnClass("delete")} title="Delete">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
