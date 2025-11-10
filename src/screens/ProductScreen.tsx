import React, { useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { initialProducts } from '../data/products';
import { useTheme } from '../context/ThemeContext';

export const ProductScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isDark } = useTheme(); // 🌙 ambil nilai tema

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const products = initialProducts;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#222' : '#fff' }]}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            image={item.image}
            description={item.desc}
            isDark={isDark} // optional kalau card mendukung tema
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  row: { justifyContent: 'space-between' },
});
