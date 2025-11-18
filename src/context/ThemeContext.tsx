import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { StorageService } from "../storage/storageService";
import { STORAGE_KEYS } from "../storage/storageKeys";

interface ThemeType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeType>({
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  // load theme dari storage
  useEffect(() => {
    const loadTheme = async () => {
      const mode = await StorageService.get<string>(STORAGE_KEYS.THEME);
      if (mode) {
        setIsDark(mode === "dark");
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDark;
    setIsDark(newMode);

    await StorageService.set(
      STORAGE_KEYS.THEME,
      JSON.stringify(newMode ? "dark" : "light")
    );
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
