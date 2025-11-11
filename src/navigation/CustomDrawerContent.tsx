import React from "react";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import { useNavigation } from "@react-navigation/native";

const CustomDrawerContent = (props: any) => {
  const { isDark } = useTheme();
  const { isLoggedIn, logout } = useAuth();
  const { name, avatar } = useProfile();
  const navigation = useNavigation<any>();

  const handleAuthPress = () => {
    if (isLoggedIn) logout();
    else navigation.navigate("Login");
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: isDark ? "#222" : "#fff" }}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}>
        <Image
          source={{uri:`${avatar}`}}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: isDark ? "#fff" : "#000" }]}>{name}</Text>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <DrawerItem
          label={isLoggedIn ? "Logout" : "Login"}
          labelStyle={{
            color: isLoggedIn ? "red" : "#007bff",
            fontWeight: "bold",
          }}
          onPress={handleAuthPress}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: { alignItems: "center", paddingVertical: 30, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: "bold" },
  menu: { flex: 1, paddingTop: 10 },
  footer: { borderTopWidth: 1, borderTopColor: "#ddd", paddingVertical: 10 },
});

export default CustomDrawerContent;
