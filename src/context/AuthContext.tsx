import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { StorageService } from "../storage/storageService";
import { STORAGE_KEYS } from "../storage/storageKeys";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  login: async () => {},
  logout: async () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ⬇️ Load awal pakai MULTI-GET
  useEffect(() => {
    const loadStartupData = async () => {
      const result = await StorageService.multiGet([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.THEME,
        STORAGE_KEYS.NOTIF,
      ]);

      const savedToken = result[STORAGE_KEYS.AUTH_TOKEN];

      if (savedToken) {
        setToken(JSON.parse(savedToken));
        setIsLoggedIn(true);
      }

      setIsLoading(false);
    };

    loadStartupData();
  }, []);

  // ⬇️ Login
  const login = async (newToken: string) => {
    await StorageService.multiSet({
      [STORAGE_KEYS.AUTH_TOKEN]: JSON.stringify(newToken),
    });

    setToken(newToken);
    setIsLoggedIn(true);
  };

  // ⬇️ Logout
  const logout = async () => {
    await StorageService.multiRemove([STORAGE_KEYS.AUTH_TOKEN]);
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
