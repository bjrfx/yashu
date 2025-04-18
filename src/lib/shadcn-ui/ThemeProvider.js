import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext({ theme: "light", setTheme: () => {} });

export function ThemeProvider({ children, defaultTheme = "light", storageKey = "ui-theme", ...props }) {
  const [theme, setTheme] = useState(() => {
    // Check if localStorage is available (for SSR) and if a theme is stored
    if (typeof window !== "undefined") {
      return localStorage.getItem(storageKey) || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const value = { theme, setTheme };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
