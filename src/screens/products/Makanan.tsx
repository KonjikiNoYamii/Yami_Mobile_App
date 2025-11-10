import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { initialProducts } from '../../data/products';
import { ProductCard } from '../../components/ProductCard';
import { useIsFocused } from '@react-navigation/native';

export default function Makanan() {
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

    useEffect(() => {
    if (isFocused) {
      console.log("🟢 Tab 'Makanan' sedang aktif");
    } else {
      console.log("🔴 Tab 'Makanan' tidak aktif");
    }

    return () => {
      if (isFocused) console.log("⚪ Membersihkan efek dari tab 'Makanan'");
    };
  }, [isFocused]);

  const products = initialProducts.filter(item => item.category === 'Makanan');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
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
            description={item.description}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  row: {
    justifyContent: 'space-between',
  },
});
