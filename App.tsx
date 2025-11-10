import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "./src/routes/DrawerNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
