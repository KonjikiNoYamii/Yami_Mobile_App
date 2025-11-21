// src/components/HydrationWrapper.tsx
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useHydration } from "../hooks/useHydration";

interface Props {
  children: React.ReactNode;
}

const HydrationWrapper = ({ children }: Props) => {
  const ready = useHydration();

  if (!ready)
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );

  return <>{children}</>;
};

export default HydrationWrapper;

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
