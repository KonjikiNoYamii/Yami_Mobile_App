import React, { useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import { initialProducts } from '../data/Product';
import { useTheme } from '../context/ThemeContext';
import { Navbar } from '../components/Navbar';

export const ProductScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState(initialProducts);
  const { isDark } = useTheme();

  // Callback untuk menambahkan produk baru
  const handleAddProduct = (product: any) => {
    setProducts(prev => [...prev, product]);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#ffffff' },
      ]}
    >
      <Navbar
        onAddProduct={() =>
          navigation.navigate('AddProduct', { onSubmit: handleAddProduct })
        }
      />

      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#ffffff' : '#000000' }]}>
          Daftar Produk
        </Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: isDark ? '#1e1e1e' : '#f9f9f9',
                borderColor: isDark ? '#333' : '#ccc',
              },
            ]}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={[styles.name, { color: isDark ? '#fff' : '#000' }]}>
                {item.name}
              </Text>
              <Text style={{ color: isDark ? '#bbb' : '#333' }}>Rp {item.price}</Text>
              <Text style={{ color: isDark ? '#999' : '#666', fontSize: 12 }}>
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginBottom: 15 },
  title: { fontSize: 20, fontWeight: 'bold' },
  card: { flexDirection: 'row', borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 10 },
  image: { width: 100, height: 100, borderRadius: 10 },
  info: { flex: 1, paddingLeft: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
});
