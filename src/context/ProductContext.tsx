// context/ProductContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import apiClient from "../api/apiClient";
import { StorageService } from "../storage/storageService";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  discountPercentage: number;
  thumbnail: string;
  category: string;
}

interface ProductContextType {
  products: Product[];
  populer: Product[];
  terbaru: Product[];
  diskon: Product[];
  categoryMap: Record<string, Product[]>;
  loading: boolean;
  error: string | null;
  isOnline: boolean;
  connectionType: string | null;

  loadCategory: (category: string) => Promise<void>;
  refresh: () => Promise<void>;
  loadProductsFromStorage: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [populer, setPopuler] = useState<Product[]>([]);
  const [terbaru, setTerbaru] = useState<Product[]>([]);
  const [diskon, setDiskon] = useState<Product[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  const CACHE_DURATION = 5 * 60 * 1000;

  const retryFetch = async (fetchFn: () => Promise<any>, attempts = 3) => {
    let attempt = 0;
    let backoff = 1000;
    while (attempt < attempts) {
      try {
        return await fetchFn();
      } catch (err) {
        attempt++;
        if (attempt >= attempts) throw err;
        await new Promise((res) => setTimeout(res as any, backoff));
        backoff *= 2;
      }
    }
  };

  // ==============================
  // Load utama + handle corrupt storage
  // ==============================
  const loadAllProducts = async () => {
    try {
      const cachedRaw = await StorageService.get<string>("products_cache");
      const cacheTimeRaw = await StorageService.get<string>("products_cache_time");

      let cachedProducts: Product[] | null = null;

      // Parsing dengan handling corrupt
      if (cachedRaw) {
        try {
          cachedProducts = JSON.parse(cachedRaw);
        } catch (err) {
          console.error("Corrupted product cache detected, removing…", err);
          await StorageService.remove("products_cache");
          cachedProducts = null;
        }
      }

      const cacheTime = cacheTimeRaw ? Number(cacheTimeRaw) : 0;

      if (cachedProducts && Date.now() - cacheTime < CACHE_DURATION) {
        setProducts(cachedProducts);
        return;
      }

      // Ambil dari API
      const res = await retryFetch(() => apiClient.get("/products"));
      setProducts(res.data.products);

      // Simpan ke storage (pastikan stringify)
      await StorageService.set("products_cache", JSON.stringify(res.data.products));
      await StorageService.set("products_cache_time", Date.now().toString());
    } catch (err: any) {
      setError("Gagal memuat produk utama");
      console.log("LoadAllProducts Error:", err);
    }
  };

  const loadPopuler = async () => {
    try {
      const res = await retryFetch(
        () => apiClient.get("/products?sortBy=rating&order=desc&limit=20")
      );
      setPopuler(res.data.products);
    } catch (_) {}
  };

  const loadTerbaru = async () => {
    try {
      const res = await retryFetch(
        () => apiClient.get("/products?sortBy=id&order=desc&limit=20")
      );
      setTerbaru(res.data.products);
    } catch (_) {}
  };

  const loadDiskon = async () => {
    try {
      const res = await retryFetch(
        () => apiClient.get("/products?sortBy=discountPercentage&order=desc&limit=20")
      );
      setDiskon(res.data.products);
    } catch (_) {}
  };

  const loadCategory = async (category: string) => {
    try {
      if (categoryMap[category]) return;

      const res = await retryFetch(() => apiClient.get(`/products/category/${category}`));
      setCategoryMap((prev) => ({ ...prev, [category]: res.data.products }));
    } catch (_) {}
  };

  const loadProductsFromStorage = async () => {
    try {
      const raw = await StorageService.get<string>("products_cache");
      if (!raw) return;

      try {
        const parsed: Product[] = JSON.parse(raw);
        setProducts(parsed);
      } catch (err) {
        console.error("Corrupted storage detected during hydration, clearing…", err);
        await StorageService.remove("products_cache");
        setProducts([]);
      }
    } catch (err) {
      console.error("loadProductsFromStorage error:", err);
    }
  };

  const refresh = async () => {
    setLoading(true);
    try {
      await Promise.all([loadAllProducts(), loadPopuler(), loadTerbaru(), loadDiskon()]);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const online = state.isConnected && state.isInternetReachable;
      setIsOnline(Boolean(online));
      setConnectionType(state.type);
      if (online) refresh();
    });

    refresh();
    return () => unsubscribe();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        populer,
        terbaru,
        diskon,
        categoryMap,
        loadCategory,
        loading,
        error,
        refresh,
        loadProductsFromStorage,
        isOnline,
        connectionType,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts harus di dalam ProductProvider");
  return ctx;
};
