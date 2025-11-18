import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../api/apiClient";

// ==== TIPE DATA PRODUK ====
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  discountPercentage: number;
  thumbnail: string;
  category: string;
  // tambahkan field lain dari API jika diperlukan
}

// ==== TIPE VALUE CONTEXT ====
interface ProductContextType {
  products: Product[];
  populer: Product[];
  terbaru: Product[];
  diskon: Product[];
  categoryMap: Record<string, Product[]>;
  loadCategory: (category: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

// ==== DEFAULT UNTUK CREATE CONTEXT ====
const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [populer, setPopuler] = useState<Product[]>([]);
  const [terbaru, setTerbaru] = useState<Product[]>([]);
  const [diskon, setDiskon] = useState<Product[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, Product[]>>({});

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const CACHE_DURATION = 5 * 60 * 1000;

  const loadAllProducts = async () => {
    try {
      const cached = await AsyncStorage.getItem("products_cache");
      const cacheTime = await AsyncStorage.getItem("products_cache_time");

      if (cached && cacheTime && Date.now() - Number(cacheTime) < CACHE_DURATION) {
        setProducts(JSON.parse(cached));
        return;
      }

      const res = await apiClient.get("/products");
      setProducts(res.data.products);

      await AsyncStorage.setItem("products_cache", JSON.stringify(res.data.products));
      await AsyncStorage.setItem("products_cache_time", Date.now().toString());

    } catch (err: any) {
      setError("Gagal memuat produk utama");
    }
  };

  const loadPopuler = async () => {
    try {
      const res = await apiClient.get(
        "/products?sortBy=rating&order=desc&limit=20"
      );
      setPopuler(res.data.products);
    } catch (err) {
      console.log("Gagal load populer", err);
    }
  };

  const loadTerbaru = async () => {
    try {
      const res = await apiClient.get(
        "/products?sortBy=createdAt&order=desc&limit=20"
      );
      setTerbaru(res.data.products);
    } catch (err) {
      console.log("Gagal load terbaru", err);
    }
  };

  const loadDiskon = async () => {
    try {
      const res = await apiClient.get(
        "/products?sortBy=discountPercentage&order=desc&limit=20"
      );
      setDiskon(res.data.products);
    } catch (err) {
      console.log("Gagal load diskon", err);
    }
  };

  const loadCategory = async (category: string) => {
    try {
      if (categoryMap[category]) return;

      const res = await apiClient.get(`/products/category/${category}`);
      setCategoryMap(prev => ({ ...prev, [category]: res.data.products }));

    } catch (err) {
      console.log(`Gagal load kategori ${category}`, err);
    }
  };

  const refresh = async () => {
    setLoading(true);
    await Promise.all([
      loadAllProducts(),
      loadPopuler(),
      loadTerbaru(),
      loadDiskon()
    ]);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// ==== HOOK ====
export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProductContext harus di dalam ProductProvider");
  return ctx;
};
