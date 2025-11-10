import React, { useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { ProductCard } from '../components/ProductCard';

export const ProductScreen = ({ theme, products }: any) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
            textColor={theme.text}
            bgColor={theme.card}
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
  row: {
    justifyContent: 'space-between',
  },
});
