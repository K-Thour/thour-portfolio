import type { ConnectorLineProps } from "../../../types";

export function ConnectorLine({ isCompleted }: ConnectorLineProps) {
  return (
    <div
      className={`h-0.5 flex-1 mx-2 mb-12 transition-colors ${
        isCompleted ? "bg-emerald-500/40" : "bg-border/60"
      }`}
    />
  );
}
