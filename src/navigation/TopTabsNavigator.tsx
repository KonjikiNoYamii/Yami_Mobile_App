import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "../context/ThemeContext";
import AllProducts from "../screens/products/AllProducts";
import Populer from "../screens/products/Populer";
import Terbaru from "../screens/products/Terbaru";
import Diskon from "../screens/products/Diskon";
import { fetchCategoriesWithCache } from "../api/categoryServices";
import CategoryProducts from "../screens/products/CategoryProducts";

const Tabs = createMaterialTopTabNavigator();

export default function TopTabsNavigator() {
  const { isDark } = useTheme();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchCategoriesWithCache();
        setCategories(result); // array string dari API
      } catch (err) {
        console.log("Gagal load kategori:", err);
      }
    };

    load();
  }, []);

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        swipeEnabled: true,
        tabBarStyle: {
          backgroundColor: isDark ? "#121212" : "#fff",
        },
        tabBarIndicatorStyle: {
          backgroundColor: isDark ? "#fff" : "#000",
        },
        tabBarActiveTintColor: isDark ? "#fff" : "#000",
        tabBarInactiveTintColor: isDark ? "#aaa" : "#555",
      }}
    >
      {/* --- TAB DEFAULT TIDAK DIUBAH --- */}
      <Tabs.Screen name="AllProducts" component={AllProducts} />
      <Tabs.Screen name="Populer" component={Populer} />
      <Tabs.Screen name="Terbaru" component={Terbaru} />
      <Tabs.Screen name="Diskon" component={Diskon} />

      {/* --- TAB DARI API (DYNAMIC) --- */}
      {categories.map((cat) => (
        <Tabs.Screen
          key={cat}
          name={cat.replace(/\s+/g, "_")} // untuk nama navigator
          component={CategoryProducts}
          initialParams={{ category: cat }}
          options={{
            title: cat, // tetap readable
          }}
        />
      ))}
    </Tabs.Navigator>
  );
}
