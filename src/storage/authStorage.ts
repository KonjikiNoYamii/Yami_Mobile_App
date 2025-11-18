// storage/authStorage.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

export const Storage = {
  get: async <T>(key: string): Promise<T | null> => {
    const value = await AsyncStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  },

  set: async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  remove: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },

  multiGet: async (keys: string[]) => {
    const entries = await AsyncStorage.multiGet(keys);
    const result: Record<string, any> = {};
    entries.forEach(([k, v]) => {
      result[k] = v ? JSON.parse(v) : null;
    });
    return result;
  },
};
