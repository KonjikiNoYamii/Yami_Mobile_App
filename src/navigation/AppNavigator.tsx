import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator';
import Checkout from '../screens/Checkout';
import ProductDetail from '../components/ProductDetail';

import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

import * as Keychain from 'react-native-keychain';
import { StorageService } from '../storage/storageService';
import { STORAGE_KEYS } from '../storage/storageKeys';
import ProtectedRoute from './ProtectedRoute';
import CreateProductScreen from '../screens/CreateProductScreen';
import CompleteProfileScreen from '../screens/CompleteProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isDark, setThemeFromOutside } = useTheme() as any;
  const { setTokenFromOutside, isLoggedIn, isLoading, setIsLoading } =
    useAuth() as any;

  // Load theme & token secara paralel
  useEffect(() => {
    const loadFromHybridStorage = async () => {
      try {
        const [tokenResult, themeResult] = await Promise.all([
          Keychain.getGenericPassword({ service: 'com.ecom:userToken' }),
          StorageService.get(STORAGE_KEYS.THEME),
        ]);

        if (tokenResult) setTokenFromOutside(tokenResult.password);
        if (themeResult) setThemeFromOutside(themeResult === 'dark');
      } catch (err) {
        console.log('Storage load error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFromHybridStorage();
  }, []);

  if (isLoading) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: isDark ? '#121212' : '#ffffff',
        },
      }}
    >
      {isLoggedIn ? (
        <Stack.Screen name="Root" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}

      <Stack.Screen
        name="Checkout"
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Checkout',
          headerStyle: {
            backgroundColor: isDark ? '#1f1f1f' : '#f8f8f8',
          },
          headerTintColor: isDark ? '#fff' : '#000',
        }}
      >
        {() => (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        )}
      </Stack.Screen>

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
      <Stack.Screen
        name="CreateProduct"
        component={CreateProductScreen}
        options={{
          headerShown: true,
          title: 'Tambah Produk',
          headerStyle: {
            backgroundColor: isDark ? '#1f1f1f' : '#f8f8f8',
          },
          headerTintColor: isDark ? '#fff' : '#000',
        }}
      />
      <Stack.Screen name='CompleteProfile' component={CompleteProfileScreen} options={{
        headerShown:true,
        title:'Profile Anda'
      }}/>
    </Stack.Navigator>
  );
}
