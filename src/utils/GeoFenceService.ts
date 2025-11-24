import Geolocation from "@react-native-community/geolocation";
import { Alert } from "react-native";

// Tipe data koordinat
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Hitung jarak (Haversine formula) dalam meter
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371000; // radius bumi dalam meter
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // jarak dalam meter
};

// Mulai geofencing
export const startGeoFence = (
  toko: Coordinates,
  onPromoDetected?: () => void
): number | null => {
  try {
    const watchId = Geolocation.watchPosition(
      (pos) => {
        const userPos = pos.coords;
        const distance = calculateDistance(userPos.latitude, userPos.longitude, toko.latitude, toko.longitude);
        console.log("Jarak ke toko:", distance);

        if (distance < 100) { // radius 100 meter
          Alert.alert("PROMO DEKAT TOKO!");
          if (onPromoDetected) onPromoDetected();
          Geolocation.clearWatch(watchId); // matikan tracking
        }
      },
      (err) => console.log("Error GeoFence:", err),
      { enableHighAccuracy: true, distanceFilter: 50 } // update setiap 50 meter
    );

    return watchId;
  } catch (error) {
    console.log("Failed to start GeoFence:", error);
    return null;
  }
};

// Hentikan geofencing
export const stopGeoFence = (watchId: number | null) => {
  if (watchId !== null) Geolocation.clearWatch(watchId);
};
