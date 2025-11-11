import { View, Text, Image, StyleSheet, Pressable, Button } from 'react-native';
import React from 'react';
import {
  CommonActions,
  DrawerActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

export default function ProductDetail() {
  const route = useRoute<any>();
  const { image, name, description } = route.params;
  const navigation = useNavigation();

  const handleCloseDrawer = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomeStack' }],
      }),
    );
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={handleCloseDrawer}>
        <Text style={styles.backText}>← Tutup</Text>
      </Pressable>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 16 },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
    marginTop: 60, // beri jarak agar tidak tertutup tombol
  },
  name: { fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  desc: { textAlign: 'center', fontSize: 14, color: '#555' },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
