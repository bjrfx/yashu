import * as React from "react";
import { cn } from "../../lib/shadcn-ui/utils";

const DropdownMenu = ({ children, open, onOpenChange }) => {
  return (
    <div className="relative">{children}</div>
  );
};

const DropdownMenuTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("flex items-center justify-center", className)}
    {...props}
  />
));
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef(
  ({ className, open, ...props }, ref) => {
    if (!open) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
          className
        )}
        {...props}
      />
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
