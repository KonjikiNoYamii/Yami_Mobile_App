// src/components/Providers.tsx
import React from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ProductProvider } from "../context/ProductContext";
import { ConnectionProvider } from "../context/ConnectionContext";

interface Props {
  children: React.ReactNode;
  initialTheme: "dark" | "light";
}

const Providers = ({ children, initialTheme }: Props) => (
  <ThemeProvider initialTheme={initialTheme}>
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
            <ConnectionProvider>{children}</ConnectionProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default Providers;
