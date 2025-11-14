 // pastikan nama file apiClient sesuai

import apiClient from "./apiClient";

// Simulasi login dengan Axios POST
export const loginRequest = async (username: string, password: string) => {
  const response = await apiClient.post("/auth/login", {
    username,
    password,
  });

  // Interceptor akan memodifikasi ini, tapi kita jaga-jaga
  return response.data;
};
