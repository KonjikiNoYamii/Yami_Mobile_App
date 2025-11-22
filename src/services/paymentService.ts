
import { Alert } from "react-native";
import { confirmTransaction } from "../utils/transactionConfirm";
import { checkSensor } from "./biometricService";

export async function processPayment(total: number, clearCart: () => void) {
  const status = await checkSensor();

  if (status === "NOT_ENROLLED" || status === "NO_SENSOR") {
    Alert.alert(
      "Metode Alternatif",
      "Gunakan PIN karena biometrik tidak dapat digunakan."
    );
    clearCart();
    return;
  }

  // Sensor OK
  const approved = await confirmTransaction(total);

  if (approved) {
    Alert.alert("Pembayaran Berhasil", "Terima kasih telah berbelanja!");
    clearCart();
  }
}
