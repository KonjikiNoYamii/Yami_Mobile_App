import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { fetchProducts } from "../api/ProductService";

export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  // ============================
  // 🔥 Retry with Exponential Backoff
  // ============================
  const retryFetch = async () => {
    let attempt = 0;
    let backoff = 1000; // 1 detik

    while (attempt < 3) {
      try {
        console.log(`Percobaan ke-${attempt + 1}`);
        const controller = new AbortController();
        const data = await fetchProducts(controller.signal);
        setProducts(data);
        setError(null);
        return true; // sukses hentikan loop
      } catch (err) {
        attempt++;

        if (attempt >= 3) {
          console.log("Retry gagal 3 kali.");
          setError("Gagal memuat produk setelah 3 percobaan.");
          return false;
        }

        console.log(
          `Gagal… mencoba lagi dalam ${backoff / 1000} detik...`
        );

        await new Promise<void>((resolve) => setTimeout(resolve, backoff));
        backoff *= 2; // Exponential
      }
    }
  };

  // ============================
  // Load pertama
  // ============================
  const loadProducts = async () => {
    setLoading(true);
    setError(null);

    const success = await retryFetch();
    setLoading(false);
    return success;
  };

  // ============================
  // Pantau koneksi internet
  // ============================
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const online =
        state.isConnected === true && state.isInternetReachable === true;

      setIsOnline(online);
      setConnectionType(state.type);

      // Online lagi → fetch ulang
      if (online) loadProducts();
    });

    loadProducts();
    return () => unsubscribe();
  }, []);

  return {
    products,
    loading,
    error,
    isOnline,
    connectionType,
    retry: loadProducts, // Manual retry
  };
};
