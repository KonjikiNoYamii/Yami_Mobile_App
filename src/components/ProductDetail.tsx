import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function ProductDetail() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { image, name, description, price, isDark } = route.params;
  const { width, height } = useWindowDimensions();

  const [loading, setLoading] = useState(true);
  const [errorImg, setErrorImg] = useState(false);

  const isLandscape = width > height;
  const themeColors = {
    bg: isDark ? '#1e1e1e' : '#f9f9f9',
    card: isDark ? '#2a2a2a' : '#fff',
    text: isDark ? '#fff' : '#222',
    desc: isDark ? '#ccc' : '#555',
    price: isDark ? '#f5a623' : '#e67e22',
    iconBg: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.05)',
    buttonBg: isDark ? '#f5a623' : '#e67e22',
    buttonText: isDark ? '#1e1e1e' : '#fff',
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
      {/* Tombol Back */}
<Pressable
  style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
  onPress={() => navigation.goBack()}
>
  <Ionicons name="chevron-back" size={26} color={themeColors.text} />
</Pressable>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: isLandscape ? 60 : 16 },
        ]}
      >
        {/* Gambar Produk */}
        <View style={{ alignItems: 'center' }}>
          {loading && (
            <ActivityIndicator
              size="large"
              color={themeColors.price}
              style={{ position: 'absolute', top: 100 }}
            />
          )}

          {!errorImg ? (
            <Image
              source={{ uri: image }}
              style={[
                styles.image,
                {
                  width: isLandscape ? width * 0.5 : width * 0.8,
                  height: isLandscape ? height * 0.6 : 260,
                  opacity: loading ? 0.4 : 1,
                },
              ]}
              onLoadEnd={() => setLoading(false)}
              onError={() => setErrorImg(true)}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                styles.imageFallback,
                { width: width * 0.8, backgroundColor: themeColors.card },
              ]}
            >
              <Ionicons
                name="image-outline"
                size={80}
                color={themeColors.desc}
              />
              <Text style={{ color: themeColors.desc, marginTop: 8 }}>
                Gambar tidak tersedia
              </Text>
            </View>
          )}
        </View>

        {/* Detail Produk */}
        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: themeColors.card,
              marginTop: isLandscape ? 20 : 30,
            },
          ]}
        >
          <Text style={[styles.name, { color: themeColors.text }]}>{name}</Text>

          {price && (
            <Text style={[styles.price, { color: themeColors.price }]}>
              Rp {price.toLocaleString('id-ID')}
            </Text>
          )}

          <Text style={[styles.desc, { color: themeColors.desc }]}>
            {description}
          </Text>

          {/* Checkout Button */}
          <Pressable
            style={({ pressed }) => [
              styles.checkoutButton,
              {
                backgroundColor: themeColors.buttonBg,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={() =>
              navigation.navigate('Checkout', { name, price, isDark })
            }
          >
            <Text
              style={[styles.checkoutText, { color: themeColors.buttonText }]}
            >
              Checkout
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 40,
  },
  image: {
    borderRadius: 18,
    marginBottom: 10,
  },
  imageFallback: {
    height: 260,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  infoBox: {
    width: '100%',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  name: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 6,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  desc: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 20,
  },
  backButton: {
  position: 'absolute',
  top: 45,
  left: 16,
  zIndex: 20,
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: '#cccccc', // ini nanti bisa diganti dengan themeColors.iconBg via array
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.25,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 4,
  elevation: 5,
},
backButtonPressed: {
  shadowOpacity: 0.35,
  shadowOffset: { width: 0, height: 6 },
  shadowRadius: 6,
  elevation: 6,
  transform: [{ scale: 0.95 }],
},

  checkoutButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
