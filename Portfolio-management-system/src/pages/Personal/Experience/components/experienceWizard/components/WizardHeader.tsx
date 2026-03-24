import utils from "../../../../../../utils/index";

const { cn } = utils.tailwindUtils;

interface WizardHeaderProps {
  isDark: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

export const WizardHeader: React.FC<WizardHeaderProps> = ({
  isDark,
  isEditing,
  onCancel,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-b",
        isDark ? "border-slate-700" : "border-slate-200",
      )}
    >
      <h2
        className={cn(
          "text-xl font-bold",
          isDark ? "text-white" : "text-slate-900",
        )}
      >
        {isEditing ? "Edit Experience" : "Add New Experience"}
      </h2>
      <button
        onClick={onCancel}
        className={cn(
          "p-2 rounded-lg transition-colors",
          isDark
            ? "hover:bg-slate-700 text-slate-400"
            : "hover:bg-slate-100 text-slate-500",
        )}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default WizardHeader;
