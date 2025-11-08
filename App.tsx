import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { ThemeProvider } from "./src/context/ThemeContext";
import { StackNavigator } from "./src/navigation/StackNavigator";

const App =() => {
  return (
    <ThemeProvider >
      <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </ThemeProvider>
  );
}
export default App
