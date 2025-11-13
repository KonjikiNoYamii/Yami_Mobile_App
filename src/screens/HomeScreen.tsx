import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../context/ThemeContext'; // pastikan ada context isDark
import { useUser } from '../context/UserContext';

export default function HomeScreen() {
  const { isDark } = useTheme();
  const {userName} = useUser()
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#ffffff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        Selamat datang di HomeScreen!
      </Text>
      <Text style={[styles.description, { color: isDark ? '#ccc' : '#555' }]}>
        Di sini <Text style={{fontWeight:"bold"}}>{userName}</Text> bisa melihat ringkasan produk terbaru, penawaran spesial, dan navigasi cepat ke semua kategori. 
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
