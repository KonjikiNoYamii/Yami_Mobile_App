import * as Keychain from "react-native-keychain";

export async function resetSensitiveData() {
  try {
    await Keychain.resetGenericPassword({ service: "com.ecom:apiKey" });
  } catch (err) {
    console.log("Gagal reset Keychain:", err);
  }
}
