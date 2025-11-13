import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginRequest } from "../api/login";
import { useAuth } from "../context/AuthContext";
 
export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigation = useNavigation<any>();

const handleLogin = async () => {
  try {
    const result = await loginRequest(username, password);

    if (result.success) {
      console.log("Token diterima:", result.token);
      login(result.token); // ✅ kirim token ke context
      navigation.replace("Root", { userID: "U123" });
    } else {
      Alert.alert("Login gagal!", "Periksa username dan password Anda.");
    }
  } catch (error: any) {
    Alert.alert("Error", error.message || "Gagal login");
  }
}; 
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
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
