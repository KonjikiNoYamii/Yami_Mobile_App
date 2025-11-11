import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ProfileScreen from '../screens/ProfileScreen';
import { ProductScreen } from '../screens/ProductScreen';
import ProductStack from './ProductStack';

const Tabs = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="HomeStack" component={HomeStack} options={{
        title:"Recomended"
      }}/>
      <Tabs.Screen
        name="Products"
        component={ProductStack}
        options={{
          title: 'All Products',
        }}
      />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}
