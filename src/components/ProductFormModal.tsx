import React, { useState } from 'react';
import { Modal, View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

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
  const [errors, setErrors] = useState({ name: '', price: '', image: '' });
  const { isDark } = useTheme();

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', price: '', image: '' };

    if (!name) { newErrors.name = 'Nama produk wajib diisi!'; valid = false; }
    if (!price) { newErrors.price = 'Harga wajib diisi!'; valid = false; }
    else if (isNaN(Number(price))) { newErrors.price = 'Harga harus berupa angka!'; valid = false; }
    if (!image) { newErrors.image = 'URL gambar wajib diisi!'; valid = false; }
    else if (!image.startsWith('http')) { newErrors.image = 'URL gambar tidak valid!'; valid = false; }

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
    <Modal visible={visible} animationType="slide" transparent={false}>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Tambah Produk</Text>

        <View style={styles.field}>
          <TextInput
            placeholder="Nama Produk"
            placeholderTextColor={isDark ? '#aaa' : '#999'}
            value={name}
            onChangeText={text => { setName(text); if (errors.name) setErrors(prev => ({ ...prev, name: '' })); }}
            style={[
              styles.input,
              { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5', color: isDark ? '#fff' : '#000' },
              errors.name ? styles.inputError : null
            ]}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        </View>

        <View style={styles.field}>
          <TextInput
            placeholder="Harga"
            placeholderTextColor={isDark ? '#aaa' : '#999'}
            value={price}
            keyboardType="numeric"
            onChangeText={text => { setPrice(text); if (errors.price) setErrors(prev => ({ ...prev, price: '' })); }}
            style={[
              styles.input,
              { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5', color: isDark ? '#fff' : '#000' },
              errors.price ? styles.inputError : null
            ]}
          />
          {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}
        </View>

        <View style={styles.field}>
          <TextInput
            placeholder="URL Gambar"
            placeholderTextColor={isDark ? '#aaa' : '#999'}
            value={image}
            onChangeText={text => { setImage(text); if (errors.image) setErrors(prev => ({ ...prev, image: '' })); }}
            style={[
              styles.input,
              { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5', color: isDark ? '#fff' : '#000' },
              errors.image ? styles.inputError : null
            ]}
          />
          {errors.image ? <Text style={styles.errorText}>{errors.image}</Text> : null}
        </View>

        <TextInput
          placeholder="Deskripsi (opsional)"
          placeholderTextColor={isDark ? '#aaa' : '#999'}
          value={desc}
          onChangeText={setDesc}
          style={[styles.input, { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5', color: isDark ? '#fff' : '#000' }]}
          multiline
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#007BFF' }]} onPress={handleAdd}>
            <Text style={styles.buttonText}>Tambah</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'gray', marginTop: 8 }]} onPress={onClose}>
            <Text style={styles.buttonText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  field: { marginBottom: 10 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginVertical: 2 },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12, marginTop: 2 },
  title: { fontWeight: 'bold', fontSize: 20, marginBottom: 15, textAlign: 'center' },
  buttonContainer: { marginTop: 20 },
  button: { padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
