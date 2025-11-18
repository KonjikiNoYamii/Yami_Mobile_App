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
import { useTheme } from "../../context/ThemeContext";
import { ProductCard } from "../../components/ProductCard";
import { useProductContext } from "../../context/ProductContext";

export default function AllProducts() {
  const [refreshing, setRefreshing] = useState(false);
  const { isDark } = useTheme();
  const { width, height } = useWindowDimensions();

  // 🔥 ambil data dari cache global
  const { products, loading, error, refresh } = useProductContext();

  const numColumns = width > height ? 3 : 2;
  const cardWidth = (width - (numColumns + 1) * 8) / numColumns;

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh(); // ambil ulang dari server
    setRefreshing(false);
  };

  // Loading global
  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={[styles.text, { color: isDark ? "#fff" : "#333" }]}>
          Memuat produk...
        </Text>
      </View>
    );

  // Error global
  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>

        <Text style={{ marginTop: 10, opacity: 0.6 }}>
          Tarik ke bawah untuk mencoba lagi
        </Text>
      </View>
    );

  // Semua OK → render data
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1c1c1c" : "#fff" },
      ]}
    >
      <FlatList
        data={products}
        key={numColumns}
        keyExtractor={(item) => String(item.id)}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

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
  errorText: {
    fontSize: 16,
    fontWeight: "600",
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
