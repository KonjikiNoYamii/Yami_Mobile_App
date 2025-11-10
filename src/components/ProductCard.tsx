import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  description,
  image,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.price}>Rp {price.toLocaleString('id-ID')}</Text>
      <Text style={styles.desc} numberOfLines={2} ellipsizeMode="tail">
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexBasis: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
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
    color: '#333',
  },
  price: {
    fontSize: 13,
    marginVertical: 4,
    color: '#e67e22',
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 11,
    textAlign: 'center',
    opacity: 0.8,
    color: '#555',
  },
});
