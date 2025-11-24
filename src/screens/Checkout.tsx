import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Button, Alert, StyleSheet } from "react-native";
import { useLiveTracking } from "../hooks/useLiveTracking";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { processPayment } from "../services/paymentService";

export default function Checkout() {
  const { coords, start, stop, isTracking } = useLiveTracking();
  const { cart, clearCart } = useCart();
  const { isDark } = useTheme();
  const [loadingLocation, setLoadingLocation] = useState(true);

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);

  useEffect(() => {
    start();
    setLoadingLocation(false);
    return () => stop(); // cleanup
  }, []);

  const handlePay = async () => {
    if (!coords) return Alert.alert("Lokasi belum tersedia!");
    await processPayment(total, clearCart);
  };

  const formatNumber = (num?: number | null) => {
    if (!num || isNaN(num)) return "0";
    return num.toLocaleString("id-ID");
  };

  return (
    <ScrollView
      style={{ padding: 16, backgroundColor: isDark ? "#111" : "#fff" }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Checkout</Text>

      {cart.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text style={{ color: isDark ? "#fff" : "#000" }}>{item.name}</Text>
          <Text style={{ color: isDark ? "#ccc" : "#555" }}>
            {item.qty} × Rp {formatNumber(item.price)}
          </Text>
        </View>
      ))}

      {/* Lokasi dari Live Tracking */}
      <View style={[styles.input, { backgroundColor: isDark ? "#222" : "#f5f5f5" }]}>
        {loadingLocation ? (
          <ActivityIndicator size="small" color={isDark ? "#fff" : "#000"} />
        ) : (
          <Text style={{ color: isDark ? "#fff" : "#000" }}>
            {coords
              ? `Lat: ${coords.latitude.toFixed(5)}, Lon: ${coords.longitude.toFixed(5)}`
              : "Gagal mengambil lokasi"}
          </Text>
        )}
      </View>

      <Text style={[styles.totalText, { color: isDark ? "#fff" : "#000" }]}>
        Total: Rp {formatNumber(total)}
      </Text>

      <Button title={isTracking ? "Stop Tracking" : "Mulai Tracking"} onPress={isTracking ? stop : start} />
      <Button title="Bayar Sekarang" onPress={handlePay} color="#e67e22" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  item: { marginBottom: 15 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginVertical: 20, justifyContent: "center", minHeight: 50 },
  totalText: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
});
