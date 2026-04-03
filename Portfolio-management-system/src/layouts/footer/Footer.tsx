import * as React from "react";
import utils from "../../utils";

const { cn } = utils.tailwindUtils;

export type FooterProps = React.HTMLAttributes<HTMLElement>;

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => {
    const currentYear = utils.dateUtils.utc.currentYear();

    return (
      <footer
        ref={ref}
        className={cn(
          "bg-background border-t border-border text-left text-sm text-muted-foreground fixed bottom-0 w-full",
          className,
        )}
        {...props}
      >
        <p>
          Copyright &copy; {currentYear} Karanveer Thour Pvt Ltd. All Rights
          Reserved.
        </p>
      </footer>
    );
  },
);
Footer.displayName = "Footer";

export { Footer };
export default Footer;
