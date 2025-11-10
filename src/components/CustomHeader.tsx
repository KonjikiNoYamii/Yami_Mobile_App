import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export const CustomHeader = ({ activeTab, onTabChange }: any) => {
  const navigation = useNavigation();
  const tabs = ["Home", "History", "Profile"];

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#222",
        height: 56,
        paddingHorizontal: 10,
      }}
    >
      {/* Drawer Button */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{ marginRight: 10 }}
      >
        <Text>ppp</Text>
      </TouchableOpacity>

      {/* Tabs */}
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabChange(tab)}
          style={{
            marginHorizontal: 8,
            paddingVertical: 4,
            borderBottomWidth: activeTab === tab ? 2 : 0,
            borderBottomColor: "gold",
          }}
        >
          <Text
            style={{
              color: activeTab === tab ? "gold" : "white",
              fontSize: 16,
            }}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
