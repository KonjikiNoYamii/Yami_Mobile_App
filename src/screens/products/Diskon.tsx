import React from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useProductContext } from "../../context/ProductContext";
import { ProductCard } from "../../components/ProductCard";
import { useTheme } from "../../context/ThemeContext";

export default function Diskon() {
  const { diskon, loading } = useProductContext();
  const { isDark } = useTheme();
  const { width, height } = useWindowDimensions();

  const numColumns = width > height ? 3 : 2;
  const cardWidth = (width - (numColumns + 1) * 8) / numColumns;

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={[styles.loadingText, { color: isDark ? "#fff" : "#333" }]}>
          Memuat produk diskon...
        </Text>
      </View>
    );

  if (!diskon || diskon.length === 0)
    return (
      <View style={styles.center}>
        <Text style={[styles.emptyText, { color: isDark ? "#fff" : "#333" }]}>
          Tidak ada produk diskon saat ini
        </Text>
      </View>
    );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1c1c1c" : "#fff" },
      ]}
    >
      <FlatList
        data={diskon}
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  emptyText: {
    fontSize: 17,
    opacity: 0.6,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
});
