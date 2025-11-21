import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import ErrorBoundary from "./src/components/ErrorBoundary";
import OfflineBannerWrapper from "./src/components/OfflineBannerWrapper";
import DeepLinkHandler from "./src/components/DeepLinkHandler";
import Providers from "./src/components/Providers";
import HydrationWrapper from "./src/components/HydrationWrapper";
import { StorageService } from "./src/storage/storageService";
import { STORAGE_KEYS } from "./src/storage/storageKeys";
import { initApiKey } from "./src/api/initApiKey";
import { navigationRef } from "./src/navigation/navigationRef";

export default function App() {
  const [initialTheme, setInitialTheme] = useState<"dark" | "light" | null>(
    null
  );

  // 🔹 Load Theme
  useEffect(() => {
    (async () => {
      const saved = await StorageService.get(STORAGE_KEYS.THEME);
      setInitialTheme(saved === "dark" ? "dark" : "light");
    })();
  }, []);

  // 🔹 Init API Key
  useEffect(() => {
    initApiKey();
  }, []);

  if (initialTheme === null) return null; // jangan render sebelum theme ready

  const linking = {
    prefixes: ["yamiapp://", "https://yamiapp.com"],
    config: {
      screens: {
        Login: "login",
        Root: {
          screens: {
            HomeTabs: {
              screens: {
                Home: "home",
                ProductsStack: { screens: { Products: "products" } },
                Profile: "profile/:userId",
              },
            },
            Settings: "settings",
            CartScreen: "keranjang",
          },
        },
        ProductDetail: "product/:id",
        Checkout: "checkout",
      },
    },
  };

  return (
    <ErrorBoundary>
      <Providers initialTheme={initialTheme}>
        <HydrationWrapper>
          <OfflineBannerWrapper />
          <DeepLinkHandler />
          <NavigationContainer linking={linking} ref={navigationRef}>
            <AppNavigator />
          </NavigationContainer>
        </HydrationWrapper>
      </Providers>
    </ErrorBoundary>
  );
}
