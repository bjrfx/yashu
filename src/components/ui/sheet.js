import * as React from "react";
import { cn } from "../../lib/shadcn-ui/utils";
import { motion } from "framer-motion";

const Sheet = ({ children, open, onClose }) => {
  // Close sheet on escape key press
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  
  // Prevent scroll on body when sheet is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        className="fixed right-0 top-0 h-full w-[85%] max-w-md bg-background p-6 shadow-lg"
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M18 6L6 18"></path>
                <path d="M6 6l12 12"></path>
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </motion.div>
    </div>
  );
};

export { Sheet };
