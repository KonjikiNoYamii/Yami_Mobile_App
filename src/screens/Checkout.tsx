import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useCart, CartItem } from '../context/CartContext';

export default function Checkout() {
  const { isDark } = useTheme();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id, name, price } = route.params; // pastikan id asli produk dikirim
  const { addToCart } = useCart();

  const themeColors = {
    bg: isDark ? '#1e1e1e' : '#f9f9f9',
    card: isDark ? '#2a2a2a' : '#fff',
    text: isDark ? '#fff' : '#222',
    desc: isDark ? '#ccc' : '#555',
    price: isDark ? '#f5a623' : '#e67e22',
    buttonBg: isDark ? '#f5a623' : '#e67e22',
    buttonText: isDark ? '#1e1e1e' : '#fff',
  };

  const handlePayment = () => {
    // Buat item checkout dan merge otomatis
    const checkoutData: CartItem[] = [{ id, name, price, qty: 1 }];
    addToCart(checkoutData);

    Alert.alert('Pembayaran berhasil! 🎉', '', [
      {
        text: 'Lihat Keranjang',
        onPress: () => {
          const parent = navigation.getParent(); 
          parent?.navigate('CartScreen');
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Checkout</Text>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* Ringkasan Produk */}
        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.productName, { color: themeColors.text }]}>{name}</Text>
          <Text style={[styles.productPrice, { color: themeColors.price }]}>
            Rp {price.toLocaleString('id-ID')}
          </Text>
        </View>

        {/* Alamat Pengiriman */}
        <View style={[styles.card, { backgroundColor: themeColors.card, marginTop: 16 }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Alamat Pengiriman</Text>
          <Text style={[styles.sectionDesc, { color: themeColors.desc }]}>
            Masukkan alamat lengkap untuk pengiriman
          </Text>
          <View style={[styles.inputBox, { backgroundColor: isDark ? '#3a3a3a' : '#f2f2f2' }]}>
            <Text style={{ color: themeColors.desc }}>Jl. Contoh No.123, Jakarta</Text>
          </View>
        </View>

        {/* Ringkasan Pembayaran */}
        <View style={[styles.card, { backgroundColor: themeColors.card, marginTop: 16 }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Ringkasan Pembayaran</Text>
          <View style={styles.row}>
            <Text style={{ color: themeColors.desc }}>Subtotal</Text>
            <Text style={{ color: themeColors.price }}>Rp {price.toLocaleString('id-ID')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ color: themeColors.text, fontWeight: 'bold' }}>Total</Text>
            <Text style={{ color: themeColors.price, fontWeight: 'bold' }}>
              Rp {price.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

        {/* Tombol Bayar */}
        <Pressable
          style={({ pressed }) => [
            styles.payButton,
            { backgroundColor: themeColors.buttonBg, opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={handlePayment}
        >
          <Text style={[styles.payText, { color: themeColors.buttonText }]}>OK</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  card: { borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.12, shadowOffset: { width: 0, height: 4 }, shadowRadius: 6, elevation: 5 },
  productName: { fontWeight: '700', fontSize: 18, marginBottom: 6 },
  productPrice: { fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontWeight: '700', fontSize: 16, marginBottom: 6 },
  sectionDesc: { fontSize: 14, marginBottom: 8 },
  inputBox: { padding: 12, borderRadius: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  payButton: { marginTop: 30, paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.25, shadowOffset: { width: 0, height: 3 }, shadowRadius: 4, elevation: 5 },
  payText: { fontSize: 16, fontWeight: 'bold' },
});
