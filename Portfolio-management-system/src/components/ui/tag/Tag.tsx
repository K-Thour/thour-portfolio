import * as React from "react";
import utils from "../../../utils";
const { cn } = utils.tailwindUtils;

export type TagProps = React.HTMLAttributes<HTMLDivElement>;

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className,
      )}
      {...props}
    />
  ),
);
Tag.displayName = "Tag";

export default Tag;
