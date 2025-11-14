// ProductDetail.tsx
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
import Ionicons from "@react-native-vector-icons/ionicons";

export default function ProductDetail() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const routeProduct = route.params; // fallback awal
  const { products, loading, error } = useProducts();

  const [product, setProduct] = useState(routeProduct);

  // =====================================================
  // A. Update product jika API berhasil
  // =====================================================
  useEffect(() => {
    if (products && products.length > 0) {
      const updated = products.find((p) => p.id === routeProduct.id);

      if (updated) {
        setProduct(updated);
      } else {
        console.warn(
          "Produk tidak ditemukan di server, menggunakan data route params."
        );
      }
    }
  }, [products]);

  // =====================================================
  // B. Error Handler (404 / 500) + Toast + Fallback
  // =====================================================
  useEffect(() => {
    if (!error) return;

    // 🔍 Cek status code
    const status = error?.response?.status;

    if (status === 404) {
      console.error("ERROR 404: Produk tidak ditemukan di server");
    } else if (status === 500) {
      console.error("ERROR 500: Server bermasalah saat memuat produk");
    } else {
      console.error("Unknown API Error:", error);
    }

    // 🔥 Toast fallback
    ToastAndroid.show(
      "Gagal memuat data terbaru. Menampilkan versi arsip.",
      ToastAndroid.LONG
    );

    // 🔥 Data fallback lokal
    setProduct({
      id: routeProduct.id,
      name: "(Arsip) Produk Tidak Tersedia",
      description:
        "Data offline digunakan karena gagal memuat data terbaru dari server.",
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
    iconBg: route.params.isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.05)",
    buttonBg: route.params.isDark ? "#f5a623" : "#e67e22",
    buttonText: route.params.isDark ? "#1e1e1e" : "#fff",
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color={themeColors.text} />
      </Pressable>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading && <ActivityIndicator size="large" color={themeColors.price} />}

        {/* Gambar Produk */}
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
          onError={() => console.warn("Gagal load gambar")}
        />

        {/* Info Box */}
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

          {/* Checkout */}
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
  container: { flex: 1, position: "relative" },
  scrollContent: { padding: 16, alignItems: "center" },
  image: { width: "80%", height: 260, borderRadius: 16, marginBottom: 16 },
  infoBox: { width: "100%", borderRadius: 12, padding: 16 },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  desc: { fontSize: 15, lineHeight: 22, textAlign: "justify", marginBottom: 12 },
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
  checkoutButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutText: { fontSize: 16, fontWeight: "bold" },
});
