import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Switch, StatusBar } from 'react-native';

export const HeroSection = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.bg}
        imageStyle={{ opacity: 0.3 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Selamat Datang!</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  bg: { height: 200 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { color: 'black', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
