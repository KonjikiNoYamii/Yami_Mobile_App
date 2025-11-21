// components/ProductCard.tsx
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "@react-native-vector-icons/ionicons";
import { WishlistService } from "../storage/wishlistService";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail?: string;
  images?: any[];
  isDark?: boolean;
  cardWidth?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  description,
  thumbnail,
  images,
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

  // ⭐ Logika aman untuk gambar custom / API
  const imageUri = (() => {
    if (thumbnail && typeof thumbnail === "string" && thumbnail.length > 0) {
      if (thumbnail.startsWith("file://")) return thumbnail;
      if (thumbnail.startsWith("http")) return thumbnail;
      return "file://" + thumbnail;
    }

    if (Array.isArray(images) && images.length > 0) {
      const first = images[0];
      if (typeof first === "string") {
        if (first.startsWith("file://") || first.startsWith("http")) return first;
        return "file://" + first;
      }
      if (first?.uri && typeof first.uri === "string") return first.uri;
    }

    return "https://placehold.co/300x300?text=No+Image";
  })();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDark ? "#333" : "#fff",
          shadowColor: isDark ? "#000" : "#888",
          width: cardWidth ? cardWidth - 8 : "48%",
        },
      ]}
      onPress={() =>
        navigation.navigate("ProductDetail", {
          id,
          title,
          price,
          description,
          thumbnail: imageUri,
          images,
          isDark,
          isCustom: true,
        })
      }
      activeOpacity={0.9}
    >
      <View style={{ position: "relative", width: "100%" }}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />

        <TouchableOpacity
          style={[
            styles.wishlistButton,
            {
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(0,0,0,0.25)",
            },
          ]}
          onPress={toggleWishlist}
        >
          <Icon
            name={wishlisted ? "heart" : "heart-outline"}
            size={22}
            color={wishlisted ? "#e63946" : isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.name, { color: isDark ? "#fff" : "#333" }]} numberOfLines={1}>
        {title}
      </Text>
      <Text style={[styles.price, { color: isDark ? "#f5a623" : "#e67e22" }]}>
        Rp {price.toLocaleString("id-ID")}
      </Text>
      <Text style={[styles.desc, { color: isDark ? "#ccc" : "#555" }]} numberOfLines={2}>
        {description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    overflow: "visible",
  },
  image: {
    width: "100%",
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
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 13,
    marginVertical: 4,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 11,
    textAlign: "center",
    opacity: 0.8,
  },
});
