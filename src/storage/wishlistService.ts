import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "./storageKeys";

export const WishlistService = {
  // 🔹 Ambil wishlist, selalu return array number
  async getWishlist(): Promise<number[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.WISHLIST_IDS);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.warn("Wishlist storage corrupt, resetting...", err);
      await AsyncStorage.removeItem(STORAGE_KEYS.WISHLIST_IDS);
      return [];
    }
  },

  // 🔹 Simpan wishlist + metadata
  async setWishlist(ids: number[]): Promise<void> {
    await AsyncStorage.setItem(
      STORAGE_KEYS.WISHLIST_IDS,
      JSON.stringify(ids)
    );

    const meta = {
      count: ids.length,
      updatedAt: Date.now(),
    };

    await AsyncStorage.setItem(
      STORAGE_KEYS.WISHLIST_META,
      JSON.stringify(meta)
    );
  },

  // 🔹 Toggle wishlist item, selalu return updated array number
  async toggle(id: number): Promise<number[]> {
    let ids: number[] = await this.getWishlist();

    const updated: number[] = ids.includes(id)
      ? ids.filter((item: number) => item !== id)
      : [...ids, id];

    await this.setWishlist(updated);

    return updated;
  },

  // 🔹 Cek apakah item ada di wishlist
  async isWishlisted(id: number): Promise<boolean> {
    const ids = await this.getWishlist();
    return ids.includes(id);
  },
};
