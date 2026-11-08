const baseCard = (_isDark?: boolean) =>
  "relative p-6 sm:p-8 rounded-3xl border border-border/40 bg-card/75 backdrop-blur-xl shadow-xs hover:border-primary/30 transition-all overflow-hidden";

const iconBox = (_isDark?: boolean) =>
  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-primary/10 text-primary border border-primary/20 shadow-xs";

const actionBtn = (_isDark: boolean, type: "edit" | "delete") =>
  `p-2 rounded-xl transition-all cursor-pointer active:scale-95 ${
    type === "edit"
      ? "hover:bg-accent/60 text-muted-foreground hover:text-foreground"
      : "hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
  }`;

export const navBtn = (_isDark: boolean, type: "secondary" | "primary") => {
  if (type === "secondary") {
    return "px-5 py-2.5 rounded-xl font-medium text-sm transition-all border border-border/60 hover:bg-accent/60 text-foreground active:scale-[0.97] cursor-pointer";
  }
  return "px-5 py-2.5 rounded-xl font-medium text-sm transition-all bg-primary hover:bg-primary/90 text-primary-foreground active:scale-[0.97] shadow-sm cursor-pointer";
};

export { baseCard, iconBox, actionBtn };
