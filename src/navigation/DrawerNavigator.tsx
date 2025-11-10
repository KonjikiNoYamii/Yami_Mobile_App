import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductScreen } from '../screens/ProductScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';

const Drawer = createDrawerNavigator()
export default function DrawerNavigator() {
  const getDrawerLockMode = (routeName: string) => {
    if (routeName === "Home") return false
    return true
  };
  
  return (
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props}/>}
    screenOptions={({ route }) => ({
      headerStyle: { backgroundColor: "#007bff" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#007bff",
        drawerLabelStyle: { fontSize: 16 },
        headerShown: true,
        swipeEnabled: getDrawerLockMode(route.name)
    })}
      >
        <Drawer.Screen name='Home' component={HomeScreen} />
        <Drawer.Screen name='Product' component={ProductScreen}/>
        <Drawer.Screen name='Profile' component={ProfileScreen}/>
        <Drawer.Screen name='Settings' component={SettingScreen}/>
    </Drawer.Navigator>
  )
}