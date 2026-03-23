import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import Button from "../../ui/button/Button";
import { Loader2, AlertTriangle } from "lucide-react";
import utils from "../../../utils";

const { cn } = utils.tailwindUtils;

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  confirmColor?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  isDark?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  confirmColor = "primary",
  isDark = false,
}) => {
  // Map confirmColor to the button variant and styling
  const getButtonStyles = (color: string) => {
    switch (color) {
      case "error":
        return isDark
          ? "bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-500/25"
          : "bg-linear-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white shadow-lg shadow-red-500/25";
      case "success":
        return isDark
          ? "bg-linear-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg shadow-green-500/25"
          : "bg-linear-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white shadow-lg shadow-green-500/25";
      case "warning":
        return isDark
          ? "bg-linear-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white shadow-lg shadow-yellow-500/25"
          : "bg-linear-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-white shadow-lg shadow-yellow-500/25";
      default:
        return isDark
          ? "bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/25"
          : "bg-linear-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white shadow-lg shadow-blue-500/25";
    }
  };

  const getIconColor = () => {
    switch (confirmColor) {
      case "error":
        return isDark ? "text-red-400" : "text-red-500";
      case "success":
        return isDark ? "text-green-400" : "text-green-500";
      case "warning":
        return isDark ? "text-yellow-400" : "text-yellow-500";
      default:
        return isDark ? "text-orange-400" : "text-blue-500";
    }
  };

  const getIconBg = () => {
    switch (confirmColor) {
      case "error":
        return isDark ? "bg-red-500/10" : "bg-red-100";
      case "success":
        return isDark ? "bg-green-500/10" : "bg-green-100";
      case "warning":
        return isDark ? "bg-yellow-500/10" : "bg-yellow-100";
      default:
        return isDark ? "bg-orange-500/10" : "bg-blue-100";
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className={cn(
          "sm:max-w-md",
          isDark
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-slate-200",
        )}
      >
        <DialogHeader className="gap-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                getIconBg(),
              )}
            >
              <AlertTriangle className={cn("w-6 h-6", getIconColor())} />
            </div>
            <div>
              <DialogTitle
                className={cn(
                  "text-lg font-semibold",
                  isDark ? "text-white" : "text-slate-900",
                )}
              >
                {title}
              </DialogTitle>
            </div>
          </div>
          <DialogDescription
            className={cn(
              "text-sm",
              isDark ? "text-slate-400" : "text-slate-500",
            )}
          >
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3 sm:gap-3 mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            disabled={loading}
            className={cn(
              "flex-1",
              isDark &&
                "border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white",
            )}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className={cn("flex-1", getButtonStyles(confirmColor))}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
