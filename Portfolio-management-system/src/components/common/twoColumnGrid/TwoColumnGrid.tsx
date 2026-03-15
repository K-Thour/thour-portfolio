import * as React from "react";
import utils from "../../../utils";
const { cn } = utils.tailwindUtils;

export type TwoColumnGridProps = React.HTMLAttributes<HTMLDivElement>;

const TwoColumnGrid = React.forwardRef<HTMLDivElement, TwoColumnGridProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2 mb-0",
        className,
      )}
      {...props}
    />
  ),
);
TwoColumnGrid.displayName = "TwoColumnGrid";

export default TwoColumnGrid;
