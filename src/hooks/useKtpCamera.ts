import { useState } from "react";
import { Alert, Platform } from "react-native";
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions, Asset } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useKtpCamera = () => {
  const [ktpPhoto, setKtpPhoto] = useState<{ uri: string; fileName: string } | null>(null);
  const [uploading, setUploading] = useState(false);

  // Load photo dari storage saat inisialisasi
  const loadKtpPhoto = async () => {
    const stored = await AsyncStorage.getItem("@user:ktpPhoto");
    if (stored) setKtpPhoto(JSON.parse(stored));
  };

  // Simpan ke AsyncStorage
  const saveKtpPhoto = async (photo: { uri: string; fileName: string }) => {
    setKtpPhoto(photo);
    await AsyncStorage.setItem("@user:ktpPhoto", JSON.stringify(photo));
  };

  // Buka kamera dengan pengecekan error
  const openCamera = async () => {
    const options: CameraOptions = {
      mediaType: "photo",
      saveToPhotos: true,
      quality: 0.7,
    };

    try {
      setUploading(true);
      const res = await launchCamera(options);

      if (res.didCancel) return;

      if (res.errorCode === "camera_unavailable") {
        Alert.alert(
          "Kamera tidak tersedia",
          "Kamera tidak bisa dibuka. Gunakan Galeri?",
          [
            { text: "Batal", style: "cancel" },
            { text: "Buka Galeri", onPress: openGallery },
          ]
        );
        return;
      }

      if (res.assets && res.assets.length > 0) {
        const asset: Asset = res.assets[0];
        const photo = { uri: asset.uri!, fileName: asset.fileName || `ktp_${Date.now()}.jpg` };

        await saveKtpPhoto(photo);
        // bisa langsung upload di sini jika mau
        await uploadPhoto(photo);
      }
    } catch (err) {
      console.log("Camera error:", err);
      Alert.alert("Terjadi kesalahan saat membuka kamera.");
    } finally {
      setUploading(false);
    }
  };

  // Buka galeri
  const openGallery = async () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      selectionLimit: 1,
      quality: 0.7,
    };

    try {
      setUploading(true);
      const res = await launchImageLibrary(options);
      if (res.didCancel || !res.assets) return;

      const asset = res.assets[0];
      const photo = { uri: asset.uri!, fileName: asset.fileName || `ktp_${Date.now()}.jpg` };
      await saveKtpPhoto(photo);
      await uploadPhoto(photo);
    } catch (err) {
      console.log("Gallery error:", err);
      Alert.alert("Terjadi kesalahan saat membuka galeri.");
    } finally {
      setUploading(false);
    }
  };

  // Contoh fungsi upload (sesuaikan API)
  const uploadPhoto = async (photo: { uri: string; fileName: string }) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", {
        uri: photo.uri,
        name: photo.fileName,
        type: "image/jpeg",
      } as any);

      // Contoh fetch
      // await fetch("https://api.example.com/upload", {
      //   method: "POST",
      //   body: formData,
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      console.log("Upload berhasil:", photo.fileName);
    } catch (err) {
      console.log("Upload error:", err);
      Alert.alert("Terjadi kesalahan saat upload foto.");
    } finally {
      setUploading(false);
    }
  };

  return {
    ktpPhoto,
    uploading,
    loadKtpPhoto,
    openCamera,
    openGallery,
    uploadPhoto,
  };
};
