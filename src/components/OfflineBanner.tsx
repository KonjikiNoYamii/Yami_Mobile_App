import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OfflineBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.text}>Koneksi terputus. Menggunakan mode offline.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#d9534f",
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
});
