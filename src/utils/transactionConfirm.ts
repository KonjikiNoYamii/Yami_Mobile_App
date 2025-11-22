import { simplePrompt } from "@sbaiahmed1/react-native-biometrics";
import { Alert } from "react-native";
import { checkSensor } from "../services/biometricService";

export async function confirmTransaction(amount: number): Promise<boolean> {
  // 1. cek terlebih dahulu apakah biometric siap
  const status = await checkSensor();

  if (status !== "OK") {
    // fallback ke PIN manual atau batalkan
    return false;
  }

  // 2. baru lakukan prompt biometrik
  try {
    const result = await simplePrompt(
      `Konfirmasi Transfer Rp ${amount.toLocaleString("id-ID")}`
    );

    return result.success;
  } catch {
    Alert.alert("Transaksi Dibatalkan");
    return false;
  }
}
