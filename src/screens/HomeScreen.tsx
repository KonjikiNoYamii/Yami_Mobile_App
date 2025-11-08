import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export const HomeScreen = ({ theme }: any) => (
  <ScrollView style={{ flex: 1, backgroundColor: theme.background, padding: 15 }}>
    <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Selamat Datang di Mini E-Commerce!</Text>
    <Text style={{ color: theme.text, fontSize: 14 }}>
      Anda dapat melihat daftar produk, menambahkan produk baru, serta mengganti tema tampilan.
    </Text>
  </ScrollView>
);