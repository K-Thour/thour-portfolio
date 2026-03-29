const baseCard = (isDark: boolean) =>
  `relative p-8 rounded-2xl border ${
    isDark
      ? "bg-slate-800/50 border-red-500/20"
      : "bg-linear-to-br from-white to-blue-50 border-blue-300/40 shadow-lg shadow-blue-500/10"
  }`;

const iconBox = (isDark: boolean) =>
  `w-12 h-12 rounded-xl flex items-center justify-center ${
    isDark
      ? "bg-linear-to-br from-red-600 to-yellow-500"
      : "bg-linear-to-br from-blue-600 to-blue-400 shadow-lg shadow-blue-500/30"
  }`;

const actionBtn = (isDark: boolean, type: "edit" | "delete") =>
  `p-2 rounded-lg ${
    isDark
      ? type === "edit"
        ? "hover:bg-slate-700/50 text-gray-400 hover:text-white"
        : "hover:bg-red-500/20 text-gray-400 hover:text-red-500"
      : type === "edit"
        ? "hover:bg-blue-100 text-gray-600 hover:text-gray-900"
        : "hover:bg-red-100 text-gray-600 hover:text-red-600"
  }`;

export const navBtn = (isDark: boolean, type: "secondary" | "primary") => {
  const base = "px-6 py-3 rounded-xl font-medium transition-all";
  if (type === "secondary") {
    return `${base} ${isDark ? "bg-slate-700/50 text-white hover:bg-slate-700" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`;
  }
  return `${base} hover:scale-105 ${
    isDark
      ? "bg-linear-to-r from-red-600 to-yellow-500 text-white hover:shadow-lg hover:shadow-red-500/50"
      : "bg-linear-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50"
  }`;
};

export { baseCard, iconBox, actionBtn };
