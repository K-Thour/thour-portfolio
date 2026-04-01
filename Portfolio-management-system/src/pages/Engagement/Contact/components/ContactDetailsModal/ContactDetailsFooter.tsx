interface ContactDetailsFooterProps {
  isDark: boolean;
  onClose: () => void;
}

export function ContactDetailsFooter({
  isDark,
  onClose,
}: ContactDetailsFooterProps) {
  return (
    <div
      className={`sticky bottom-0 px-8 py-4 border-t ${
        isDark
          ? "bg-slate-900/95 border-red-500/20 backdrop-blur-sm"
          : "bg-white/95 border-blue-300/40 backdrop-blur-sm"
      }`}
    >
      <button
        onClick={onClose}
        className={`w-full px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
          isDark
            ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
            : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
        }`}
      >
        Close
      </button>
    </div>
  );
}
