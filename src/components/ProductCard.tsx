import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  isDark?: boolean;
  cardWidth?: number; // 🆕 agar bisa menyesuaikan lebar
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  description,
  image,
  isDark = false,
  cardWidth,
}) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDark ? '#333' : '#fff',
          shadowColor: isDark ? '#000' : '#888',
          width: cardWidth ? cardWidth - 10 : '48%', 
        },
      ]}
      onPress={() =>
        navigation.navigate('ProductDetail', {
          id,
          name,
          price,
          description,
          image,
          isDark,
        })
      }
    >
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <Text
        style={[styles.name, { color: isDark ? '#fff' : '#333' }]}
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text style={[styles.price, { color: isDark ? '#f5a623' : '#e67e22' }]}>
        Rp {price.toLocaleString('id-ID')}
      </Text>
      <Text
        style={[styles.desc, { color: isDark ? '#ccc' : '#555' }]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    fontSize: 13,
    marginVertical: 4,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 11,
    textAlign: 'center',
    opacity: 0.8,
  },
});
