import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function TouchableOpacityButton() {
    const {theme} = useTheme()
  const handlePress = () => {
    Alert.alert('Tombol Ditekan!', 'Kamu menekan tombol dengan efek opacity ✨');
  };

  return (
    <View style={[styles.container,{ backgroundColor: theme ? '#fff' : '#222' }]}>
      {/* Tombol teks */}
      <TouchableOpacity 
        style={styles.button}
        activeOpacity={0.6}  // Semakin kecil, semakin redup saat ditekan
        onPress={handlePress}
      >
        <Text style={styles.text}>Tekan Aku </Text>
      </TouchableOpacity>

      {/* Tombol icon */}
      <TouchableOpacity 
        onPress={() => Alert.alert('Icon Ditekan!')} 
        activeOpacity={0.7}
        style={styles.iconButton}
      >
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/84/84510.png' }}
          style={styles.icon}
        />
        <Text style={styles.iconText}>Like</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨 Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 20,
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD54F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  iconText: {
    fontWeight: 'bold',
    color: '#333',
  },
});
