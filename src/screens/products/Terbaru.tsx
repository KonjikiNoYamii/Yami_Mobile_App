import React from "react";
import { useProductContext } from "../../context/ProductContext";
import { ProductListScreen } from "../../components/ProductListScreen";

export default function Terbaru() {
  const { terbaru, loading } = useProductContext();

  return (
    <ProductListScreen
      products={terbaru}
      loading={loading}
      emptyMessage="Tidak ada produk terbaru saat ini"
    />
  );
}
