import { Check, Copy, ExternalLink, Pencil, Trash2 } from "lucide-react";
import type { ActionButtonsProps } from "../../types";

export function ActionButtons({
  url,
  isCopied,
  onCopy,
  onEdit,
  onDelete,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onCopy}
        aria-label={isCopied ? "Copied to clipboard" : "Copy portfolio link"}
        className={`p-2 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer ${
          isCopied
            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
        }`}
        title={isCopied ? "Copied!" : "Copy URL"}
      >
        {isCopied ? (
          <Check className="w-4 h-4 text-emerald-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open portfolio in new tab"
        className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 active:scale-95 cursor-pointer"
        title="Open Link"
      >
        <ExternalLink className="w-4 h-4" />
      </a>

      <button
        type="button"
        onClick={onEdit}
        aria-label="Edit portfolio"
        className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-200 active:scale-95 cursor-pointer"
        title="Edit"
      >
        <Pencil className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete portfolio"
        className="p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 active:scale-95 cursor-pointer"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

