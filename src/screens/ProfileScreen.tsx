import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useNetInfo } from '../hooks/useNetInfo';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { userName, userAvatar } = useUser(); // <-- pakai context
  const { isDark } = useTheme();
  const { isOnline, connectionType } = useNetInfo();
  const navigation = useNavigation<any>();
  const { logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f5f5f5' }]}>
      {/* Avatar & Nama */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: userAvatar }} style={styles.avatar} />
        <Text style={[styles.userName, { color: isDark ? '#fff' : '#000' }]}>{userName}</Text>

        {/* Status koneksi */}
        <View style={styles.connectionContainer}>
          <Text style={[styles.statusText, { color: isOnline ? '#4CAF50' : '#F44336' }]}>
            {isOnline ? '🟢 Online' : '🔴 Offline'}
          </Text>
          <Text style={[styles.connectionText, { color: isDark ? '#ccc' : '#555' }]}>
            Jenis koneksi: {connectionType ?? 'Tidak diketahui'}
          </Text>
        </View>
      </View>

      {/* Tombol Lengkapi Profil */}
      <Pressable
        style={styles.primaryButton}
        onPress={() => navigation.navigate('CompleteProfile')}
      >
        <Text style={styles.primaryButtonText}>Lengkapi Profil</Text>
      </Pressable>

      {/* Tombol Tambah Produk */}
      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('CreateProduct')}
      >
        <Text style={styles.secondaryButtonText}>Tambah Produk</Text>
      </Pressable>

      {/* Tombol Logout */}
      <Pressable
        style={[styles.secondaryButton, { backgroundColor: '#e74c3c' }]}
        onPress={async () => {
          await logout();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          );
        }}
      >
        <Text style={styles.secondaryButtonText}>Logout</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center' },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 40,
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    width: '100%',
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 12 },
  userName: { fontSize: 22, fontWeight: '700', marginBottom: 8 },

  connectionContainer: {
    marginTop: 8,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  statusText: { fontSize: 16, fontWeight: '600' },
  connectionText: { fontSize: 13, marginTop: 2 },

  primaryButton: {
    width: '90%',
    padding: 14,
    backgroundColor: '#007bff',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },

  secondaryButton: {
    width: '90%',
    padding: 14,
    backgroundColor: '#2ecc71',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
