import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { isLoggedIn, logout } = useAuth();
  const { name, avatar, updateProfile } = useProfile();
  const [newName, setNewName] = useState(name);
  const [newAvatar, setNewAvatar] = useState(avatar);
  const navigation = useNavigation<any>();

  useEffect(() => {
    if (!isLoggedIn) {
      Alert.alert('Harap login terlebih dahulu');
      const timer = setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.warning}>🔒 Harap login untuk mengakses halaman ini</Text>
      </View>
    );
  }

  const handleSave = () => {
    updateProfile(newName, newAvatar);
    Alert.alert('Profil berhasil diperbarui!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profil Pengguna</Text>

      <TextInput
        style={styles.input}
        placeholder="Masukkan Nama Baru"
        value={newName}
        onChangeText={setNewName}
      />
      <TextInput
        style={styles.input}
        placeholder="Masukkan URL Foto Profil"
        value={newAvatar}
        onChangeText={setNewAvatar}
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Simpan Perubahan</Text>
      </Pressable>

      <Pressable style={[styles.button, { backgroundColor: 'red' }]} onPress={logout}>
        <Text style={styles.buttonText}>Keluar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  warning: { fontSize: 16, color: 'red' },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: { backgroundColor: '#007bff', padding: 10, borderRadius: 8, marginTop: 8, width: '90%' },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
