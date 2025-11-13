import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const { isDark } = useTheme();
  const { cartItems } = useCart(); // ambil item dari context
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Hitung total tiap kali cartItems berubah
  useEffect(() => {
    const sum = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotal(sum);
  }, [cartItems]);

  const themeColors = {
    bg: isDark ? "#1e1e1e" : "#f9f9f9",
    card: isDark ? "#2a2a2a" : "#fff",
    text: isDark ? "#fff" : "#222",
    price: isDark ? "#f5a623" : "#e67e22",
  };

  if (loading) {
    setTimeout(() => setLoading(false), 500);
    return (
      <View style={[styles.center, { backgroundColor: themeColors.bg }]}>
        <ActivityIndicator size="large" color={themeColors.price} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Keranjang Saya</Text>

      {cartItems.length === 0 ? (
        <Text style={{ color: themeColors.text, textAlign: "center", marginTop: 30 }}>
          Keranjang masih kosong~
        </Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => String(item.id)} // pastikan id unik dan string
          renderItem={({ item }) => (
            <View style={[styles.itemCard, { backgroundColor: themeColors.card }]}>
              <Text style={[styles.itemName, { color: themeColors.text }]}>{item.name}</Text>
              <Text style={[styles.itemPrice, { color: themeColors.price }]}>
                Rp {item.price.toLocaleString("id-ID")} x {item.qty} = Rp {(item.price * item.qty).toLocaleString("id-ID")}
              </Text>
            </View>
          )}
        />
      )}

      {/* Total */}
      <View style={[styles.totalBox, { backgroundColor: themeColors.card }]}>
        <Text style={[styles.totalText, { color: themeColors.text }]}>Total:</Text>
        <Text style={[styles.totalPrice, { color: themeColors.price }]}>
          Rp {total.toLocaleString("id-ID")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginVertical: 16 },
  itemCard: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemPrice: { fontSize: 14, marginTop: 4 },
  totalBox: {
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  totalText: { fontSize: 16, fontWeight: "bold" },
  totalPrice: { fontSize: 18, fontWeight: "bold", marginTop: 6 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
