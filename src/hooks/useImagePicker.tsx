// hooks/useImagePicker.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";

export const useImagePicker = () => {
  const [photos, setPhotos] = useState<{ uri: string; fileName: string }[]>([]);

  const openGallery = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: "photo",
        selectionLimit: 5,      // Maksimal 5 foto
        quality: 0.8,
        maxWidth: 600,          // Ukuran preview max 600x600
        maxHeight: 600,
      });

      if (res.didCancel || !res.assets) return;

      // Ambil hanya uri & fileName, filter jika ada undefined
      const picked = res.assets
        .filter(a => a.uri && a.fileName)
        .map(a => ({
          uri: a.uri!,
          fileName: a.fileName!,
        }));

      setPhotos(picked);

      // Simpan ke AsyncStorage
      try {
        await AsyncStorage.setItem("@ecom:newProductAssets", JSON.stringify(picked));
      } catch (err) {
        console.error("AsyncStorage error:", err);
      }
      
    } catch (error) {
      console.error("Gallery error:", error);
    }
  };

  return {
    photos,
    openGallery,
    setPhotos,
  };
};
