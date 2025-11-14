import apiClient from "./apiClient";

export const submitCheckout = async (payload: any) => {
  const response = await apiClient.post("/checkout", payload);

  return response.data;
};
