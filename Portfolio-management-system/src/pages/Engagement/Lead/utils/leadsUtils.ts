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

export const cardBase = (isDark: boolean) =>
  `rounded-2xl border p-6 ${
    isDark
      ? "bg-slate-800/50 border-red-500/20"
      : "bg-white border-blue-300/40 shadow-lg shadow-blue-500/10"
  }`;

export const infoItem = (isDark: boolean) =>
  `flex items-center gap-3 p-4 rounded-xl ${
    isDark ? "bg-slate-900/50" : "bg-blue-50/50"
  }`;

export const getStatusColor = (status: string, isDark: boolean) => {
  const colors: Record<string, string> = {
    New: isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700",
    Contacted: isDark
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-yellow-100 text-yellow-700",
    Qualified: isDark
      ? "bg-green-500/20 text-green-400"
      : "bg-green-100 text-green-700",
    "Proposal Sent": isDark
      ? "bg-cyan-500/20 text-cyan-400"
      : "bg-cyan-100 text-cyan-700",
    Lost: isDark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700",
    Won: isDark
      ? "bg-emerald-500/20 text-emerald-400"
      : "bg-emerald-100 text-emerald-700",
  };
  return (
    colors[status] ||
    (isDark ? "bg-gray-500/20 text-gray-400" : "bg-gray-100 text-gray-700")
  );
};

export const getPageNumbers = (totalPages: number, currentPage: number) => {
  const pages: (number | string)[] = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    }
  }
  return pages;
};

export const btnBase = (isDark: boolean) =>
  `p-2 rounded-lg transition-all ${
    isDark
      ? "bg-slate-700/50 text-gray-300 hover:bg-slate-600 hover:text-white disabled:opacity-30"
      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 disabled:opacity-40"
  }`;

export const activeBtn = (isDark: boolean) =>
  `px-4 py-2 rounded-lg font-medium transition-all ${
    isDark
      ? "bg-linear-to-r from-red-600 to-yellow-500 text-white"
      : "bg-linear-to-r from-blue-600 to-blue-400 text-white"
  }`;

export const inactiveBtn = (isDark: boolean) =>
  `px-4 py-2 rounded-lg font-medium transition-all ${
    isDark
      ? "bg-slate-700/50 text-gray-300 hover:bg-slate-600"
      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
  }`;
