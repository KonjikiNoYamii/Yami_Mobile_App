import * as Keychain from "react-native-keychain";

const TOKEN_KEY = "com.ecom:userToken";

export const SecureStore = {
  saveToken: async (token: string) => {
    await Keychain.setGenericPassword(TOKEN_KEY, token, {
      service: TOKEN_KEY,
    });
  },

  getToken: async () => {
    try {
      const result = await Keychain.getGenericPassword({
        service: TOKEN_KEY,
      });

      if (!result) return null;

      return result.password;
    } catch (error: any) {
      // Kembalikan error agar bisa terdeteksi "access denied"
      return new Error(error?.message || "access denied");
    }
  },

  removeToken: async () => {
    await Keychain.resetGenericPassword({ service: TOKEN_KEY });
  },

  forceResetToken: async () => {
    try {
      await Keychain.resetGenericPassword({ service: TOKEN_KEY });
    } catch (err) {
      console.log("Force reset failed:", err);
    }
  },
};
