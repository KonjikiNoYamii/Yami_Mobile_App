import React, { useRef } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../hooks/useTheme';

export default function TouchableAnimated() {
    const {theme} = useTheme()
   const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9, // sedikit mengecil saat ditekan
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1, // kembali normal
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const onPress = () => {
    console.log('Ditekan tanpa feedback bawaan 💫');
  };

  return (
    <View style={[styles.container,{backgroundColor:theme ? '#fff' : '#222'}]}>
      <Animated.View style={[styles.box, { transform: [{ scale }] }]}>
        <TouchableWithoutFeedback
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={onPress}
        >
          <View style={styles.inner}>
            <Text style={styles.text}>Tap Me </Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    padding:20
  },
  box: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  inner: {
    backgroundColor: '#ffb6c1',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 16,
  },
  text: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
