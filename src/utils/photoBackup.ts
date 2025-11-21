import { PermissionsAndroid, Alert, Platform } from 'react-native';
import { launchCamera, CameraOptions } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestStoragePermissionAndSave = async () => {
  if (Platform.OS !== 'android') {
    launchCameraWithSave(true);
    return;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Izin Penyimpanan',
        message:
          'Aplikasi butuh izin untuk menyimpan foto KTP Anda di galeri publik sebagai backup.',
        buttonNeutral: 'Tanya Nanti',
        buttonNegative: 'Batal',
        buttonPositive: 'Setuju',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      launchCameraWithSave(true);
    } else {
      Alert.alert(
        'Perhatian',
        'Foto tidak akan disimpan di galeri publik karena izin tidak diberikan.',
      );
      launchCameraWithSave(false);
    }
  } catch (err) {
    console.warn('Permission error:', err);
    launchCameraWithSave(false);
  }
};

const launchCameraWithSave = (saveToPhotos: boolean) => {
  const options: CameraOptions = {
    mediaType: 'photo',
    saveToPhotos,
    quality: 0.8,
    maxWidth: 600,
    maxHeight: 600,
  };

  launchCamera(options, res => {
    if (res.didCancel) return;
    if (res.errorCode) return console.error('Camera error:', res.errorMessage);

    if (res.assets && res.assets.length > 0) {
      const photo = res.assets[0];
      console.log(
        'Foto KTP diambil:',
        photo.uri,
        'SaveToPhotos:',
        saveToPhotos,
      );

      AsyncStorage.setItem(
        '@user:ktpPhoto',
        JSON.stringify({ uri: photo.uri, fileName: photo.fileName }),
      );
    }
  });
};
