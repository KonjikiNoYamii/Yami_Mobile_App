import React, { createContext, useContext, useEffect, useState } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

interface ConnectionContextType {
  isConnected: boolean;
  isInternetReachable: boolean;
  showOfflineBanner: boolean;
}

const ConnectionContext = createContext<ConnectionContextType | null>(null);

export const ConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [isInternetReachable, setIsInternetReachable] = useState(true);
  const [showOfflineBanner, setShowOfflineBanner] = useState(false);

  useEffect(() => {
    const unsub = NetInfo.addEventListener((state: NetInfoState) => {
      const connected = state.isConnected === true;
      const reachable = state.isInternetReachable === true;

      setIsConnected(connected);
      setIsInternetReachable(reachable);

      // Jika koneksi hilang → tampilkan banner
      if (!connected || !reachable) {
        setShowOfflineBanner(true);
      }

      // Jika koneksi pulih → sembunyikan banner + log
      if (connected && reachable) {
        if (showOfflineBanner) {
          console.log("Koneksi pulih. Melanjutkan operasi.");
        }
        setShowOfflineBanner(false);
      }
    });

    return () => unsub();
  }, [showOfflineBanner]);

  return (
    <ConnectionContext.Provider
      value={{ isConnected, isInternetReachable, showOfflineBanner }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => useContext(ConnectionContext)!;
