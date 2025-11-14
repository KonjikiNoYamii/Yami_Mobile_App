// api/productService.ts

import apiClient from './apiClient'


export const fetchProducts = async (signal: AbortSignal) => {
  try {
    const response = await apiClient.get("/products", { signal });
    return response.data.products;
  } catch (err: any) {
    if (err.code === "ERR_CANCELED") {
      console.warn("Fetch Products dibatalkan.");
    }

    console.error("Fetch Products Error:", err.message);
    throw err;
  }
};

// khusus Product Detail by ID
export const fetchProductById = async (id: number, signal: AbortSignal) => {
  try {
    const response = await apiClient.get(`/products/${id}`, { signal });
    return response.data;
  } catch (err: any) {
    if (err.code === "ERR_CANCELED") {
      console.warn(`Fetch product ${id} dibatalkan.`);
    }

    if (err.response) {
      if (err.response.status === 404) {
        console.error("[404] Produk tidak ditemukan di server.");
      }
      if (err.response.status === 500) {
        console.error("[500] Server error ketika mengambil data produk.");
      }
    }

    console.error(`Fetch Product ID ${id} Error:`, err.message);
    throw err;
  }
};
