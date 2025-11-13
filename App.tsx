import { View, Text } from 'react-native'
import React from 'react'
import AppNavigator from './src/navigation/AppNavigator'
import { ThemeProvider } from './src/context/ThemeContext'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './src/context/AuthContext'
import { CartProvider } from './src/context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
    </AuthProvider>
    </CartProvider>
  )
}