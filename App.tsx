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

export default function App() {
  const [initialTheme, setInitialTheme] = useState<'dark' | 'light' | null>(
    null,
  );

  // 🔹 Load theme pertama kali
  useEffect(() => {
    (async () => {
      const saved = await StorageService.get(STORAGE_KEYS.THEME);
      setInitialTheme(saved === 'dark' ? 'dark' : 'light');
    })();
  }, []);

  // 🔹 Init API Key sekali di awal
  useEffect(() => {
    initApiKey();
  }, []);

  // 🔹 Isi kosong dulu agar hook tidak berubah jumlahnya
  if (initialTheme === null) {
    return null;
  }

  return (
    <ErrorBoundary>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>
            <ThemeProvider initialTheme={initialTheme}>
              <ConnectionProvider>
                <OfflineBannerWrapper />
                <NavigationContainer>
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
