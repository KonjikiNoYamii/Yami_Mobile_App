import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductScreen } from '../screens/ProductScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import { useTheme } from '../context/ThemeContext';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { isDark } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: isDark ? '#333' : '#007bff' },
        headerTintColor: isDark ? '#fff' : '#fff',
        drawerActiveTintColor: isDark ? '#4da6ff' : '#007bff',
        drawerLabelStyle: { fontSize: 16 },
        headerShown: true,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Product" component={ProductScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingScreen} />
    </Drawer.Navigator>
  );
}
