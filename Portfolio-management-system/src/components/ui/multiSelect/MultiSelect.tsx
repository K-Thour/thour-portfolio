import * as React from "react";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useEffect, useRef, useState, useCallback, forwardRef } from "react";
import utils from "../../../utils";
import Button from "../button/Button";

const { cn } = utils.tailwindUtils;

export interface MultiselectProps extends React.HTMLAttributes<HTMLDivElement> {
  Heading: string;
}

const Multiselect = forwardRef<HTMLDivElement, MultiselectProps>(
  ({ className, Heading, children, ...props }, ref) => {
    const [selectorOpened, setSelectorOpened] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const hideSelector = useCallback((e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setSelectorOpened(false);
      }
    }, []);

    useEffect(() => {
      document.addEventListener("mousedown", hideSelector);
      return () => {
        document.removeEventListener("mousedown", hideSelector);
      };
    }, [hideSelector]);

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <Button
          ref={buttonRef}
          type="button"
          className="w-full h-full p-3 border border-input rounded-md shadow-sm text-sm bg-background flex justify-between items-center cursor-pointer hover:ring-2 hover:ring-ring hover:font-medium transition-all"
          onClick={() => setSelectorOpened((prev) => !prev)}
          role="button"
          aria-expanded={selectorOpened}
        >
          <span className="text-md font-medium">{Heading}</span>
          {!selectorOpened ? (
            <ArrowBigUp className="size-4" />
          ) : (
            <ArrowBigDown className="size-4" />
          )}
        </Button>

        {selectorOpened && (
          <div
            ref={menuRef}
            className="absolute w-full h-auto p-4 border bg-popover text-popover-foreground mt-1 rounded-lg shadow-md z-50 animate-in fade-in-0 zoom-in-95"
          >
            {children}
          </div>
        )}
      </div>
    );
  },
);
Multiselect.displayName = "Multiselect";

export default Multiselect;
