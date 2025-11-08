import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { AddProductScreen } from '../screens/AddProductScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{
          title: 'Add Product',
          headerShown: false,
          presentation: 'modal', // tampil seperti modal
        }}
      />
    </Stack.Navigator>
  );
};
