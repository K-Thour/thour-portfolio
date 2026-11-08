import type { StepLabelProps } from "../../../types";

export function StepLabel({
  title,
  description,
  isActive,
}: StepLabelProps) {
  return (
    <div className="mt-2 text-center">
      <p
        className={`text-xs font-semibold ${
          isActive ? "text-foreground font-bold" : "text-muted-foreground"
        }`}
      >
        {title}
      </p>
      {description && (
        <p className="text-[11px] text-muted-foreground/80 hidden sm:block">
          {description}
        </p>
      )}
    </div>
  );
}
