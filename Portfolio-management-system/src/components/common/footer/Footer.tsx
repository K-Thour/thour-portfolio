import * as React from "react";
import utils from "../../../utils/index";

const { cn } = utils.tailwindUtils;

export type FooterProps = React.HTMLAttributes<HTMLElement>;

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => {
    const currentYear = utils.dateUtils.utc.currentYear();

    return (
      <footer
        ref={ref}
        className={cn(
          "bg-white dark:bg-gray-900 border-t text-left text-sm text-gray-500 dark:text-gray-300",
          className,
        )}
        {...props}
      >
        <p>
          Copyright &copy; {currentYear} DevRonins Pvt Ltd. All Rights Reserved.
        </p>
      </footer>
    );
  },
);
Footer.displayName = "Footer";

export { Footer };
export default Footer;
