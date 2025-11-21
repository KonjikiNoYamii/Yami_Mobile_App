import React from "react";
import { useProductContext } from "../../context/ProductContext";
import { ProductListScreen } from "../../components/ProductListScreen";

export default function Diskon() {
  const { diskon, loading } = useProductContext();

  return (
    <ProductListScreen
      products={diskon}
      loading={loading}
      emptyMessage="Tidak ada produk diskon saat ini"
    />
  );
}
