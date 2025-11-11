import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ProductScreen } from '../screens/ProductScreen'
import ProductDetail from '../components/ProductDetail'

const Stack = createStackNavigator()
export default function ProductStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='ProductScreen' component={ProductScreen} />
        <Stack.Screen name='ProductDetail' component={ProductDetail} options={{
          headerShown:false
        }}/>
    </Stack.Navigator>
  )
}