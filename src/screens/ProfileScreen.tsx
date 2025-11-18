import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  Pressable,
} from 'react-native';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useNetInfo } from '../hooks/useNetInfo';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { userName, setUserName, userAvatar, setUserAvatar } = useUser();
  const { isDark } = useTheme();
  const { isOnline, connectionType } = useNetInfo();

  const [name, setName] = useState(userName);
  const [avatar, setAvatar] = useState(userAvatar);
  const navigation = useNavigation<any>();
  const { logout } = useAuth();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#1e1e1e' : '#f9f9f9' },
      ]}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />

        <View style={{ alignItems: 'center', paddingVertical: 2 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: isOnline ? '#4CAF50' : '#F44336', // ✅ langsung inline
            }}
          >
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </Text>
          <Text
            style={{
              fontSize: 13,
              marginTop: 2,
              color: isDark ? '#ccc' : '#555', // ✅ langsung inline
            }}
          >
            Jenis koneksi: {connectionType ?? 'Tidak diketahui'}
          </Text>
        </View>
      </View>

      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>
        Nama
      </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#333' : '#fff',
            color: isDark ? '#fff' : '#000',
          },
        ]}
      />

      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>
        Avatar URL
      </Text>
      <TextInput
        value={avatar}
        onChangeText={setAvatar}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#333' : '#fff',
            color: isDark ? '#fff' : '#000',
          },
        ]}
      />

      <Button
        title="Simpan"
        onPress={() => {
          setUserName(name);
          setUserAvatar(avatar);
          Alert.alert('Profil sudah diubah!');
        }}
      />

      <Pressable
        onPress={() => {
          logout();
          navigation.navigate('Login');
        }}
        style={[styles.logoutButton, { backgroundColor: 'red' }]}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 12,
  },

  // 🌐 Status koneksi di bawah avatar
  // 🌐 Status koneksi di bawah avatar
  connectionContainer: {
    alignItems: 'center',
    paddingVertical: 2, // lebih tipis karena transparan
    paddingHorizontal: 6,
    borderRadius: 12,
    backgroundColor: 'transparent', // ✅ transparan
    minWidth: 160,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '700',
    // textColor hijau/merah tetap, sesuai isOnline
  },
  connectionText: {
    fontSize: 13,
    marginTop: 2,
  },

  label: { fontWeight: 'bold', marginBottom: 6 },
  input: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  logoutButton: {
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});
