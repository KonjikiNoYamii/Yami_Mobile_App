import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useProductContext } from "../../context/ProductContext";
import { ProductCard } from "../../components/ProductCard";
import { useTheme } from "../../context/ThemeContext";

export default function CategoryProducts({ route }: any) {
  const { category } = route.params;
  const { categoryMap, loadCategory } = useProductContext();
  const { isDark } = useTheme();
  const { width, height } = useWindowDimensions();

  const products = categoryMap[category];

  const numColumns = width > height ? 3 : 2;
  const cardWidth = (width - (numColumns + 1) * 8) / numColumns;

  useEffect(() => {
    loadCategory(category);
  }, [category]);

  if (!products)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={[styles.text, { color: isDark ? "#fff" : "#333" }]}>
          Memuat kategori {category}...
        </Text>
      </View>
    );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1c1c1c" : "#fff" },
      ]}
    >
      <FlatList
        data={products}
        key={numColumns}
        keyExtractor={(item) => String(item.id)}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            title={item.title}
            price={item.price}
            thumbnail={item.thumbnail}
            description={item.description}
            isDark={isDark}
            cardWidth={cardWidth}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
});
