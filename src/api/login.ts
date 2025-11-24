// api/authService.ts
import apiClient from "./apiClient";

export const loginRequest = async (username: string, password: string) => {
  const response = await apiClient.post("/auth/login", {
    username,
    password,
  });
  return response.data; 
};
