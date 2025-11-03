import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';

export const ProfileCard = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.bio} numberOfLines={2}>
          Belajar React Native semangat!
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  bio: { fontSize: 14, textAlign: 'center' },
});
