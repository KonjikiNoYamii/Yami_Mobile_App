import { useEffect, useState } from "react";
import { useNetInfo } from "./useNetInfo";
import { fetchData } from "../api/fetchData";

export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isOnline } = useNetInfo();

  useEffect(() => {
  const controller = new AbortController();
  let timeout: ReturnType<typeof setTimeout>;

  const load = async () => {
    if (!isOnline) {
      setError("Anda sedang Offline. Cek koneksi Anda.");
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      timeout = setTimeout(() => controller.abort(), 7000);
      const data = await fetchData(controller.signal);
      setProducts(data);
    } catch (err: any) {
      if (err.name === "AbortError" || err.name === "CanceledError") {
        setError("Request dibatalkan (timeout/unmount)");
      } else {
        setError(err.message || "Gagal memuat data");
      }
    } finally {
      setLoading(false);
      clearTimeout(timeout);
    }
  };

  load();
  return () => {
    controller.abort();
    clearTimeout(timeout);
  };
}, [isOnline]);


  return { products, loading, error, isOnline };
};
