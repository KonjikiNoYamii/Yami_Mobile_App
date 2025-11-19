import axios, { AxiosResponse } from "axios";
import NetInfo from "@react-native-community/netinfo";
import * as Keychain from "react-native-keychain";

/* ========================================================
   SIMPAN API KEY KE KEYCHAIN
   Dipanggil sekali saat App start
======================================================== */
export async function saveApiKeySecret() {
  try {
    await Keychain.setGenericPassword(
      "api_client",                // username statis
      "API_KEY_SECRET_XYZ",        // API Key rahasia
      { service: "com.ecom:apiKey" }
    );
    console.log("API Key berhasil disimpan.");
    return true;
  } catch (err) {
    console.log("Gagal menyimpan API Key:", err);
    return false;
  }
}

/* ========================================================
   CLIENT AXIOS
======================================================== */
const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 7000,
  headers: { Accept: "application/json" },
});

/* ========================================================
   REQUEST INTERCEPTOR
   - Cek internet
   - Ambil API KEY dari Keychain
   - Set ke header (X-API-Key)
======================================================== */
apiClient.interceptors.request.use(
  async (config) => {
    // Check internet
    const netState = await NetInfo.fetch();
    if (!netState.isConnected || !netState.isInternetReachable) {
      return Promise.reject(new Error("Tidak ada koneksi internet"));
    }

    // Ambil API Key dari Keychain
    const apiKey = await Keychain.getGenericPassword({
      service: "com.ecom:apiKey",
    });

    if (!apiKey) {
      return Promise.reject({
        type: "API_KEY_MISSING",
        message: "API Key tidak ditemukan. Unauthorized.",
        status: 401,
      });
    }

    // Tambahkan ke header
    config.headers["X-API-Key"] = apiKey.password;
    config.headers["X-Client-Platform"] = "React-Native";

    return config;
  },
  (error) => Promise.reject(error)
);

/* ========================================================
   RESPONSE INTERCEPTOR
   - Validasi error 400
   - Timeout
   - Simulated token untuk login
======================================================== */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Untuk simulasi login
    if (response.config.url?.includes("/auth/login") && response.status === 200) {
      const modifiedResponse: AxiosResponse = {
        ...response,
        data: { success: true, token: "simulated_token_xyz" },
      };
      return modifiedResponse;
    }

    return response;
  },
  (error) => {
    // Validation error
    if (error.response?.status === 400) {
      return Promise.reject({
        type: "VALIDATION_ERROR",
        errors: error.response.data?.errors || {},
      });
    }

    // Timeout
    if (error.code === "ECONNABORTED") {
      error.message = "Permintaan timeout. Silakan coba lagi.";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
