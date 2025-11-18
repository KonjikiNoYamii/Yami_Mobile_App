import AsyncStorage from "@react-native-async-storage/async-storage";

export const StorageService = {
  
  // ambil beberapa key sekaligus
  multiGet: async (keys: string[]) => {
    try {
      const result = await AsyncStorage.multiGet(keys);
      return Object.fromEntries(result);
    } catch (err) {
      console.error("MultiGet Error:", err);
      return {};
    }
  },

  // set beberapa item sekaligus
  multiSet: async (items: Record<string, string>) => {
    try {
      const formatted = Object.entries(items);
      await AsyncStorage.multiSet(formatted);
    } catch (err) {
      console.error("MultiSet Error:", err);
    }
  },

  // hapus banyak item sekaligus
  multiRemove: async (keys: string[]) => {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (err) {
      console.error("MultiRemove Error:", err);
    }
  },

  // helper set
  set: async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  },

  // helper get
  get: async <T>(key: string): Promise<T | null> => {
    const val = await AsyncStorage.getItem(key);
    return val ? (JSON.parse(val) as T) : null;
  },

  // helper remove
  remove: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};
