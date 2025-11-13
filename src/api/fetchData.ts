import apiClient from "./api";

export const fetchData = async (signal: AbortSignal) => {
  const response = await apiClient.get("/products", { signal });
  return response.data.products;
};
