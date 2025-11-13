import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useNetInfo } from '../hooks/useNetInfo'; // ✅ Tambahkan ini_

export default function ProfileScreen() {
  const { userName, setUserName, userAvatar, setUserAvatar } = useUser();
  const { isDark } = useTheme();
  const { isOnline, connectionType } = useNetInfo(); // ✅ Ambil status koneksi

  const [name, setName] = useState(userName);
  const [avatar, setAvatar] = useState(userAvatar);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1e1e1e' : '#f9f9f9' }]}>
      
      {/* 🖼️ Avatar */}
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: avatar }}
          style={styles.avatar}
        />
      </View>

      {/* 🧾 Nama */}
      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Nama</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={[
          styles.input,
          { backgroundColor: isDark ? '#333' : '#fff', color: isDark ? '#fff' : '#000' },
        ]}
      />

      {/* 🧍 Avatar URL */}
      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Avatar URL</Text>
      <TextInput
        value={avatar}
        onChangeText={setAvatar}
        style={[
          styles.input,
          { backgroundColor: isDark ? '#333' : '#fff', color: isDark ? '#fff' : '#000' },
        ]}
      />

      {/* 💾 Tombol Simpan */}
      <Button 
        title="Simpan" 
        onPress={() => {
          setUserName(name);
          setUserAvatar(avatar);
          Alert.alert("Profil sudah diubah!");
        }} 
      />

      {/* 🌐 Status Koneksi */}
      <View style={styles.connectionContainer}>
        <Text style={[styles.statusText, { color: isOnline ? '#4CAF50' : '#F44336' }]}>
          {isOnline ? '🟢 Online' : '🔴 Offline'}
        </Text>
        <Text style={[styles.connectionText, { color: isDark ? '#ccc' : '#555' }]}>
          Jenis koneksi: {connectionType ?? 'Tidak diketahui'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  avatarContainer: { alignItems: 'center', marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#ddd' },
  label: { fontWeight: 'bold', marginBottom: 6 },
  input: { padding: 10, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: '#ccc' },

  // 🌐 Status koneksi
  connectionContainer: {
    marginTop: 24,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  connectionText: {
    fontSize: 14,
  },
});
