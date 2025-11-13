import React, { createContext, useContext, useState, ReactNode } from 'react';

// tipe data item cart
export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

// tipe context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (items: CartItem[]) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (items: CartItem[]) => {
    setCartItems(prev => {
      const newItems = [...prev];

      items.forEach(item => {
        const index = newItems.findIndex(i => i.id === item.id);
        if (index >= 0) {
          newItems[index].qty += item.qty; // qty ditambah
        } else {
          newItems.push(item);
        }
      });

      return newItems;
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
