// context/CartContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "../api/apiClient";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  addProductById: (id: number) => Promise<void>;
  updateQty: (id: number, qty: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  loadCartFromStorage: () => Promise<void>; // ← WAJIB untuk hydration
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCartFromStorage = async () => {
  const stored = await AsyncStorage.getItem("cart_data");
  if (stored) setCart(JSON.parse(stored));
};

useEffect(() => {
  loadCartFromStorage();
}, []);


  // 🔹 Load from storage (multi-key di soal bagian C)
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("cart_data");
      if (stored) setCart(JSON.parse(stored));
    })();
  }, []);

  // 🔹 Save to storage setiap berubah
  const saveCart = async (updated: CartItem[]) => {
    try {
      await AsyncStorage.setItem("cart_data", JSON.stringify(updated));
    } catch (err: any) {
      if (err?.message?.includes("quota")) {
        console.log("⚠ Penyimpanan penuh (Quota Exceeded)");
      }
    }
  };

  // 🔹 Menambahkan item ke keranjang
  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === item.id);

      let updated;
      if (exist) {
        updated = prev.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
        );
      } else {
        updated = [...prev, item];
      }

      saveCart(updated);
      return updated;
    });
  };

  // 🔹 Update qty (mergeItem style)
  const updateQty = (id: number, qty: number) => {
    setCart(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, qty } : item
      );

      saveCart(updated);
      return updated;
    });
  };

  const removeItem = (id: number) => {
    setCart(prev => {
      const updated = prev.filter(item => item.id !== id);
      saveCart(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    AsyncStorage.removeItem("cart_data");
  };
  const addProductById = async (id: number) => {
  try {
    const res = await apiClient.get(`/products/${id}`);
    const p = res.data;

    addToCart({
      id: p.id,
      name: p.title,
      price: p.price,
      qty: 1,
    });
  } catch {
    console.log("Gagal fetch product");
  }
};

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeItem, clearCart, addProductById, loadCartFromStorage }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext)!;
