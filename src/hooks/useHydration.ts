// src/hooks/useHydration.ts
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useProductContext } from "../context/ProductContext";

export function useHydration() {
  const { loadThemeFromStorage } = useTheme();
  const { loadCartFromStorage } = useCart();
  const { loadAuthFromStorage } = useAuth();
  const { loadProductsFromStorage } = useProductContext();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      await Promise.all([
        loadThemeFromStorage(),
        loadCartFromStorage(),
        loadAuthFromStorage(),
        loadProductsFromStorage(),
      ]);

      setReady(true);
    };

    load();
  }, []);

  return ready;
}
