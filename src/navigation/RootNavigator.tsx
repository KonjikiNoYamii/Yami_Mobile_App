import { View } from 'react-native';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import { useTheme } from '../context/ThemeContext';

export default function RootNavigator() {
  const { isDark } = useTheme();

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
