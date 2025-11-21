import apiClient from "./apiClient";

const CACHE_KEY = "categories_cache";
const TTL = 30 * 60 * 1000; // 30 menit

export const fetchCategoriesWithCache = async () => {
  try {
    // 1. Cek cache di memory
    const cached = (globalThis as any)[CACHE_KEY];

    if (cached) {
      const isExpired = Date.now() - cached.timestamp > TTL;

      if (!isExpired) {
        console.log("Kategori dari cache");
        return cached.data;
      }
    }

    // 2. Fetch kategori dari API yang benar
    // https://dummyjson.com/products/category-list
    const res = await apiClient.get("/products/category-list");
    const data = res.data; // API ini return array langsung

    // 3. Simpan cache ke memory
    (globalThis as any)[CACHE_KEY] = {
      timestamp: Date.now(),
      data,
    };

    console.log("Kategori fresh dari server");
    return data;
  } catch (err: any) {
    console.error("Fetch Categories Error:", err.message);
    throw err;
  }
};
