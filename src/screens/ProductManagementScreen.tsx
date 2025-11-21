// screens/ProductManagementScreen.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useProductContext } from "../context/ProductContext";

export default function ProductManagementScreen() {
  const { products, deleteProduct } = useProductContext();

  const renderItem = ({ item } : any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.price}>Rp {item.price}</Text>

      <View style={styles.row}>
        {/* Tombol Detail */}
        <TouchableOpacity style={styles.detailBtn}>
          <Text style={styles.detailText}>Detail</Text>
        </TouchableOpacity>

        {/* Tombol Hapus */}
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteProduct(item.id)}
        >
          <Text style={styles.deleteText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manajemen Produk</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ marginTop: 20, textAlign: "center" }}>
            Belum ada produk 🥺
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  title: { fontSize: 18, fontWeight: "700" },
  desc: { marginTop: 4, opacity: 0.7 },
  price: { marginTop: 6, fontWeight: "bold" },
  row: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  deleteBtn: {
    backgroundColor: "#d9534f",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
  detailBtn: {
    backgroundColor: "#0275d8",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  detailText: { color: "#fff", fontWeight: "bold" },
});
