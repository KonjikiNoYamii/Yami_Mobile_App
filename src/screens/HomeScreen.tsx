import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Navbar } from "../components/Navbar";
import { useTheme } from "../context/ThemeContext";

export const HomeScreen = () => {
  const { isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#fafafa" }
      ]}
    >
      <Navbar />
      <View style={styles.content}>
        <Text style={[styles.text, { color: isDark ? "#fff" : "#000" }]}>
          Welcome Home 🏡
        </Text>
        <Text style={[styles.subtext, { color: isDark ? "#bbb" : "#333" }]}>
          Enjoy your dashboard!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  content: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  text: { fontSize: 22, fontWeight: "bold", marginBottom: 6 },
  subtext: { fontSize: 16 },
});
