import { useEffect, useState } from "react";
import NetInfo, { NetInfoStateType } from "@react-native-community/netinfo";

interface NetInfoData {
  isOnline: boolean;
  connectionType: NetInfoStateType | "unknown";
}

export const useNetInfo = (): NetInfoData => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [connectionType, setConnectionType] = useState<NetInfoStateType | "unknown">("unknown");

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(!!state.isConnected && !!state.isInternetReachable);
      setConnectionType(state.type || "unknown");
    });

    // Fetch awal
    NetInfo.fetch().then((state) => {
      setIsOnline(!!state.isConnected && !!state.isInternetReachable);
      setConnectionType(state.type || "unknown");
    });

    return () => unsubscribe();
  }, []);

  return { isOnline, connectionType };
};
