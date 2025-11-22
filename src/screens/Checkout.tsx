import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { processPayment } from "../services/paymentService";

// Fungsi pengganti toLocaleString
function formatNumber(number?: number | null) {
  if (number === null || number === undefined || isNaN(number)) return "0";
  return number.toLocaleString("id-ID"); // otomatis pakai titik sebagai ribuan
}


export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { isDark } = useTheme();

  const [alamat, setAlamat] = useState("");

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);

const handlePay = async () => {
  if (!alamat.trim()) {
    return Alert.alert("Alamat wajib diisi!");
  }

  await processPayment(total, clearCart);
};

  return (
    <ScrollView
      style={{ padding: 16, backgroundColor: isDark ? "#111" : "#fff" }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
        Checkout
      </Text>

      {cart.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text style={{ color: isDark ? "#fff" : "#000" }}>{item.name}</Text>
          <Text style={{ color: isDark ? "#ccc" : "#555" }}>
            {item.qty} × Rp {formatNumber(item.price)}
          </Text>
        </View>
      ))}

      <TextInput
        placeholder="Masukkan alamat"
        placeholderTextColor="#777"
        style={[styles.input, { borderColor: isDark ? "#555" : "#ccc", color: isDark ? "#fff" : "#000" }]}
        value={alamat}
        onChangeText={setAlamat}
      />

      <Text style={[styles.totalText, { color: isDark ? "#fff" : "#000" }]}>
        Total: Rp {formatNumber(total)}
      </Text>

      <Pressable style={styles.payBtn} onPress={handlePay}>
        <Text style={styles.payText}>Bayar Sekarang</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  item: { marginBottom: 15 },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  totalText: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  payBtn: { padding: 15, backgroundColor: "#e67e22", borderRadius: 10 },
  payText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
