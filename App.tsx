import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {

  return (
      <ThemeProvider>
        <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
      </ThemeProvider>
    
  );
}
