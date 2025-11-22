import { isSensorAvailable, simplePrompt } from "@sbaiahmed1/react-native-biometrics";
import { Alert } from "react-native";
import { resetSensitiveData } from "../storage/keychain";
import { navigationRef } from "../navigation/navigationRef";

export async function getBiometryType(): Promise<"FaceID" | "TouchID" | "None"> {
  const info = await isSensorAvailable();

  if (!info.available) return "None";

  if (info.biometryType === "FaceID") return "FaceID";

  return "TouchID"; 
}

export async function checkSensor() {
  const info = await isSensorAvailable();

  if (!info.available) {
    if (info.error === "NotEnrolled") {
      Alert.alert(
        "Sidik Jari Belum Terdaftar",
        "Silakan daftarkan sidik jari di pengaturan HP."
      );
      return "NOT_ENROLLED";
    }

    return "NO_SENSOR";
  }

  return "OK";
}

export async function biometricPrompt(message: string) {
  try {
    const result = await simplePrompt(message);
    return { success: result.success };
  } catch (e: any) {
    if (e.message?.includes("Lockout") || e.errorCode === "BIOMETRIC_LOCKOUT") {
      await resetSensitiveData();
      Alert.alert("Keamanan", "Sensor terkunci. Anda akan logout.");

      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });

      return { success: false, locked: true };
    }

    return { success: false };
  }
}
