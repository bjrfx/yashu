import * as React from "react";
import { cn } from "../../lib/shadcn-ui/utils";

const Toggle = React.forwardRef(
  ({ className, variant = "default", size = "default", pressed, ...props }, ref) => (
    <button
      ref={ref}
      aria-pressed={pressed}
      data-state={pressed ? "on" : "off"}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors data-[state=on]:bg-accent data-[state=on]:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-transparent hover:bg-muted hover:text-muted-foreground": variant === "default",
          "bg-secondary hover:bg-secondary/80": variant === "outline",
          "h-10 px-3": size === "default",
          "h-9 px-2.5": size === "sm",
          "h-11 px-5": size === "lg",
        },
        className
      )}
      {...props}
    />
  )
);

Toggle.displayName = "Toggle";

export { Toggle };
