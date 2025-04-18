import * as React from "react";
import { cn } from "../../lib/shadcn-ui/utils";
import { Link } from "react-router-dom";

const NavigationMenu = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        "relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
        {children}
      </ul>
    </nav>
  )
);
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("relative", className)} {...props} />
));
NavigationMenuItem.displayName = "NavigationMenuItem";

const NavigationMenuLink = React.forwardRef(
  ({ className, active, ...props }, ref) => (
    <Link
      ref={ref}
      className={cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
        { "bg-accent text-accent-foreground": active },
        className
      )}
      {...props}
    />
  )
);
NavigationMenuLink.displayName = "NavigationMenuLink";

export { NavigationMenu, NavigationMenuItem, NavigationMenuLink };
