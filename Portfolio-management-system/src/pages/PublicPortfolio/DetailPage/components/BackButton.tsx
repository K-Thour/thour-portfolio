import { ArrowLeft } from "lucide-react";
interface BackButtonProps {
  isDark: boolean;
}

export function BackButton({ isDark }: BackButtonProps) {
  return (
    <button
      onClick={() => window.history.back()}
      className={`flex items-center gap-2 my-10 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
        isDark
          ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
          : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
      }`}
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>
  );
}
