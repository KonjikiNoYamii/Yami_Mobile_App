import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function ProductDetail() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const routeProduct = route.params;
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(routeProduct);

  useEffect(() => {
    if (products.length > 0) {
      const updated = products.find((p) => p.id === routeProduct.id);

      if (updated) setProduct(updated);
      else console.warn("Produk tidak ditemukan. Using route params.");
    }
  }, [products]);

  // ==========================
  // ERROR HANDLING
  // ==========================
  useEffect(() => {
    if (!error) return;

    const status = error?.response?.status;

    if (status === 404) console.log("ERROR 404: Produk tidak ditemukan");
    else if (status === 500) console.log("ERROR 500: Server bermasalah");

    ToastAndroid.show(
      "Gagal memuat data terbaru. Menampilkan versi arsip.",
      ToastAndroid.LONG
    );

    setProduct({
      id: routeProduct.id,
      name: "(Arsip) Produk Tidak Tersedia",
      description:
        "Data lokal digunakan karena gagal memuat data terbaru dari server.",
      price: routeProduct.price ?? 0,
      image: "https://picsum.photos/400/300",
    });
  }, [error]);

  // THEME
  const themeColors = {
    bg: route.params.isDark ? "#1e1e1e" : "#f9f9f9",
    card: route.params.isDark ? "#2a2a2a" : "#fff",
    text: route.params.isDark ? "#fff" : "#222",
    desc: route.params.isDark ? "#ccc" : "#555",
    price: route.params.isDark ? "#f5a623" : "#e67e22",
    buttonBg: route.params.isDark ? "#f5a623" : "#e67e22",
    buttonText: route.params.isDark ? "#1e1e1e" : "#fff",
  };

  const handleAddCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
    });

    ToastAndroid.show("Ditambahkan ke keranjang", ToastAndroid.SHORT);
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color={themeColors.text} />
      </Pressable>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading && (
          <ActivityIndicator size="large" color={themeColors.price} />
        )}

        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={[styles.infoBox, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.name, { color: themeColors.text }]}>
            {product.title}
          </Text>

          <Text style={[styles.price, { color: themeColors.price }]}>
            Rp {product.price?.toLocaleString("id-ID")}
          </Text>

          <Text style={[styles.desc, { color: themeColors.desc }]}>
            {product.description}
          </Text>

          {/* ADD TO CART */}
          <Pressable
            style={[
              styles.cartButton,
              { backgroundColor: themeColors.buttonBg },
            ]}
            onPress={handleAddCart}
          >
            <Text
              style={[styles.cartText, { color: themeColors.buttonText }]}
            >
              Tambah ke Keranjang
            </Text>
          </Pressable>

          {/* CHECKOUT */}
          <Pressable
            style={[
              styles.checkoutButton,
              { backgroundColor: themeColors.buttonBg },
            ]}
            onPress={() =>
              navigation.navigate("Checkout", {
                name: product.name,
                price: product.price,
                isDark: route.params.isDark,
              })
            }
          >
            <Text
              style={[styles.checkoutText, { color: themeColors.buttonText }]}
            >
              Checkout
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, alignItems: "center" },
  image: { width: "80%", height: 260, borderRadius: 16 },
  infoBox: { width: "100%", borderRadius: 12, padding: 16 },
  name: { fontSize: 22, fontWeight: "700", marginBottom: 6 },
  price: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  desc: { fontSize: 15, lineHeight: 22, marginBottom: 12 },
  backButton: {
    position: "absolute",
    top: 45,
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  cartButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  cartText: { fontSize: 16, fontWeight: "600" },
  checkoutButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutText: { fontSize: 16, fontWeight: "bold" },
});
