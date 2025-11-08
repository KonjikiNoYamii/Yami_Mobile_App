import React, { useState } from 'react';
import { Modal, View, TextInput, Text, Button, StyleSheet, ScrollView } from 'react-native';

interface ProductFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (product: any) => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ visible, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    price: '',
    image: ''
  });

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', price: '', image: '' };

    if (!name) {
      newErrors.name = 'Nama produk wajib diisi!';
      valid = false;
    }
    if (!price) {
      newErrors.price = 'Harga wajib diisi!';
      valid = false;
    } else if (isNaN(Number(price))) {
      newErrors.price = 'Harga harus berupa angka!';
      valid = false;
    }
    if (!image) {
      newErrors.image = 'URL gambar wajib diisi!';
      valid = false;
    } else if (!image.startsWith('http')) {
      newErrors.image = 'URL gambar tidak valid!';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAdd = () => {
    if (!validate()) return;
    onSubmit({ id: Date.now().toString(), name, price: Number(price), image, description: desc });
    setName(''); setPrice(''); setImage(''); setDesc('');
    setErrors({ name: '', price: '', image: '' });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Tambah Produk</Text>

        <View style={styles.field}>
          <TextInput
            placeholder="Nama Produk"
            value={name}
            onChangeText={text => { setName(text); if (errors.name) setErrors(prev => ({ ...prev, name: '' })); }}
            style={[styles.input, errors.name ? styles.inputError : null]}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        </View>

        <View style={styles.field}>
          <TextInput
            placeholder="Harga"
            value={price}
            keyboardType="numeric"
            onChangeText={text => { setPrice(text); if (errors.price) setErrors(prev => ({ ...prev, price: '' })); }}
            style={[styles.input, errors.price ? styles.inputError : null]}
          />
          {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}
        </View>

        <View style={styles.field}>
          <TextInput
            placeholder="URL Gambar"
            value={image}
            onChangeText={text => { setImage(text); if (errors.image) setErrors(prev => ({ ...prev, image: '' })); }}
            style={[styles.input, errors.image ? styles.inputError : null]}
          />
          {errors.image ? <Text style={styles.errorText}>{errors.image}</Text> : null}
        </View>

        <TextInput
          placeholder="Deskripsi (opsional)"
          value={desc}
          onChangeText={setDesc}
          style={styles.input}
          multiline
        />

        <View style={styles.buttonContainer}>
          <Button title="Tambah" onPress={handleAdd} />
          <View style={{ height: 8 }} />
          <Button title="Tutup" color="gray" onPress={onClose} />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, justifyContent: 'center' },
  field: { marginBottom: 10 },
  input: { borderWidth: 1, borderRadius: 5, padding: 8, marginVertical: 2 },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginTop: 2 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 15, textAlign: 'center' },
  buttonContainer: { marginTop: 10 },
});