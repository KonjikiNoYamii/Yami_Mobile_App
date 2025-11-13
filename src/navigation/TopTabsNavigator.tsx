import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useTheme } from '../context/ThemeContext'; // ambil isDark
import AllProducts from '../screens/products/AllProducts';
import Populer from '../screens/products/Populer';
import Terbaru from '../screens/products/Terbaru';
import Diskon from '../screens/products/Diskon';
import Elektronik from '../screens/products/Elektronik';
import Hiburan from '../screens/products/Hiburan';
import Otomotif from '../screens/products/Otomotif';
import Pakaian from '../screens/products/Pakaian';
import Makanan from '../screens/products/Makanan';

const Tabs = createMaterialTopTabNavigator();

export default function TopTabsNavigator() {
  const { isDark } = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        swipeEnabled: true,
        tabBarStyle: {
          backgroundColor: isDark ? '#121212' : '#fff', // background tab bar
        },
        tabBarIndicatorStyle: {
          backgroundColor: isDark ? '#fff' : '#000', // garis indikator
        },
        tabBarActiveTintColor: isDark ? '#fff' : '#000', // teks aktif
        tabBarInactiveTintColor: isDark ? '#aaa' : '#555', // teks tidak aktif
      }}
    >
      <Tabs.Screen name="AllProducts" component={AllProducts} />
      <Tabs.Screen name="Populer" component={Populer} />
      <Tabs.Screen name="Terbaru" component={Terbaru} />
      <Tabs.Screen name="Diskon" component={Diskon} />
      <Tabs.Screen name="Elektronik" component={Elektronik} />
      <Tabs.Screen name="Hiburan" component={Hiburan} />
      <Tabs.Screen name="Otomotif" component={Otomotif} />
      <Tabs.Screen name="Pakaian" component={Pakaian} />
      <Tabs.Screen name="Makanan" component={Makanan} />
    </Tabs.Navigator>
  );
}
