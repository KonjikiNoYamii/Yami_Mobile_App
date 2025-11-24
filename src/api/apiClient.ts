// api/apiClient.ts
import axios, { AxiosResponse } from "axios";
import NetInfo from "@react-native-community/netinfo";
import * as Keychain from "react-native-keychain";
import { generateApiKey } from "../utils/apiKeyGenerator";

const KEYCHAIN_SERVICE = "com.ecom:apiKey";

export const saveApiKeySecret = async () => {
  const existing = await Keychain.getGenericPassword({ service: KEYCHAIN_SERVICE });
  if (!existing) {
    const newKey = generateApiKey();
    await Keychain.setGenericPassword("API_KEY", newKey, {
      service: KEYCHAIN_SERVICE,
    });
  }
};

export const initApiKey = async () => {
  try {
    await saveApiKeySecret();
  } catch (e) {
    console.log("Init API Key failed:", e);
  }
};

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 7000,
  headers: { Accept: "application/json" },
});

apiClient.interceptors.request.use(
  async (config) => {
    const net = await NetInfo.fetch();
    if (!net.isConnected || !net.isInternetReachable)
      return Promise.reject(new Error("Tidak ada koneksi internet"));

    const apiKey = await Keychain.getGenericPassword({
      service: KEYCHAIN_SERVICE,
    });

    if (!apiKey) {
      await saveApiKeySecret();
      const regenerated = await Keychain.getGenericPassword({
        service: KEYCHAIN_SERVICE,
      });

      config.headers["X-API-Key"] = regenerated?.password || "";
    } else {
      config.headers["X-API-Key"] = apiKey.password;
    }

    config.headers["X-Client-Platform"] = "React-Native";

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE SIDE
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.config.url?.includes("/auth/login") && response.status === 200) {
      return {
        ...response,
        data: { success: true, token: "simulated_token_xyz" },
      };
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

    if (error.code === "ECONNABORTED") {
      error.message = "Permintaan timeout. Silakan coba lagi.";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
