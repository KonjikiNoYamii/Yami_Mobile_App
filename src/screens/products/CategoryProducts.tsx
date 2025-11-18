import React, { useState } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
  useWindowDimensions
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useCategoryProducts } from "../../hooks/useCategoryProducts";
import { ProductCard } from "../../components/ProductCard";
import { useNetInfo } from "../../hooks/useNetInfo";

interface Props {
  route: { params: { category: string } };
}

export default function CategoryScreen({ route }: Props) {
  const { category } = route.params;
  const { isDark } = useTheme();
  const { connectionType } = useNetInfo();

  const { products, loading, error, isOnline, retry } =
    useCategoryProducts(category);

  const { width, height } = useWindowDimensions();
  const numColumns = width > height ? 3 : 2;
  const cardWidth = (width - (numColumns + 1) * 8) / numColumns;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    retry();
    setTimeout(() => setRefreshing(false), 800);
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={[styles.text, { color: isDark ? "#fff" : "#333" }]}>
          Memuat produk kategori {category}...
        </Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>

        <Pressable
          onPress={retry}
          style={{ marginTop: 10, padding: 10, backgroundColor: "orange" }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            Coba Lagi Manual
          </Text>
        </Pressable>
      </View>
    );

  if (!isOnline)
    return (
      <View style={[styles.center, { backgroundColor: isDark ? "#111" : "#fafafa" }]}>
        <Text style={styles.errorText}>🔴 Offline</Text>
        <Text style={styles.connectionLabel}>Tidak ada koneksi internet</Text>
      </View>
    );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#1c1c1c" : "#fff" }]}>
      <FlatList
        data={products}
        key={numColumns}
        keyExtractor={(item) => String(item.id)}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            name={item.title}
            price={item.price}
            image={item.thumbnail}
            description={item.description}
            isDark={isDark}
            cardWidth={cardWidth}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <Text style={styles.connectionLabel}>
            🟢 Online ({connectionType})
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { marginTop: 8, fontSize: 16 },
  row: { justifyContent: "space-between", marginBottom: 12 },
  errorText: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  connectionLabel: {
    marginTop: 10,
    padding: 8,
    fontSize: 13,
    textAlign: "center",
    color: "#666",
  }
});
