import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopTabsNavigator from '../navigation/TopTabsNavigator';
import { useTheme } from '../context/ThemeContext';

export const HomeScreen = () => {
  const { isDark } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#111' : '#fafafa' }]}>
      <TopTabsNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
