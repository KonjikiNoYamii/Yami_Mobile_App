import React, { useState } from 'react';
import { View, Button } from 'react-native';
import ProductFormModal from '../components/ProductFormModal';

export const AddProductScreen = ({ addProduct }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = (product: any) => {
    addProduct({
      id: String(Date.now()),
      name: product.name,
      price: product.price,
      description: product.description || 'Tidak ada deskripsi',
      image: product.image || 'https://placehold.co/100x100',
    });
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Tambah Produk Baru" onPress={() => setModalVisible(true)} />
      <ProductFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </View>
  );
};
