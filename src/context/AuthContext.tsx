// context/AuthContext.tsx
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
import { navigationRef } from "../navigation/navigationRef";
import { CommonActions } from "@react-navigation/native";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;

  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;

  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  loadAuthFromStorage: () => Promise<void>; // ← Tambahkan ini
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  login: async () => {},
  logout: async () => {},
  isLoading: true,
  setIsLoading: () => {},
  loadAuthFromStorage: async () => {}, // dummy
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ⭐ loadAuthFromStorage untuk hydration
  const loadAuthFromStorage = async () => {
    setIsLoading(true);
    try {
      const secureToken = await SecureStore.getToken();

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
      console.log("Load Auth Error:", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadAuthFromStorage(); // otomatis load saat mount
  }, []);

  const login = async (token: string) => {
    await SecureStore.saveToken(token);
    setToken(token);
  };

const logout = async () => {
  try {
    // Hapus semua storage & token secara paralel → lebih aman
    await Promise.all([
      SecureStore.removeToken(),
      StorageService.multiRemove([STORAGE_KEYS.THEME, STORAGE_KEYS.NOTIF])
    ]);

    setToken(null);

    // Reset navigation → ke LoginScreen
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  } catch (err) {
    console.log('Logout Error:', err);
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
        loadAuthFromStorage, // ← expose ke hook hydration
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
