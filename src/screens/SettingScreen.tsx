import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { useTheme } from '../context/ThemeContext';

export default function SettingScreen() {
  const { isDark, toggleTheme } = useTheme();
  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ganti Tema</Text>
      <Switch value={isDark} onValueChange={toggleTheme} />
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#222' : '#f9f9f9',
    },
    label: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 16,
      color: isDark ? '#fff' : '#333',
    },
  });
