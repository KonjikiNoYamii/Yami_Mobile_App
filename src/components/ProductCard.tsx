import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

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
      <View style={styles.info}>
        <Text style={[styles.name, { color: textColor }]}>{name}</Text>
        <Text style={[styles.price, { color: textColor }]}>Rp {price}</Text>
        <Text style={[styles.desc, { color: textColor }]}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold" },
  price: { fontSize: 16, fontWeight: "600" },
  desc: { fontSize: 14 },
});
