import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useImagePicker } from "../hooks/useImagePicker";
import PhotoPreviewList from "../components/PhotoPreviewList";
import { useProductContext, Product } from "../context/ProductContext";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

export default function CreateProductScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigation = useNavigation<any>();

  const { photos, openGallery } = useImagePicker();
  const { addProduct } = useProductContext();
  const { isDark } = useTheme();

  const submitProduct = () => {
    if (!title || !description || !price || photos.length === 0) {
      Alert.alert("Semua field dan foto wajib diisi!");
      return;
    }

    // 💡 Pastikan tipe Product sesuai context
    const newProduct: Product = {
      id: Date.now(),
      title,
      description,
      price: Number(price),
      thumbnail: photos[0],   // foto pertama sebagai thumbnail
      images: photos,         // semua foto
      isCustom: true,         // tanda custom product
      createdAt: Date.now(),
    };

    addProduct(newProduct);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Nama Produk</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Masukkan nama produk"
        placeholderTextColor={isDark ? "#aaa" : "#888"}
        style={[styles.input, { backgroundColor: isDark ? '#1e1e1e' : '#f9f9f9', color: isDark ? '#fff' : '#000' }]}
      />

      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Deskripsi</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Masukkan deskripsi"
        placeholderTextColor={isDark ? "#aaa" : "#888"}
        style={[styles.input, { height: 80, backgroundColor: isDark ? '#1e1e1e' : '#f9f9f9', color: isDark ? '#fff' : '#000' }]}
        multiline
      />

      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Harga</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Harga"
        placeholderTextColor={isDark ? "#aaa" : "#888"}
        keyboardType="numeric"
        style={[styles.input, { backgroundColor: isDark ? '#1e1e1e' : '#f9f9f9', color: isDark ? '#fff' : '#000' }]}
      />

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#007bff' }]}
        onPress={openGallery}
      >
        <Text style={styles.btnText}>Tambah Foto</Text>
      </TouchableOpacity>

      <PhotoPreviewList photos={photos} />

      <TouchableOpacity
        style={[styles.btn, { marginTop: 20, backgroundColor: '#28a745' }]}
        onPress={submitProduct}
      >
        <Text style={styles.btnText}>Simpan Produk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, marginTop: 10, fontWeight: "600" },
  input: {
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  btn: {
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "700" },
});
