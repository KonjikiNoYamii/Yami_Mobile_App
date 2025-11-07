import React from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  navigate: (screen: 'Home' | 'Products' | 'Add') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme, navigate }) => {
  return (
    <View style={[styles.navbar, { backgroundColor: isDark ? '#000' : '#fff', borderBottomColor: isDark ? '#333' : '#ccc' }]}>
      <View style={styles.links}>
        <Pressable onPress={() => navigate('Home')}>
          <Text style={[styles.link, { color: isDark ? '#fff' : '#000' }]}>Home</Text>
        </Pressable>
        <Pressable onPress={() => navigate('Products')}>
          <Text style={[styles.link, { color: isDark ? '#fff' : '#000' }]}>Products</Text>
        </Pressable>
        <Pressable onPress={() => navigate('Add')}>
          <Text style={[styles.link, { color: isDark ? '#fff' : '#000' }]}>Add</Text>
        </Pressable>
      </View>

      <Switch
        value={isDark}
        onValueChange={onToggleTheme}
        trackColor={{ false: '#ccc', true: '#555' }}
        thumbColor={isDark ? '#fff' : '#fff'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  links: {
    flexDirection: 'row',
    gap: 20,
  },
  link: {
    fontWeight: '600',
    fontSize: 16,
  },
});
