// components/AddProductButton.tsx
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import ProductFormModal from './ProductFormModal';

export function AddProductButton({ onAdd }: { onAdd: (p: any) => void }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.addButton} onPress={() => setVisible(true)}>
        <Ionicons name="add" size={26} color="#fff" />
      </TouchableOpacity>

      <ProductFormModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={(p) => {
          onAdd(p);
          setVisible(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
});
