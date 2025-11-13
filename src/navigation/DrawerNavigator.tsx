import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabsNavigator from './BottomTabsNavigator';
import SettingScreen from '../screens/SettingScreen';
import { useTheme } from '../context/ThemeContext';
import { useRoute } from '@react-navigation/native';
import CustomDrawer from '../components/CustomDrawer';
import { UserProvider } from '../context/UserContext';
import CartScreen from '../screens/CartScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const route = useRoute<any>()
  const { userID } = route.params; 

  const { isDark } = useTheme();

  return (
    <UserProvider userID={userID}>
      <Drawer.Navigator 
          drawerContent={(props) => <CustomDrawer {...props} userID={userID} isDark={isDark} />}

      screenOptions={{
        swipeEdgeWidth: 40,
        drawerStyle: {
          backgroundColor: isDark ? '#121212' : '#fff',
        },
        drawerActiveTintColor: isDark ? '#fff' : '#000',
        drawerInactiveTintColor: isDark ? '#aaa' : '#555',
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: isDark ? '#1f1f1f' : '#f8f8f8',
        },
        headerTintColor: isDark ? '#fff' : '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabsNavigator}
        initialParams={{ userID }} 
        options={{
          title: 'Beranda',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        initialParams={{ userID }} 
        options={{
          title: 'Pengaturan',
        }}
      />
      <Drawer.Screen name='CartScreen' component={CartScreen}options={{
        title:'Keranjang Saya'
      }}/>
    </Drawer.Navigator>
    </UserProvider>
  );
}
