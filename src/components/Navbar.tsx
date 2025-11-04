import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { useTheme } from '../hooks/useTheme'
import ButtonTheme from './ButtonTheme'

function Navbar() {
  const { theme } = useTheme()

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme ? '#fff' : '#222' },
      ]}
    >
      <View style={styles.leftSection}>
        <Image
          source={require('../images/images.jpg')}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: theme ? '#222' : '#fff' }]}>
          Yami
        </Text>
      </View>
      <ButtonTheme />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    elevation: 4, // shadow android
    shadowColor: '#000', // shadow iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // hanya untuk RN versi baru, jika error ganti dengan marginRight di Text
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default Navbar
