import axios, { AxiosResponse } from "axios";
import NetInfo from "@react-native-community/netinfo";
import * as Keychain from "react-native-keychain";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 7000,
  headers: { Accept: "application/json" },
});

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
