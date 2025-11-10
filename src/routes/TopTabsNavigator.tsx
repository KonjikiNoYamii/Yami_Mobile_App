import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "@react-navigation/material-top-tabs";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import Home from "../pages/Home";
import History from "../pages/History";
import Profile from "../pages/Profile";

const Tab = createMaterialTopTabNavigator();

export const TopTabsNavigator = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {/* Custom Header dengan Drawer + TabBar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#222",
          paddingHorizontal: 10,
          height: 56,
        }}
      >
        {/* Drawer Button */}
        <Icon
          name="menu"
          size={26}
          color="white"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={{ marginRight: 10 }}
        />

        {/* Tab Bar di header */}
        <View style={{ flex: 1 }}>
          <Tab.Navigator
            tabBar={(props) => (
              <MaterialTopTabBar
                {...props}
                style={{
                  backgroundColor: "transparent",
                  elevation: 0,
                  shadowOpacity: 0,
                }}
                indicatorStyle={{ backgroundColor: "gold" }}
                activeTintColor="gold"
                inactiveTintColor="#aaa"
              />
            )}
            screenOptions={{
              swipeEnabled: true,
            }}
          >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="History" component={History} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </View>
      </View>
    </View>
  );
};
