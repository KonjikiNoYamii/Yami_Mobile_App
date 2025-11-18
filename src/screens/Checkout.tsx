// screens/Checkout.tsx
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

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { isDark } = useTheme();

  const [alamat, setAlamat] = useState("");

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);

  const handlePay = () => {
    if (!alamat.trim()) return Alert.alert("Alamat wajib diisi!");

    Alert.alert(
      "Konfirmasi Pembayaran",
      "Yakin ingin lanjut?",
      [
        { text: "Batal" },
        {
          text: "Bayar",
          onPress: () => {
            clearCart();
            Alert.alert("Sukses", "Pesanan berhasil dibuat!");
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={{ padding: 16, backgroundColor: isDark ? "#111" : "#fff" }}>
      <Text style={styles.title}>Checkout</Text>

      {cart.map(item => (
        <View key={item.id} style={styles.item}>
          <Text>{item.name}</Text>
          <Text>{item.qty} × Rp {item.price.toLocaleString()}</Text>
        </View>
      ))}

      <TextInput
        placeholder="Masukkan alamat"
        placeholderTextColor="#777"
        style={styles.input}
        value={alamat}
        onChangeText={setAlamat}
      />

      <Text style={styles.totalText}>
        Total: Rp {total.toLocaleString()}
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
    borderWidth: 1, padding: 12,
    borderRadius: 8, marginTop: 20, marginBottom: 20
  },
  totalText: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  payBtn: { padding: 15, backgroundColor: "#e67e22", borderRadius: 10 },
  payText: { color: "#fff", textAlign: "center", fontWeight: "bold" }
});
