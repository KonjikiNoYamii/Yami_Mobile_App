import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

export default function CustomDrawer(props: any) {
  const { userName, userAvatar } = useUser();
  const { isDark } = useTheme();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: isDark ? '#121212' : '#fff' }}
    >
      <View style={styles.header}>
        <Image source={{ uri: userAvatar }} style={styles.avatar} />
        <Text style={[styles.name, { color: isDark ? '#fff' : '#000' }]}>{userName}</Text>
      </View>
      <View style={styles.menu}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  menu: { flex: 1, paddingTop: 10 },
});
