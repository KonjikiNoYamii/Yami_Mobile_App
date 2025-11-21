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
import Ionicons from "@react-native-vector-icons/ionicons";
import { getCache, setCache } from "../storage/cacheStorage";
import { useCart } from "../context/CartContext";
import {fetchWithRetry} from '../utils/fetchWithRetry'

export default function ProductDetail() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const routeProduct = route.params;
  const { addToCart } = useCart();

  const [product, setProduct] = useState(routeProduct);
  const [loading, setLoading] = useState(true);

  const cacheKey = `product_${routeProduct.id}`;

  // ==================================================
  // 1. LOAD CACHE FIRST
  // ==================================================
  useEffect(() => {
    (async () => {
      const cached = await getCache(cacheKey);

      if (cached) {
        console.log("📦 Loaded from cache:", cacheKey);
        setProduct(cached);
      }
    })();
  }, []);

  // ==================================================
  // 2. UPDATE FROM API → fetchWithRetry → SAVE CACHE
  // ==================================================
 useEffect(() => {
  (async () => {
    try {
      const url = `https://dummyjson.com/products/${routeProduct.id}`;

      const freshData = await fetchWithRetry(
        () => fetch(url).then((res) => res.json()),
        3
      );

      setProduct(freshData);
      await setCache(cacheKey, freshData);

      console.log("🔄 Updated from API:", cacheKey);
    } catch (err) {
      console.log("❌ API error, loading fallback...");

      const cached = await getCache(cacheKey);
      if (cached) {
        ToastAndroid.show("Memuat dari cache...", ToastAndroid.SHORT);
        setProduct(cached);
      } else {
        setProduct({
          id: routeProduct.id,
          title: "(Arsip) Produk Tidak Tersedia",
          description: "Data cache tidak ditemukan dan API gagal diakses.",
          price: 0,
          thumbnail: "https://picsum.photos/400/300",
        });
      }
    } finally {
      setLoading(false);
    }
  })();
}, [routeProduct.id]);


  // ==================================================
  // THEME
  // ==================================================
  const theme = {
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
      name: product.title,
      price: product.price,
      qty: 1,
    });

    ToastAndroid.show("Ditambahkan ke keranjang", ToastAndroid.SHORT);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color={theme.text} />
      </Pressable>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {loading && (
          <ActivityIndicator size="large" color={theme.price} />
        )}

        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={[styles.infoBox, { backgroundColor: theme.card }]}>
          <Text style={[styles.name, { color: theme.text }]}>
            {product.title}
          </Text>

          <Text style={[styles.price, { color: theme.price }]}>
            Rp {product.price?.toLocaleString("id-ID")}
          </Text>

          <Text style={[styles.desc, { color: theme.desc }]}>
            {product.description}
          </Text>

          {/* ADD TO CART */}
          <Pressable
            style={[styles.cartButton, { backgroundColor: theme.buttonBg }]}
            onPress={handleAddCart}
          >
            <Text style={[styles.cartText, { color: theme.buttonText }]}>
              Tambah ke Keranjang
            </Text>
          </Pressable>

          {/* CHECKOUT */}
          <Pressable
            style={[styles.checkoutButton, { backgroundColor: theme.buttonBg }]}
            onPress={() =>
              navigation.navigate("Checkout", {
                name: product.name,
                price: product.price,
                isDark: route.params.isDark,
              })
            }
          >
            <Text style={[styles.checkoutText, { color: theme.buttonText }]}>
              Checkout
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

// ==================================================
// STYLES
// ==================================================
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
