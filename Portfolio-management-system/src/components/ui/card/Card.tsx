import * as React from "react";
import utils from "../../../utils";
const { cn } = utils.tailwindUtils;

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "w-full h-full rounded-3xl border bg-card text-card-foreground shadow-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
Card.displayName = "Card";

export default Card;
