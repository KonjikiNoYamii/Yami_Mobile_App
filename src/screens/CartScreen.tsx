// screens/CartScreen.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet
} from "react-native";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen() {
  const { cart, updateQty, removeItem } = useCart();
  const { isDark } = useTheme();
  const navigation = useNavigation<any>();

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#111" : "#fff" }]}>
      <Text style={styles.title}>Keranjang Saya</Text>

      <FlatList
        data={cart}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: isDark ? "#222" : "#fff" }]}>
            
            <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 16 }}>
              {item.name}
            </Text>

            <Text style={{ color: isDark ? "#ccc" : "#333" }}>
              Rp {item.price.toLocaleString()}
            </Text>

            {/* Qty control */}
            <View style={styles.qtyRow}>
              <Pressable
                style={styles.qtyBtn}
                onPress={() => updateQty(item.id, Math.max(1, item.qty - 1))}
              >
                <Text>-</Text>
              </Pressable>

              <Text style={{ width: 30, textAlign: "center", color: isDark ? "#fff" : "#000" }}>
                {item.qty}
              </Text>

              <Pressable
                style={styles.qtyBtn}
                onPress={() => updateQty(item.id, item.qty + 1)}
              >
                <Text>+</Text>
              </Pressable>

              <Pressable onPress={() => removeItem(item.id)}>
                <Text style={{ color: "red", marginLeft: 10 }}>Hapus</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      {/* Total */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Total: Rp {total.toLocaleString()}</Text>

        <Pressable
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.checkoutText}>Lanjut Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 16, borderRadius: 10, marginBottom: 12 },
  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  qtyBtn: { borderWidth: 1, padding: 5, borderRadius: 6, width: 30, alignItems: "center" },
  totalBox: { marginTop: 20 },
  totalText: { fontSize: 18, fontWeight: "bold" },
  checkoutBtn: {
    marginTop: 12, padding: 15, backgroundColor: "#e67e22",
    borderRadius: 10, alignItems: "center"
  },
  checkoutText: { color: "#fff", fontWeight: "bold" }
});
