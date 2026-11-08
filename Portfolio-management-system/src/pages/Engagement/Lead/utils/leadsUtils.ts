export const navBtn = (_isDark: boolean, type: "secondary" | "primary") => {
  if (type === "secondary") {
    return "px-5 py-2.5 rounded-xl font-medium text-sm transition-all border border-border/60 hover:bg-accent/60 text-foreground active:scale-[0.97] cursor-pointer";
  }
  return "px-5 py-2.5 rounded-xl font-medium text-sm transition-all bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.97] shadow-sm cursor-pointer";
};

export const cardBase = (_isDark: boolean) =>
  "rounded-2xl border border-border/40 p-6 bg-card/75 backdrop-blur-xl shadow-xs";

export const infoItem = (_isDark: boolean) =>
  "flex items-center gap-3 p-4 rounded-xl bg-accent/40 border border-border/30";

export const getStatusColor = (status: string, _isDark: boolean) => {
  const colors: Record<string, string> = {
    New: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/25",
    Contacted:
      "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25",
    Qualified:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25",
    "Proposal Sent":
      "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/25",
    Lost: "bg-destructive/15 text-destructive border border-destructive/25",
    Won: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25",
  };
  return (
    colors[status] ||
    "bg-accent/60 text-muted-foreground border border-border/40"
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

export const btnBase = (_isDark: boolean) =>
  "p-2 rounded-xl transition-all border border-border/40 hover:bg-accent/60 text-muted-foreground hover:text-foreground active:scale-95 disabled:opacity-40";

export const activeBtn = (_isDark: boolean) =>
  "px-3.5 py-1.5 rounded-xl font-semibold text-xs transition-all bg-primary text-primary-foreground shadow-xs active:scale-95";

export const inactiveBtn = (_isDark: boolean) =>
  "px-3.5 py-1.5 rounded-xl font-medium text-xs transition-all border border-border/40 hover:bg-accent/60 text-muted-foreground hover:text-foreground active:scale-95";
