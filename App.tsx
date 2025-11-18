import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import ErrorBoundary from './src/components/ErrorBoundary';
import { ConnectionProvider } from './src/context/ConnectionContext';
import OfflineBannerWrapper from './src/components/OfflineBannerWrapper';
import { ProductProvider } from './src/context/ProductContext';

export default function App() {
  return (
    <ErrorBoundary>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>
            <ThemeProvider>
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
