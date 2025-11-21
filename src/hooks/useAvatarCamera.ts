// hooks/useAvatarCamera.ts
import { useState } from "react";
import { Alert, Platform } from "react-native";
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AVATAR_STORAGE_KEY = "@user:avatarBase64";

export const useAvatarCamera = (initialAvatar: string) => {
  const [avatar, setAvatar] = useState(initialAvatar);
  const [uploading, setUploading] = useState(false);

  const cameraOptions: CameraOptions = {
    mediaType: "photo",
    includeBase64: true,
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.7,
  };

  const galleryOptions: ImageLibraryOptions = {
    mediaType: "photo",
    includeBase64: true,
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.7,
  };

  const saveBase64 = async (base64: string) => {
    try {
      await AsyncStorage.setItem(AVATAR_STORAGE_KEY, base64);
    } catch (err) {
      console.log("Error saving avatar base64:", err);
    }
  };

  const handleResponse = async (response: any) => {
    if (response.didCancel) return;
    if (response.errorCode) {
      if (response.errorCode === "camera_unavailable") {
        Alert.alert(
          "Kamera tidak bisa dibuka",
          "Gunakan Galeri sebagai alternatif?",
          [
            { text: "Galeri", onPress: openGallery },
            { text: "Batal", style: "cancel" },
          ]
        );
      } else {
        Alert.alert("Terjadi kesalahan saat mengambil foto:", response.errorMessage || "Unknown error");
      }
      return;
    }

    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      if (asset.base64) {
        const uri = `data:${asset.type};base64,${asset.base64}`;
        setAvatar(uri);
        await saveBase64(uri);
      } else if (asset.uri) {
        setAvatar(asset.uri);
      }
    }
  };

  const openCamera = async () => {
    setUploading(true);
    try {
      const result = await launchCamera(cameraOptions);
      await handleResponse(result);
    } finally {
      setUploading(false);
    }
  };

  const openGallery = async () => {
    setUploading(true);
    try {
      const result = await launchImageLibrary(galleryOptions);
      await handleResponse(result);
    } finally {
      setUploading(false);
    }
  };

  const loadAvatar = async () => {
    try {
      const stored = await AsyncStorage.getItem(AVATAR_STORAGE_KEY);
      if (stored) setAvatar(stored);
    } catch (err) {
      console.log("Error loading avatar base64:", err);
    }
  };

  return {
    avatar,
    setAvatar,
    uploading,
    openCamera,
    openGallery,
    loadAvatar,
  };
};
