import { useEffect } from "react";
import { Linking, Alert } from "react-native";
import { navigationRef } from "../navigation/navigationRef";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function DeepLinkHandler() {
  const { addProductById } = useCart();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      if (!url) return;

      const path = url.replace(/.*?:\/\//g, "");

      // PRODUCT DETAIL
      if (path.startsWith("product/")) {
        const idStr = path.split("/")[1];
        const id = Number(idStr);

        // ❌ VALIDASI ID
        if (isNaN(id)) {
          Alert.alert("Tautan tidak valid", "Dialihkan ke beranda");
          navigationRef.current?.navigate("Root", {
            screen: "HomeTabs",
            params: { screen: "Home" },
          });
          return;
        }

        // ❌ BELUM LOGIN → redirect ke Login + simpan target
        if (!isLoggedIn) {
          navigationRef.current?.navigate("Login", {
            redirectTo: "ProductDetail",
            params: { id },
          });
          return;
        }

        // ✅ VALID + LOGIN
        navigationRef.current?.navigate("ProductDetail", { id });
        return;
      }

      // ADD TO CART
      if (path.startsWith("add-to-cart/")) {
        const id = Number(path.split("/")[1]);
        if (!isNaN(id)) {
          addProductById(id);
          navigationRef.current?.navigate("CartScreen");
        }
      }

      // KERANJANG
      else if (path === "keranjang") {
        navigationRef.current?.navigate("CartScreen");
      }

      // HOME
      else if (path === "home") {
        navigationRef.current?.navigate("Root", {
          screen: "HomeTabs",
          params: { screen: "Home" },
        });
      }

      // PROFILE
      else if (path.startsWith("profile/")) {
        const userId = path.split("/")[1];
        navigationRef.current?.navigate("Profile", { userId });
      }
    };

    // Cold start
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    // Warm start
    const sub = Linking.addEventListener("url", handleDeepLink);
    return () => sub.remove();
  }, [isLoggedIn]);
  
  return null;
}
