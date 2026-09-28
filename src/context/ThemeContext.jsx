import { createContext, useContext, useEffect, useState } from "react";
import { load, save } from "../utils/storage";

const ThemeContext = createContext({ theme: "dark", toggle: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => load("gel-theme", "dark"));
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    save("gel-theme", theme);
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
