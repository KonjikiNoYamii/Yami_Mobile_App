// utils/cache.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_TTL = 30 * 60 * 1000; // 30 menit

export async function setCache(key: string, data: any, ttl = DEFAULT_TTL) {
  const payload = {
    data,
    expiry: Date.now() + ttl,
  };
  await AsyncStorage.setItem(key, JSON.stringify(payload));
}

export async function getCache(key: string) {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;

  try {
    const obj = JSON.parse(raw);

    if (Date.now() > obj.expiry) {
      await AsyncStorage.removeItem(key);
      return null; // expired → kosong
    }

    return obj.data;
  } catch {
    return null;
  }
}
