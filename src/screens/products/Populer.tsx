import React, { useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useProductContext } from "../../context/ProductContext";
import { ProductListScreen } from "../../components/ProductListScreen";

export default function Populer() {
  const { populer, loading } = useProductContext();
  const navigation = useNavigation<any>();

  // Update header
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ title: "Product Ter-Populer!" });
      return () => navigation.getParent()?.setOptions({ title: "Jelajahi Produk" });
    }, [navigation])
  );

  return (
    <ProductListScreen
      products={populer}
      loading={loading}
      emptyMessage="Tidak ada produk populer saat ini"
    />
  );
}
