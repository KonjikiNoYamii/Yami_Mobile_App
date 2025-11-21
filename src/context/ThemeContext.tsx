import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { StorageService } from "../storage/storageService";
import { STORAGE_KEYS } from "../storage/storageKeys";

interface ThemeType {
  isDark: boolean;
  toggleTheme: () => void;
  setThemeFromOutside: (mode: "dark" | "light") => void;
  loadThemeFromStorage: () => Promise<void>; // ← WAJIB untuk hydrasi
}

const ThemeContext = createContext<ThemeType>({
  isDark: false,
  toggleTheme: () => {},
  setThemeFromOutside: () => {},
  loadThemeFromStorage: async () => {},
});

export const ThemeProvider = ({ children, initialTheme }: { children: ReactNode, initialTheme: "dark" | "light" }) => {
  const [isDark, setIsDark] = useState(initialTheme === "dark");

  const loadThemeFromStorage = async () => {
    const mode = await StorageService.get<string>(STORAGE_KEYS.THEME);
    if (mode) setIsDark(mode === "dark");
  };

  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDark;
    setIsDark(newMode);
    await StorageService.set(STORAGE_KEYS.THEME, newMode ? "dark" : "light");
  };

  const setThemeFromOutside = (mode: "dark" | "light") => {
    setIsDark(mode === "dark");
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setThemeFromOutside, loadThemeFromStorage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
