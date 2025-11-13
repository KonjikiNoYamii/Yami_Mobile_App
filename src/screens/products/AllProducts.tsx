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
import { useProducts } from "../../hooks/useProducts";
import { useNetInfo } from "../../hooks/useNetInfo";

export default function AllProducts() {
  const [refreshing, setRefreshing] = useState(false);
  const { isDark } = useTheme();
  const { width, height } = useWindowDimensions();
  const { connectionType } = useNetInfo();
  const { products, loading, error, isOnline } = useProducts();

  const numColumns = width > height ? 3 : 2;
  const cardWidth = (width - (numColumns + 1) * 8) / numColumns;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Saat data sedang dimuat
  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={[styles.text, { color: isDark ? "#fff" : "#333" }]}>
          Memuat produk...
        </Text>
      </View>
    );

  // Saat ada error
  if (error)
    return (
      <View style={styles.center}>
        <Text style={[styles.errorText, { color: isDark ? "#ff8888" : "red" }]}>
          {error}
        </Text>
      </View>
    );

  // Saat tidak ada koneksi internet
  if (!isOnline)
    return (
      <View
        style={[
          styles.center,
          { backgroundColor: isDark ? "#111" : "#f9f9f9" },
        ]}
      >
        <Text style={styles.offlineText}>
          🔴 Anda sedang Offline. Cek koneksi Anda.
        </Text>
        <Text style={styles.connectionLabel}>
          🔌 Status: Offline (Tidak ada koneksi)
        </Text>
      </View>
    );

  // Saat online
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
            name={item.title}
            price={item.price}
            image={item.image}
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
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.connectionLabel}>
              🟢 Online ({connectionType ?? "Tidak diketahui"})
            </Text>
          </View>
        }
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
  offlineText: {
    fontSize: 16,
    fontWeight: "600",
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  connectionLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    padding: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 6,
    width: "80%",
    alignSelf: "center",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  footer: {
    marginTop: 10,
    marginBottom: 20,
  },
});
