import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { useTheme } from '../context/ThemeContext'; 
import FontAwesome from '@react-native-vector-icons/fontawesome';
import Fontisto from '@react-native-vector-icons/fontisto';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { isDark } = useTheme(); 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') return <FontAwesome name="home" size={size} color={color} />;
          if (route.name === 'Products') return <Fontisto name="archive" size={size} color={color} />;
          return null;
        },
        tabBarActiveTintColor: isDark ? '#FFD700' : 'tomato', // tema gelap → emas
        tabBarInactiveTintColor: isDark ? '#999' : 'gray',
        tabBarStyle: {
          backgroundColor: isDark ? '#1E1E1E' : '#fff', // ubah background tab
          borderTopWidth: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductScreen} />
    </Tab.Navigator>
  );
};
