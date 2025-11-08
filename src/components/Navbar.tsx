import React from "react";
import { View, Text, Switch, StyleSheet, Platform, Pressable } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface NavbarProps {
  onAddProduct?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAddProduct }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.navbar, { backgroundColor: isDark ? '#222' : '#eee' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>🛍️ My Shop</Text>
      <View style={styles.actions}>
        <Switch value={isDark} onValueChange={toggleTheme} />
        <Pressable onPress={onAddProduct}>
          <Text style={[styles.addBtn, { color: isDark ? '#ddd' : '#333' }]}>＋</Text>
        </Pressable>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 60,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3 },
      android: { elevation: 4 },
    }),
  },
  title: { fontWeight: "bold", fontSize: 20 },
  actions: { flexDirection: "row", alignItems: "center" },
  addBtnWrapper: { marginLeft: 12 },
  addBtn: { fontSize: 24, fontWeight: "bold" },
});
