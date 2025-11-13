import React, { useCallback, useState } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  Button,
} from 'react-native';
import { initialProducts } from '../../data/products';
import { useTheme } from '../../context/ThemeContext';
import { ProductCard } from '../../components/ProductCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function Populer() {
  const [refreshing, setRefreshing] = useState(false);
  const { isDark } = useTheme();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation<any>();

  // 🌸 Orientasi responsif
  const numColumns = width > height ? 3 : 2;
  const cardWidth = (width - (numColumns + 1) * 8) / numColumns;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }; 

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        title: 'Product ter Populer!',
      });
      return () => {
        navigation.getParent()?.setOptions({
          title: 'Jelajahi Produk',
        });
      };
    }, [navigation]),
  );

  // 🌸 Fungsi toggle drawer
  const handleToggleDrawer = () => {
    // naik ke parent drawer dari tab
    const drawerNav = navigation.getParent()?.getParent()?.getParent();
    drawerNav?.toggleDrawer();
  };

  // 🌸 Render header (berisi tombol)
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Button title=" ☰ " onPress={handleToggleDrawer} />
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: isDark ? '#222' : '#fff' }]}
    >
      <FlatList
        data={initialProducts.filter(item => item.category === 'Populer')}
        key={numColumns}
        keyExtractor={item => String(item.id)}
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
        ListHeaderComponent={renderHeader} // 🌸 tombol di atas list
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  row: { justifyContent: 'space-between' },
  headerContainer: {
    marginBottom: 8,
    alignItems: 'flex-start',
  },
});
