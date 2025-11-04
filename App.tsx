import React from 'react'
import { ThemeProvider } from './src/hooks/useTheme'
import Screening from './src/screen/Screening'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Screening />
      </SafeAreaView>
    </ThemeProvider>
  )
}
