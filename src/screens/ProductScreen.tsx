import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, useWindowDimensions } from 'react-native';
import { ProductCard } from '../components/ProductCard';

export const ProductScreen = ({ theme, products }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setOrientation(height > width ? 'portrait' : 'landscape');
  }, [width, height]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const numColumns = orientation === 'portrait' ? 2 : 3;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        key={numColumns}
        data={products}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            image={item.image}
            description={item.description}
            textColor={theme.text}
            bgColor={theme.card}
            index={index}
            numColumns={numColumns}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  row: {
    justifyContent: 'flex-start', // 🔧 hilangkan space di tengah
    flexWrap: 'wrap',
  },
  listContent: {
    paddingBottom: 10,
  },
});
