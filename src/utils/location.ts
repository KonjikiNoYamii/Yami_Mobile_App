import { Platform, PermissionsAndroid, Alert } from "react-native";
import Geolocation, {
  GeolocationResponse,
  GeolocationError,
} from "@react-native-community/geolocation";

// Tipe data koordinat sesuai GeolocationResponse
export type Coordinates = GeolocationResponse["coords"];

// Minta izin lokasi
export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Izin Lokasi",
        message: "Kami butuh lokasi Anda untuk fitur ini",
        buttonPositive: "OK",
        buttonNegative: "Tolak",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // iOS via Info.plist
};

// Ambil lokasi sekali
export const getCurrentLocation = async (): Promise<Coordinates | null> => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    Alert.alert("Izin ditolak", "Lokasi tidak bisa diambil");
    return null;
  }

  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      (position: GeolocationResponse) => resolve(position.coords),
      (error: GeolocationError) => {
        console.log("Error GPS:", error);
        if (error.code === 3) Alert.alert("Periksa koneksi GPS Anda");
        else Alert.alert("Gagal mengambil lokasi", error.message);
        resolve(null);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 60000 }
    );
  });
};

// Mulai live tracking
export const startLiveTracking = (
  onUpdate: (coords: Coordinates) => void
): number | null => {
  try {
    const id = Geolocation.watchPosition(
      (position: GeolocationResponse) => onUpdate(position.coords),
      (error: GeolocationError) => console.log("Error LiveTracking:", error),
      { enableHighAccuracy: true, distanceFilter: 20, interval: 5000 }
    );
    return id;
  } catch (error) {
    console.log("Failed to start tracking:", error);
    return null;
  }
};

// Hentikan live tracking
export const stopLiveTracking = (watchId: number | null) => {
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
  }
};
// Fungsi kirim lokasi ke server
export const sendLocationToServer = async (position: Coordinates) => {
  try {
    // Contoh panggilan fetch POST ke server
    await fetch("https://yourserver.com/api/location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        latitude: position.latitude,
        longitude: position.longitude,
        timestamp: Date.now(),
      }),
    });
    console.log("Lokasi dikirim ke server:", position);
  } catch (err) {
    console.log("Gagal kirim lokasi ke server:", err);
  }
};

// Fungsi ambil lokasi dan kirim ke server
export const getAndSendLocation = async () => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    Alert.alert("Izin ditolak", "Lokasi tidak bisa diambil");
    return;
  }

  // maximumAge: 120000ms = 2 menit
  // Jika lokasi terakhir di-cache masih baru (<2 menit), Geolocation akan pakai data lama
  // sehingga tidak perlu menyalakan GPS baru → hemat baterai dan tidak spam server
  Geolocation.getCurrentPosition(
    (pos: GeolocationResponse) => sendLocationToServer(pos.coords),
    (err: GeolocationError) => console.log("Error GPS saat kirim server:", err),
    { enableHighAccuracy: true, timeout: 30000, maximumAge: 120000 }
  );
};

