"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface CartItem {
  id: string;
  title: string;
  price: string;
  rating: string;
  category: string;
  seller: string;
  imageBg: string;
  imageUrl?: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, quantity?: number) => boolean;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Optional: Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("bedders69_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart", e);
      }
    }
  }, []);

  // Save cart to localStorage when changed
  const saveCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem("bedders69_cart", JSON.stringify(newCart));
  };

  const isUserAuthenticated = (): boolean => {
    if (typeof document === "undefined") return false;
    const match = document.cookie.match(/(?:^|; )bedders_role=([^;]*)/);
    return Boolean(match && match[1] && match[1].trim() !== "");
  };

  const addToCart = (product: any, quantityToAdd = 1): boolean => {
    if (!isUserAuthenticated()) {
      const currentUrl =
        typeof window !== "undefined"
          ? window.location.pathname + window.location.search
          : "/marketplace";
      const name = product?.title || product?.name || "item";
      router.push(
        `/login?redirect=${encodeURIComponent(currentUrl)}&reason=cart_add&productName=${encodeURIComponent(name)}`
      );
      return false;
    }

    const existing = cartItems.find((item) => item.id === product.id);
    let updatedCart: CartItem[];

    if (existing) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: quantityToAdd }];
    }
    saveCart(updatedCart);
    return true;
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  const updateQuantity = (id: string, amount: number) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + amount };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    let numericPrice = 0;
    if (item && item.price !== undefined && item.price !== null) {
      if (typeof item.price === "number") {
        numericPrice = item.price;
      } else if (typeof item.price === "string") {
        numericPrice = parseFloat(item.price.replace(/[^\d.]/g, ""));
      }
    }
    if (isNaN(numericPrice)) {
      numericPrice = 0;
    }
    return acc + numericPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
