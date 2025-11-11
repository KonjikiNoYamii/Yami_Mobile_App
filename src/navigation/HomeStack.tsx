import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import ProductDetail from '../components/ProductDetail';

const Stack = createStackNavigator()
export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown:false
    }}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{
          headerShown:true,
          title:"Produk kami"
        }}/>
        <Stack.Screen name='ProductDetail' component={ProductDetail} options={{
          title:'Detail Product'
        }}/>
    </Stack.Navigator>
  )
}