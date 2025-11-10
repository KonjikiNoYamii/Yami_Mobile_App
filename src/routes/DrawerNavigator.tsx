import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TopTabsNavigator } from "./TopTabsNavigator";
import Product from "../pages/Product";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Drawer.Screen name="Main" component={TopTabsNavigator} />
    <Drawer.Screen name="Product" component={Product} />
  </Drawer.Navigator>
);
