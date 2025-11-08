import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';

const App =()  => {
  const { isDark, setIsDark, theme } = useTheme();
  const [screen, setScreen] = useState<'Home' | 'Products' | 'Add'>('Home');
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (newProduct: any) => {
    setProducts(prev => [newProduct, ...prev]);
    setScreen('Products'); // setelah tambah produk, langsung tampil di daftar
  };

  const renderScreen = () => {
    switch (screen) {
      case 'Products':
        return <ProductScreen theme={theme} products={products} />;
      case 'Add':
        return <AddProductScreen addProduct={addProduct} />;
      default:
        return <HomeScreen theme={theme} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Navbar
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        navigate={setScreen}
      />
      {renderScreen()}
    </SafeAreaView>
  );
}
export default App