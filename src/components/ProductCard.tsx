import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
  textColor: string;
  bgColor: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  description,
  image,
  textColor,
  bgColor,
}) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={[styles.name, { color: textColor }]} numberOfLines={1}>
        {name}
      </Text>
      <Text style={[styles.price, { color: textColor }]}>
        Rp {price.toLocaleString('id-ID')}
      </Text>
      <Text
        style={[styles.desc, { color: textColor }]}
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 12,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    fontSize: 13,
    marginVertical: 4,
  },
  desc: {
    fontSize: 11,
    textAlign: 'center',
    opacity: 0.8,
  },
});
