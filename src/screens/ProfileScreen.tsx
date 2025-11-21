import React, { useEffect, useState } from 'react';
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
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { userName, setUserName, userAvatar, setUserAvatar } = useUser();
  const { isDark } = useTheme();
  const { isOnline, connectionType } = useNetInfo();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { logout } = useAuth();

  // Ambil userId dari route.params (deep linking)
  const { userId } = route.params || {};

  // State form tetap dari context
  const [name, setName] = useState(userName);
  const [avatar, setAvatar] = useState(userAvatar);

  // Validasi userId dari deep link
  useEffect(() => {
    if (!userId) {
      // Redirect ke Home jika userId tidak ada / invalid
      navigation.replace('Login');
    } else {
      


    }
  }, [userId]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#1e1e1e' : '#f9f9f9' },
      ]}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />

        {/* Status koneksi seperti sebelumnya */}
        <View style={styles.connectionContainer}>
          <Text
            style={[
              styles.statusText,
              { color: isOnline ? '#4CAF50' : '#F44336' },
            ]}
          >
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </Text>
          <Text
            style={[
              styles.connectionText,
              { color: isDark ? '#ccc' : '#555' },
            ]}
          >
            Jenis koneksi: {connectionType ?? 'Tidak diketahui'}
          </Text>
        </View>
      </View>

      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Nama</Text>
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

      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Avatar URL</Text>
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
  onPress={async () => {
    await logout(); // hapus token + storage
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
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

  // Status koneksi tetap seperti versi sebelumnya
  connectionContainer: {
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 12,
    backgroundColor: 'transparent', // transparan sesuai permintaan Master
    minWidth: 160,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '700',
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
