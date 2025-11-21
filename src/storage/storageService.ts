import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {
  // multiGet
  multiGet: async (keys: string[]) => {
    try {
      const result = await AsyncStorage.multiGet(keys);

      const parsed: Record<string, any> = {};

      result.forEach(([k, v]) => {
        if (!v) return;
        try {
          parsed[k] = JSON.parse(v);
        } catch {
          parsed[k] = v; // bukan JSON → ambil mentah
        }
      });

      return parsed;
    } catch (err) {
      console.error('MultiGet Error:', err);
      return {};
    }
  },

  // multiSet aman
  multiSet: async (items: Record<string, any>) => {
    try {
      const formatted: [string, string][] = Object.entries(items).map(
        ([k, v]) => [k, typeof v === 'string' ? v : JSON.stringify(v)],
      );

      await AsyncStorage.multiSet(formatted);
    } catch (err) {
      console.error('MultiSet Error:', err);
    }
  },

  // remove
  multiRemove: async (keys: string[]) => {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (err) {
      console.error('MultiRemove Error:', err);
    }
  },

  // set
  set: async (key: string, value: any) => {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
  },

  // get
  get: async <T>(key: string): Promise<T | null> => {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return raw as T;
    }
  },

  remove: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};
