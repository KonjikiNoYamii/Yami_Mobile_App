import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginRequest } from '../api/login';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../storage/storageService';
import { STORAGE_KEYS } from '../storage/storageKeys';
import { biometricPrompt, getBiometryType } from '../services/biometricService';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation<any>();
  const [biometryType, setBiometryType] = useState<"FaceID" | "TouchID" | "None">("None");


  useEffect(() => {
  async function loadBio() {
    const type = await getBiometryType();
    setBiometryType(type);
  }
  loadBio();
}, []);

  useEffect(() => {
    const params = (navigation as any).getState()?.routes?.at(-1)?.params;

    if (params?.quickUser) {
      setUsername(params.quickUser);
    }
  }, [navigation]);

  const handleLogin = async () => {
      let promptMessage = "";

  if (biometryType === "None") {
  return Alert.alert("Biometrik Tidak Tersedia", "Gunakan login manual.");
}    
  if (biometryType === "FaceID") {
    promptMessage = "Pindai Wajah untuk Masuk";
  } else if (biometryType === "TouchID") {
    promptMessage = "Tempelkan Jari untuk Masuk";
  }

  const bio = await biometricPrompt(promptMessage);

  if (!bio.success) {
    return; // gagal biometrik atau lockout
  }
    try {
      const result = await loginRequest(username, password);

      if (result.success) {
        await login(result.token);

        await StorageService.set(STORAGE_KEYS.LAST_LOGIN, username);

        const route = navigation.getState()?.routes?.at(-1);
        const redirectTo = route?.params?.redirectTo;
        const params = route?.params?.params;

        if (redirectTo) {
          navigation.replace(redirectTo, params);
        } else {
          navigation.replace('Root', { userID: 'U123' });
        }
      } else {
        Alert.alert('Login gagal!', 'Periksa username dan password Anda.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Gagal login');
    }
  };

  useEffect(() => {
    const loadLastLogin = async () => {
      const lastUser = await StorageService.get<string>(
        STORAGE_KEYS.LAST_LOGIN,
      );
      if (lastUser) {
        setUsername(lastUser); // auto-fill
      }
    };

    loadLastLogin();
  }, []);

  //username: 'emilys',
  //password: 'emilyspass',

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Masuk</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
