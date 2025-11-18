// hooks/useCategoryProducts.ts

import { useEffect, useState, useRef } from "react";
import NetInfo from "@react-native-community/netinfo";
import apiClient from "../api/apiClient";

export function useCategoryProducts(category: string) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  const abortRef = useRef<AbortController | null>(null);

  const fetchCategoryProducts = async () => {
    setLoading(true);
    setError(null);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const net = await NetInfo.fetch();
    setIsOnline(net.isConnected && net.isInternetReachable);

    if (!net.isConnected) {
      setError("Anda sedang offline");
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.get(
        `/products/category/${category}`,
        { signal: controller.signal }
      );

      setProducts(response.data.products ?? []);
    } catch (err: any) {
      if (err.code !== "ERR_CANCELED") {
        setError(err.message ?? "Gagal memuat kategori");
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryProducts();
    return () => abortRef.current?.abort();
  }, [category]);

  const retry = () => fetchCategoryProducts();

  return { products, loading, error, isOnline, retry };
}
