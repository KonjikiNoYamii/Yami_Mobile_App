import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator';
import Checkout from '../screens/Checkout';
import ProductDetail from '../components/ProductDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext'; // asumsikan ada isDark di sini
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isDark } = useTheme(); // ambil nilai isDark dari context

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: isDark ? '#121212' : '#ffffff',
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Root" component={DrawerNavigator} />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Checkout',
          headerStyle: {
            backgroundColor: isDark ? '#1f1f1f' : '#f8f8f8', // ternary untuk header
          },
          headerTintColor: isDark ? '#fff' : '#000', // ternary untuk warna teks header
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          headerShown: true,
          title: 'Detail Produk',
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: isDark ? '#1f1f1f' : '#f8f8f8',
          },
          headerTintColor: isDark ? '#fff' : '#000',
        }}
      />
    </Stack.Navigator>
  );
}
