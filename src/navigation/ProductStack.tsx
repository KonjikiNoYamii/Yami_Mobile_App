import { createStackNavigator } from '@react-navigation/stack';
import TopTabsNavigator from './TopTabsNavigator';
import { useTheme } from '../context/ThemeContext'; // ambil isDark

const Stack = createStackNavigator();

export default function ProductStack() {
  const { isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true, // tampilkan header
        headerStyle: {
          backgroundColor: isDark ? '#1f1f1f' : '#f8f8f8', // background header
        },
        headerTintColor: isDark ? '#fff' : '#000', // warna teks/back button
      }}
    >
      <Stack.Screen
        name="Products"
        component={TopTabsNavigator}
        options={{ title: 'Jelajahi Produk' }}
      />
    </Stack.Navigator>
  );
}
