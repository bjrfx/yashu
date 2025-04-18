import * as React from "react";
import { cn } from "../../lib/shadcn-ui/utils";

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = "Select";

const SelectGroup = React.forwardRef(({ className, ...props }, ref) => {
  return <optgroup ref={ref} className={cn("", className)} {...props} />;
});
SelectGroup.displayName = "SelectGroup";

const SelectOption = React.forwardRef(({ className, ...props }, ref) => {
  return <option ref={ref} className={cn("", className)} {...props} />;
});
SelectOption.displayName = "SelectOption";

export { Select, SelectGroup, SelectOption };
