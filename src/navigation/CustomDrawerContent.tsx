import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const CustomDrawerContent = (props: any) => {
  const { isDark } = useTheme();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: isDark ? '#222' : '#fff' }}
    >
      <View style={[styles.header, { backgroundColor: isDark ? '#333' : '#f5f5f5' }]}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/4f/ba/52/4fba52077290a2a1ca93ff9c4970dc74.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: isDark ? '#fff' : '#000' }]}>User</Text>
      </View>

      <View style={styles.menu}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.footer}>
        <DrawerItem
          label="Logout"
          labelStyle={{ color: "red", fontWeight: "bold" }}
          onPress={() => console.log("Logout ditekan")}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menu: {
    flex: 1,
    paddingTop: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
  },
});

export default CustomDrawerContent;
