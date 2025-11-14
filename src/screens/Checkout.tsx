import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { submitCheckout } from '../api/CheckoutService';

export default function Checkout() {
  const { isDark } = useTheme();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { id, name, price } = route.params;

  const [alamat, setAlamat] = useState('');
  const [errors, setErrors] = useState<any>({});     // <<— ERROR dari server

  const themeColors = {
    bg: isDark ? '#1e1e1e' : '#f9f9f9',
    card: isDark ? '#2a2a2a' : '#fff',
    text: isDark ? '#fff' : '#222',
    desc: isDark ? '#ccc' : '#555',
    price: isDark ? '#f5a623' : '#e67e22',
    buttonBg: isDark ? '#f5a623' : '#e67e22',
    buttonText: isDark ? '#1e1e1e' : '#fff',
    inputBg: isDark ? '#3a3a3a' : '#f2f2f2',
    error: '#ff4d4d',
  };

  const handleSubmit = async () => {
    setErrors({}); // reset

    try {
      await submitCheckout({
        product_id: id,
        alamat: alamat,
      });

      navigation.navigate("CartScreen");

    } catch (err: any) {
      if (err.type === "VALIDATION_ERROR") {
        setErrors(err.errors);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Checkout</Text>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        
        {/* PRODUK */}
        <View style={[styles.card, { backgroundColor: themeColors.card }]}>
          <Text style={[styles.productName, { color: themeColors.text }]}>{name}</Text>
          <Text style={[styles.productPrice, { color: themeColors.price }]}>
            Rp {price.toLocaleString('id-ID')}
          </Text>
        </View>

        {/* ALAMAT */}
        <View style={[styles.card, { backgroundColor: themeColors.card, marginTop: 16 }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Alamat Pengiriman</Text>

          <View
            style={[
              styles.inputBox,
              { backgroundColor: themeColors.inputBg, borderColor: errors.alamat ? themeColors.error : "#444" },
            ]}
          >
            <Text
              style={{
                color: alamat ? themeColors.text : themeColors.desc,
              }}
              onPress={() => {}}
            >
              {alamat || "Masukkan alamat lengkap"}
            </Text>
          </View>

          {errors.alamat && (
            <Text style={{ color: themeColors.error, marginTop: 4, fontSize: 13 }}>
              {errors.alamat}
            </Text>
          )}
        </View>

        {/* RINGKASAN */}
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

        {/* BUTTON */}
        <Pressable
          style={({ pressed }) => [
            styles.payButton,
            { backgroundColor: themeColors.buttonBg, opacity: pressed ? 0.8 : 1 },
          ]}
          onPress={handleSubmit}
        >
          <Text style={[styles.payText, { color: themeColors.buttonText }]}>Bayar Sekarang</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  card: { borderRadius: 12, padding: 16, elevation: 5 },
  productName: { fontWeight: '700', fontSize: 18, marginBottom: 6 },
  productPrice: { fontWeight: 'bold', fontSize: 16 },
  sectionTitle: { fontWeight: '700', fontSize: 16, marginBottom: 6 },
  inputBox: { padding: 12, borderRadius: 8, borderWidth: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  payButton: { marginTop: 30, paddingVertical: 14, borderRadius: 12, alignItems: 'center', elevation: 5 },
  payText: { fontSize: 16, fontWeight: 'bold' },
});
