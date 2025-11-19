import React, { useEffect, useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import ErrorBoundary from './src/components/ErrorBoundary';
import { ConnectionProvider } from './src/context/ConnectionContext';
import OfflineBannerWrapper from './src/components/OfflineBannerWrapper';
import { ProductProvider } from './src/context/ProductContext';
import { StorageService } from './src/storage/storageService';
import { STORAGE_KEYS } from './src/storage/storageKeys';
import { initApiKey } from './src/api/initApiKey';
import { Linking } from 'react-native';
import { navigationRef } from './src/navigation/navigationRef';

export default function App() {
  // --- Linking Config ---
  const linking = {
    prefixes: ['yamiapp://', 'https://yamiapp.com'],
    config: {
      screens: {
        Login: 'login',
        Root: {
          screens: {
            HomeTabs: {
              screens: {
                Home: 'home',
                ProductsStack: {
                  screens: { Products: 'products' },
                },
                Profile: 'profile/:userId', // Support parameter profil
              },
            },
            Settings: 'settings',
            CartScreen: 'keranjang',
          },
        },
        ProductDetail: 'product/:id',
        Checkout: 'checkout',
      },
    },
  };

  const [initialTheme, setInitialTheme] = useState<'dark' | 'light' | null>(null);

  // --- Load theme pertama kali ---
  useEffect(() => {
    (async () => {
      const saved = await StorageService.get(STORAGE_KEYS.THEME);
      setInitialTheme(saved === 'dark' ? 'dark' : 'light');
    })();
  }, []);

  // --- Init API Key sekali di awal ---
  useEffect(() => {
    initApiKey();
  }, []);

  // --- Deep Linking (Cold + Warm Start) ---
  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      if (!url) return;
      const path = url.replace(/.*?:\/\//g, ''); // hapus scheme apa pun

      // Product detail
      if (path.startsWith('product/')) {
        const id = path.split('/')[1];
        if (id) {
          navigationRef.current?.navigate('ProductDetail', { id });
        } else {
          navigationRef.current?.navigate('Root', { screen: 'HomeTabs', params: { screen: 'Home' } });
        }
      }

      // Keranjang
      else if (path === 'keranjang') {
        navigationRef.current?.navigate('CartScreen');
      }

      // Home
      else if (path === 'home') {
        navigationRef.current?.navigate('Root', { screen: 'HomeTabs', params: { screen: 'Home' } });
      }

      // Profil dengan userId
      else if (path.startsWith('profile/')) {
        const userId = path.split('/')[1];
        if (userId) {
          navigationRef.current?.navigate('Profile', { userId });
        } else {
          navigationRef.current?.navigate('Root', { screen: 'HomeTabs', params: { screen: 'Home' } });
        }
      }
    };

    // --- Cold Start ---
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    // --- Warm Start ---
    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => subscription.remove();
  }, []);

  // Jangan render sebelum theme loaded
  if (initialTheme === null) return null;

  return (
    <ErrorBoundary>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>
            <ThemeProvider initialTheme={initialTheme}>
              <ConnectionProvider>
                <OfflineBannerWrapper />
                <NavigationContainer linking={linking} ref={navigationRef}>
                  <AppNavigator />
                </NavigationContainer>
              </ConnectionProvider>
            </ThemeProvider>
          </AuthProvider>
        </CartProvider>
      </ProductProvider>
    </ErrorBoundary>
  );
}
