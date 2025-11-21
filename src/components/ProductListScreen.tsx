// components/ProductListScreen.tsx
import React, { useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { ProductCard } from "./ProductCard";

interface ProductListScreenProps {
  products?: any[];
  loading?: boolean;
  error?: string | null;
  title?: string;
  fetchData?: () => Promise<void>; // opsional untuk pull-to-refresh
  emptyMessage?: string;
}

export const ProductListScreen: React.FC<ProductListScreenProps> = ({
  products = [],
  loading = false,
  error,
  title,
  fetchData,
  emptyMessage = "Tidak ada produk",
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const { isDark } = useTheme();
  const { width, height } = useWindowDimensions();

  const numColumns = width > height ? 3 : 2;
  const cardWidth = (width - (numColumns + 1) * 8) / numColumns;

  const onRefresh = async () => {
    if (!fetchData) return;
    setRefreshing(true);
    try {
      await fetchData();
    } finally {
      setRefreshing(false);
    }
  };

  // Loading state
  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={[styles.text, { color: isDark ? "#fff" : "#333" }]}>
          Memuat produk...
        </Text>
      </View>
    );

  // Error state
  if (error)
    return (
      <View style={styles.center}>
        <Text style={[styles.errorText, { color: isDark ? "#f88" : "#c00" }]}>
          {error}
        </Text>
        {fetchData && (
          <Text
            onPress={onRefresh}
            style={{
              marginTop: 10,
              color: isDark ? "#00f" : "#0077cc",
              textDecorationLine: "underline",
            }}
          >
            Coba lagi
          </Text>
        )}
      </View>
    );

  // Empty state
  if (!products || products.length === 0)
    return (
      <View style={styles.center}>
        <Text style={[styles.emptyText, { color: isDark ? "#fff" : "#333" }]}>
          {emptyMessage}
        </Text>
      </View>
    );

  // Render FlatList
  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#1c1c1c" : "#fff" }]}>
      {title && (
        <Text style={[styles.title, { color: isDark ? "#fff" : "#333" }]}>
          {title}
        </Text>
      )}
      <FlatList
        data={products}
        key={numColumns}
        keyExtractor={(item) => String(item.id)}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            title={item.title}
            price={item.price}
            thumbnail={item.thumbnail}
            description={item.description}
            isDark={isDark}
            cardWidth={cardWidth}
          />
        )}
        refreshControl={
          fetchData ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: "center",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
});
