import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Icon from "@react-native-vector-icons/ionicons"; 
import { WishlistService } from "../storage/wishlistService";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  isDark?: boolean;
  cardWidth?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  description,
  thumbnail,
  isDark = false,
  cardWidth,
}) => {
  const [wishlisted, setWishlisted] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    WishlistService.isWishlisted(id).then(setWishlisted);
  }, []);

  const toggleWishlist = async () => {
    const updated = await WishlistService.toggle(id);
    setWishlisted(updated.includes(id));
  };

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
          title,
          price,
          description,
          thumbnail,
          isDark,
        })
      }
      activeOpacity={0.9}
    >
      {/* --- Relative container agar icon tampil di atas image --- */}
      <View style={{ position: "relative", width: "100%" }}>
        <Image
          source={{ uri: thumbnail }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* --- Icon wishlist di atas --- */}
<TouchableOpacity
  style={[
    styles.wishlistButton,
    {
      backgroundColor: isDark
        ? "rgba(255, 255, 255, 0.15)"   // 🌙 dark mode → putih transparan
        : "rgba(0,0,0,0.25)",        // ☀️ light mode → hitam transparan
    },
  ]}
  onPress={toggleWishlist}
>
  <Icon
    name={wishlisted ? "heart" : "heart-outline"}
    size={22}
    color={wishlisted ? "#e63946" : isDark ? "#fff" : "#000000ff"}
  />
</TouchableOpacity>

      </View>

      <Text
        style={[styles.name, { color: isDark ? '#fff' : '#333' }]}
        numberOfLines={1}
      >
        {title}
      </Text>

      <Text
        style={[styles.price, { color: isDark ? '#f5a623' : '#e67e22' }]}
      >
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
    overflow: 'visible', // ★ WAJIB: Agar icon di luar area gambar tetap terlihat
  },

  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },

wishlistButton: {
  position: "absolute",
  top: 8,
  right: 8,
  padding: 6,
  borderRadius: 20,
},

  name: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
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
