import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet } from "react-native";

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Bagian atas: Avatar dan nama pengguna */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/4f/ba/52/4fba52077290a2a1ca93ff9c4970dc74.jpg",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>User</Text>
      </View>

      {/* Daftar menu utama */}
      <View style={styles.menu}>
        <DrawerItemList {...props} />
      </View>

      {/* Tombol Logout di bawah */}
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
    backgroundColor: "#f5f5f5",
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
