import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { startGeoFence, stopGeoFence, Coordinates } from '../utils/GeoFenceService';

// Koordinat Toko Utama (contoh)
// GeoFenceService / HomeScreen
const TOKO_UTAMA: Coordinates = {
  latitude: -7.99636,
  longitude: 110.29553,
};

export default function HomeScreen() {
  const { isDark } = useTheme();
  const { userName } = useUser();
  const [geoWatchId, setGeoWatchId] = useState<number | null>(null);

  // Mulai geofencing saat HomeScreen mount
  useEffect(() => {
    const id = startGeoFence(TOKO_UTAMA, () => {
      console.log("Promo detected!");
      // Alert muncul hanya sekali saat user masuk radius 100m
      Alert.alert("PROMO DEKAT TOKO!", "Cek penawaran spesial sekarang!");
    });
    setGeoWatchId(id);

    // Cleanup saat unmount
    return () => stopGeoFence(id);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#ffffff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        Selamat datang di HomeScreen!
      </Text>
      <Text style={[styles.description, { color: isDark ? '#ccc' : '#555' }]}>
        Di sini <Text style={{ fontWeight: "bold" }}>{userName}</Text> bisa melihat ringkasan produk terbaru, penawaran spesial, dan navigasi cepat ke semua kategori.
        Gunakan drawer atau tab di bawah untuk menjelajahi aplikasi lebih lanjut.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});
