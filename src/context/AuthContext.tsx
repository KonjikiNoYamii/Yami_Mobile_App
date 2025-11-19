import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Alert } from "react-native";

import { StorageService } from "../storage/storageService";
import { STORAGE_KEYS } from "../storage/storageKeys";
import { SecureStore } from "../storage/secureStore";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;

  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  login: async () => {},
  logout: async () => {},
  isLoading: true,
  setIsLoading: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [secureToken] = await Promise.all([
          SecureStore.getToken(),
          StorageService.multiGet([
            STORAGE_KEYS.THEME,
            STORAGE_KEYS.NOTIF,
          ]),
        ]);

        // ⭐ Jika secureToken adalah Error → perangkat mengalami perubahan keamanan
        if (secureToken instanceof Error) {
          const msg = secureToken.message.toLowerCase();

          if (msg.includes("denied") || msg.includes("access")) {
            await SecureStore.forceResetToken();

            Alert.alert(
              "Keamanan Berubah",
              "Keamanan perangkat Anda berubah. Silakan login ulang."
            );

            setToken(null);
            setIsLoading(false);
            return;
          }
        }

        if (secureToken && typeof secureToken === "string") {
          setToken(secureToken);
        }

      } catch (err) {
        console.log("Hybrid Load Error:", err);
      }

      setIsLoading(false);
    };

    loadInitialData();
  }, []);

  const login = async (token: string) => {
    await SecureStore.saveToken(token);
    setToken(token);
  };

  // ⭐ Logout total → aman & sesuai soal
  const logout = async () => {
    try {
      await SecureStore.removeToken(); // hapus Keychain

      await StorageService.multiRemove([
        STORAGE_KEYS.THEME,
        STORAGE_KEYS.NOTIF,
      ]);

      setToken(null);
    } catch (err) {
      console.log("Logout Error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        login,
        logout,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
