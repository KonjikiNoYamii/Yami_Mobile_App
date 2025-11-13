import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductStack from './ProductStack';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext'; // ambil isDark

const Tabs = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  const route = useRoute<any>();
  const { userID } = route.params;

  const { isDark } = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#121212' : '#ffffff', // ternary untuk background tab bar
          borderTopColor: isDark ? '#333' : '#ddd', // optional, border
        },
        tabBarActiveTintColor: isDark ? '#fff' : '#000', // warna icon/text aktif
        tabBarInactiveTintColor: isDark ? '#aaa' : '#888', // warna icon/text tidak aktif
      }}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Products" component={ProductStack} />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ userID }}
      />
    </Tabs.Navigator>
  );
}
