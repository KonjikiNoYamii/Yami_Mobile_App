import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions, Asset } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CompleteProfileScreen() {
  const { userName, setUserName, userAvatar, setUserAvatar } = useUser();
  const { isDark } = useTheme();

  const [name, setName] = useState(userName);
  const [avatar, setAvatar] = useState(userAvatar);

  // KTP
  const [ktpPhoto, setKtpPhoto] = useState<Asset | null>(null);
  const [uploadingKTP, setUploadingKTP] = useState(false);

  // Avatar tap
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Load KTP preview Base64
  const loadKtpPhoto = async () => {
    const stored = await AsyncStorage.getItem("@user:ktpPhoto");
    if (stored) setKtpPhoto(JSON.parse(stored));
  };

  useEffect(() => {
    loadKtpPhoto();
  }, []);

  // Save profile name & avatar
  const saveProfile = () => {
    setUserName(name);
    setUserAvatar(avatar);
    Alert.alert("Profil berhasil diperbarui!");
  };

  /** Fungsi Ambil Foto Avatar / KTP **/
  const handlePickAvatarOrKtp = async (isAvatar: boolean) => {
    Alert.alert(
      "Pilih Sumber Foto",
      "",
      [
        { text: "Kamera", onPress: () => handleLaunchCamera(isAvatar) },
        { text: "Galeri", onPress: () => handleLaunchGallery(isAvatar) },
        { text: "Batal", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  /** Camera **/
  const handleLaunchCamera = async (isAvatar: boolean) => {
    try {
      if (!isAvatar && Platform.OS === "android") {
        // Minta izin simpan galeri
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Izin Penyimpanan",
            message: "Aplikasi membutuhkan izin untuk menyimpan foto KTP di galeri.",
            buttonNeutral: "Tanya Nanti",
            buttonNegative: "Tolak",
            buttonPositive: "Izinkan",
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Foto tidak akan disimpan di galeri publik");
        }
      }

      setUploadingAvatar(isAvatar);
      setUploadingKTP(!isAvatar);

      const options: CameraOptions = {
        quality: 0.7,
        saveToPhotos: !isAvatar,
        includeBase64: !isAvatar, // Base64 untuk preview offline KTP
      };
      const result = await launchCamera(options);

      if (result.didCancel) return;

      if (result.errorCode === "camera_unavailable") {
        Alert.alert(
          "Kamera tidak bisa dibuka",
          "Gunakan Galeri sebagai alternatif?",
          [{ text: "OK", onPress: () => handleLaunchGallery(isAvatar) }]
        );
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        if (isAvatar) {
          setAvatar(asset.uri ?? "");
          setUserAvatar(asset.uri ?? "");
        } else {
          setKtpPhoto(asset);
          if (asset.base64) {
            AsyncStorage.setItem("@user:ktpPhoto", JSON.stringify(asset));
          }
        }
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Terjadi kesalahan saat membuka kamera");
    } finally {
      setUploadingAvatar(false);
      setUploadingKTP(false);
    }
  };

  /** Galeri **/
  const handleLaunchGallery = async (isAvatar: boolean) => {
    try {
      setUploadingAvatar(isAvatar);
      setUploadingKTP(!isAvatar);

      const options: ImageLibraryOptions = {
        selectionLimit: isAvatar ? 1 : 1,
        maxWidth: isAvatar ? 600 : 300,
        maxHeight: isAvatar ? 600 : 300,
        quality: isAvatar ? 0.7 : 0.7,
        includeBase64: !isAvatar,
      };
      const result = await launchImageLibrary(options);

      if (result.didCancel) return;

      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        if (isAvatar) {
          setAvatar(asset.uri ?? "");
          setUserAvatar(asset.uri ?? "");
        } else {
          setKtpPhoto(asset);
          if (asset.base64) {
            AsyncStorage.setItem("@user:ktpPhoto", JSON.stringify(asset));
          }
        }
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Terjadi kesalahan saat membuka galeri");
    } finally {
      setUploadingAvatar(false);
      setUploadingKTP(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f5f5f5" }]}>
      {/* Avatar */}
      <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>Avatar</Text>
      <Pressable onPress={() => handlePickAvatarOrKtp(true)}>
        <Image
          source={{ uri: avatar }}
          style={[styles.avatarImage, { borderColor: isDark ? "#fff" : "#000" }]}
        />
        {uploadingAvatar && <ActivityIndicator style={styles.avatarOverlay} color="#fff" />}
      </Pressable>

      {/* Nama */}
      <Text style={[styles.label, { color: isDark ? "#fff" : "#000" }]}>Nama Lengkap</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={[styles.input, { backgroundColor: isDark ? "#333" : "#fff", color: isDark ? "#fff" : "#000" }]}
      />

      <Pressable style={styles.primaryButton} onPress={saveProfile}>
        <Text style={styles.primaryButtonText}>Simpan Data Diri</Text>
      </Pressable>

      {/* KTP */}
      <Text style={[styles.label, { color: isDark ? "#fff" : "#000", marginTop: 20 }]}>Foto KTP (Backup)</Text>
      <Pressable onPress={() => handlePickAvatarOrKtp(false)}>
        {ktpPhoto ? (
          <Image source={{ uri: ktpPhoto.uri }} style={styles.ktpImage} />
        ) : (
          <Text style={{ color: isDark ? "#ccc" : "#555", marginTop: 5 }}>Belum ada foto</Text>
        )}
        {uploadingKTP && <ActivityIndicator style={styles.ktpOverlay} color="#fff" />}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontWeight: "bold", marginBottom: 6 },
  input: { padding: 10, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: "#ccc" },
  primaryButton: { padding: 14, backgroundColor: "#007bff", borderRadius: 12, alignItems: "center", marginTop: 10 },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
  avatarImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 16, borderWidth: 2 },
  avatarOverlay: { position: "absolute", top: 50, left: 50 },
  ktpImage: { width: 200, height: 120, borderRadius: 8, marginTop: 10 },
  ktpOverlay: { position: "absolute", top: 50, left: 80 },
});
