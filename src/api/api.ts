import axios, { AxiosResponse } from "axios";
import NetInfo from "@react-native-community/netinfo";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 7000,
  headers: { Accept: "application/json" },
});

apiClient.interceptors.request.use(
  async (config) => {
    const netState = await NetInfo.fetch();
    if (!netState.isConnected || !netState.isInternetReachable) {
      return Promise.reject(new Error("Tidak ada koneksi internet"));
    }

    config.headers["X-Client-Platform"] = "React-Native";
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
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
    if (error.code === "ECONNABORTED") {
      error.message = "Permintaan timeout. Silakan coba lagi.";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
