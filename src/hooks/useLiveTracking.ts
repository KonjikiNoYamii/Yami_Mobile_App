import { useState, useEffect, useCallback } from "react";
import { Coordinates, sendLocationToServer, startLiveTracking, stopLiveTracking } from "../utils/location";


export const useLiveTracking = () => {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  const onUpdate = useCallback((position: Coordinates) => {
    setCoords(position);
    sendLocationToServer(position); // otomatis kirim ke server saat update
  }, []);

  const start = () => {
    if (isTracking) return;
    const id = startLiveTracking(onUpdate);
    setWatchId(id);
    setIsTracking(true);
  };

  const stop = () => {
    if (!isTracking) return;
    stopLiveTracking(watchId);
    setWatchId(null);
    setIsTracking(false);
  };

  // Cleanup saat hook unmount
  useEffect(() => {
    return () => stop();
  }, []);

  return { coords, start, stop, isTracking };
};
