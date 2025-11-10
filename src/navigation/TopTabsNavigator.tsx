import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import Populer from '../screens/products/Populer';
import Terbaru from '../screens/products/Terbaru';
import Diskon from '../screens/products/Diskon';
import Elektronik from '../screens/products/Elektronik';
import Hiburan from '../screens/products/Hiburan';
import Makanan from '../screens/products/Makanan';
import Otomotif from '../screens/products/Otomotif';
import Pakaian from '../screens/products/Pakaian';

const Tabs = createMaterialTopTabNavigator();
export default function TopTabsNavigator() {
  return (
    <Tabs.Navigator
    screenOptions={{
      lazy: true,
        lazyPreloadDistance: 1,
        tabBarIndicatorStyle: { backgroundColor: "#007bff", height: 4 },
        tabBarLabelStyle: { textTransform: 'lowercase', fontSize: 14 },
        tabBarStyle: { backgroundColor: "#fff" },
        swipeEnabled: true,
        tabBarScrollEnabled: true
    }}>
        <Tabs.Screen name='Populer' component={Populer}/>
        <Tabs.Screen name='Terbaru'component={Terbaru}/>
        <Tabs.Screen name='Elektronik'component={Elektronik}/>
        <Tabs.Screen name='Hiburan'component={Hiburan}/>
        <Tabs.Screen name='Makanan'component={Makanan}/>
        <Tabs.Screen name='Otomotif'component={Otomotif}/>
        <Tabs.Screen name='Diskon'component={Diskon}/>
        <Tabs.Screen name='Pakaian'component={Pakaian}/>
    </Tabs.Navigator>
  )
}