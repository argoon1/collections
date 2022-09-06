import React, { useContext } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ContextProviderProps } from "../contextSharedTypes";
import styles from "./themeProvider.module.css";
type Theme = "light" | "dark";
type ThemeContextProviderValue = {
  toogleTheme: () => void;
  theme: Theme;
};
const initialThemeValue = {
  toogleTheme: () => {},
  theme: "light" as Theme,
};
const ThemeContextProvider =
  React.createContext<ThemeContextProviderValue>(initialThemeValue);
export const useTheme = () => useContext(ThemeContextProvider);
export const ThemeProvider = ({ children }: ContextProviderProps) => {
  function toogleTheme() {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  return (
    <ThemeContextProvider.Provider value={{ theme, toogleTheme }}>
      <main className={theme === "dark" ? styles.darkMode : ""}>
        {children}
      </main>
    </ThemeContextProvider.Provider>
  );
};
