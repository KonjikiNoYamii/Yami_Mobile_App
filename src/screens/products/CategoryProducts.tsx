import React, { useEffect } from "react";
import { useProductContext } from "../../context/ProductContext";
import { ProductListScreen } from "../../components/ProductListScreen";

export default function CategoryProducts({ route }: any) {
  const { category } = route.params;
  const { categoryMap, loadCategory } = useProductContext();
  const products = categoryMap[category] || [];

  useEffect(() => {
    loadCategory(category);
  }, [category]);

  return (
    <ProductListScreen
      products={products}
      loading={!products.length}
      fetchData={() => loadCategory(category)}
      emptyMessage={`Belum ada produk untuk kategori ${category}`}
    />
  );
}
