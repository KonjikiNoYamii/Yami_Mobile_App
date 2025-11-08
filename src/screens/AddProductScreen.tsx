import React, { useState } from 'react';
import { ProductFormModal } from '../components/ProductFormModal';
import { View } from 'react-native';

export const AddProductScreen = ({ navigation, route }: any) => {
  const [modalVisible, setModalVisible] = useState(true); // langsung muncul

  const handleSubmit = (product: any) => {
    // Master bisa pakai route.params.onSubmit jika dikirim dari ProductScreen
    if (route.params?.onSubmit) {
      route.params.onSubmit(product);
    }
    setModalVisible(false);
    navigation.goBack(); // kembali ke ProductScreen
  };

  return (
    <View style={{ flex: 1 }}>
      <ProductFormModal
        visible={modalVisible}
        onClose={() => {
  setModalVisible(false);
  navigation.navigate('MainTabs'); // bukan goBack()
}}

        onSubmit={handleSubmit}
      />
    </View>
  );
};
