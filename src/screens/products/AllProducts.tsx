import React from "react";
import { useProductContext } from "../../context/ProductContext";
import { ProductListScreen } from "../../components/ProductListScreen";

export default function AllProducts() {
  const { products, loading, error, refresh } = useProductContext();

  return (
    <ProductListScreen
      products={products}
      loading={loading}
      error={error}
      fetchData={refresh}
      emptyMessage="Belum ada produk tersedia"
    />
  );
}
