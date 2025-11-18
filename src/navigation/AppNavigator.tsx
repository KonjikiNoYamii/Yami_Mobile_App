import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator';
import Checkout from '../screens/Checkout';
import ProductDetail from '../components/ProductDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isDark } = useTheme();
  const { isLoggedIn, isLoading } = useAuth();

  // Saat masih cek token di storage → jangan render apa pun
  if (isLoading) return null;

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? "Root" : "Login"}
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: isDark ? '#121212' : '#ffffff',
        },
      }}
    >

      {!isLoggedIn ? (
        // Jika belum login → tampilkan Login
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        // Jika sudah login → tampilkan Root
        <Stack.Screen name="Root" component={DrawerNavigator} />
      )}

      {/* Tetap disiapkan karena dipakai di dalam Root */}
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Checkout',
          headerStyle: {
            backgroundColor: isDark ? '#1f1f1f' : '#f8f8f8',
          },
          headerTintColor: isDark ? '#fff' : '#000',
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
