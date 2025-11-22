// context/ProductContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { StorageService } from "../storage/storageService";
import { fetchProducts } from "../api/productService";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  discountPercentage: number;
  thumbnail: string;
  category: string;
  isCustom?: boolean;
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
  addProduct: (data: Omit<Product, "id">) => Promise<Product>;
  deleteProduct: (id: number) => void;
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

  const CACHE_KEY = "products_cache";
  const CACHE_TIME_KEY = "products_cache_time";
  const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

  // ===========================
  // Load Products + Cache
  // ===========================
  const loadAllProducts = async () => {
    try {
      const cachedRaw = await StorageService.get<string>(CACHE_KEY);
      const cacheTimeRaw = await StorageService.get<string>(CACHE_TIME_KEY);

      let cachedProducts: Product[] | null = null;
      if (cachedRaw) {
        try {
          cachedProducts = JSON.parse(cachedRaw);
        } catch (err) {
          console.error("Corrupted product cache detected, removing…", err);
          await StorageService.remove(CACHE_KEY);
          cachedProducts = null;
        }
      }

      const cacheTime = cacheTimeRaw ? Number(cacheTimeRaw) : 0;

      if (cachedProducts && Date.now() - cacheTime < CACHE_DURATION) {
        setProducts(cachedProducts);
        processDerivedData(cachedProducts);
        return;
      }

      // Ambil dari productService
      const controller = new AbortController();
      const fetchedProducts = await fetchProducts(controller.signal);

      setProducts(fetchedProducts);
      processDerivedData(fetchedProducts);

      await StorageService.set(CACHE_KEY, JSON.stringify(fetchedProducts));
      await StorageService.set(CACHE_TIME_KEY, Date.now().toString());
    } catch (err: any) {
      setError("Gagal memuat produk utama");
      console.error("loadAllProducts error:", err);
    }
  };

  // ===========================
  // Derived Data: Populer, Terbaru, Diskon, CategoryMap
  // ===========================
  const processDerivedData = (allProducts: Product[]) => {
    setPopuler([...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 20));
    setTerbaru([...allProducts].sort((a, b) => b.id - a.id).slice(0, 20));
    setDiskon(allProducts.filter(p => p.discountPercentage > 0).sort((a, b) => b.discountPercentage - a.discountPercentage));
    
    const map: Record<string, Product[]> = {};
    allProducts.forEach(p => {
      if (!map[p.category]) map[p.category] = [];
      map[p.category].push(p);
    });
    setCategoryMap(map);
  };

  const loadCategory = async (category: string) => {
    if (categoryMap[category]) return;
    const filtered = products.filter(p => p.category === category);
    setCategoryMap(prev => ({ ...prev, [category]: filtered }));
  };

  const loadProductsFromStorage = async () => {
    try {
      const raw = await StorageService.get<string>(CACHE_KEY);
      if (!raw) return;

      try {
        const parsed: Product[] = JSON.parse(raw);
        setProducts(parsed);
        processDerivedData(parsed);
      } catch (err) {
        console.error("Corrupted storage detected during hydration, clearing…", err);
        await StorageService.remove(CACHE_KEY);
        setProducts([]);
      }
    } catch (err) {
      console.error("loadProductsFromStorage error:", err);
    }
  };

  const refresh = async () => {
    setLoading(true);
    try {
      await loadAllProducts();
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Add / Delete Product
  // ===========================
  const addProduct = async (data: Product) => {
    try {
      // Simpan ke local langsung jika custom
      if (data.isCustom) {
        setProducts(prev => {
          const updated = [data, ...prev];
          StorageService.set(CACHE_KEY, JSON.stringify(updated));
          return updated;
        });
        processDerivedData([data, ...products]);
        return data;
      }

      console.warn("Non-custom products harus menggunakan API untuk create, ini placeholder.");
      return data;
    } catch (err) {
      console.error("Gagal menambah produk:", err);
      throw err;
    }
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id);
      StorageService.set(CACHE_KEY, JSON.stringify(updated));
      processDerivedData(updated);
      return updated;
    });
  };

  // ===========================
  // Listener jaringan
  // ===========================
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
        deleteProduct,
        addProduct,
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
