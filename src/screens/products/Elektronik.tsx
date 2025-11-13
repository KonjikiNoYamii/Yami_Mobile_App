import React, { useState } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { initialProducts } from '../../data/products';
import { useTheme } from '../../context/ThemeContext';
import { ProductCard } from '../../components/ProductCard';

export default function Elektronik() {
    const [refreshing, setRefreshing] = useState(false);
  const { isDark } = useTheme();
  const { width, height } = useWindowDimensions();

  // 🌸 orientasi responsif
  const numColumns = width > height ? 3 : 2;
  const cardWidth = (width - (numColumns + 1) * 8) / numColumns;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#222' : '#fff' },
      ]}
    >
      <FlatList
        data={initialProducts.filter(item => item.category === "Elektronik")}
        key={numColumns} // 🔁 agar re-render ketika orientasi berubah
        keyExtractor={(item) => String(item.id)} // ✅ pastikan string
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            description={item.desc}
            isDark={isDark}
            cardWidth={cardWidth}
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
  row: { justifyContent: 'space-between' },
});
