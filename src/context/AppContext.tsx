"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  shippingDetails: {
    name: string;
    phone: string;
    address: string;
  };
  paymentMethod: string;
  status: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AppContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (item: any) => boolean;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => Order;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load state on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("inf_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }

    const storedCart = localStorage.getItem("inf_cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error(e);
      }
    }

    const storedOrders = localStorage.getItem("inf_orders");
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("inf_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("inf_user");
  };

  const addToCart = (product: any): boolean => {
    if (!user) {
      return false; // Not logged in
    }
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      let updated;
      if (existing) {
        updated = prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            category: product.category,
            quantity: 1,
          },
        ];
      }
      localStorage.setItem("inf_cart", JSON.stringify(updated));
      return updated;
    });
    return true;
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((item) => item.id !== itemId);
      localStorage.setItem("inf_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) => {
      const updated = prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      localStorage.setItem("inf_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("inf_cart");
  };

  const addOrder = (orderData: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...orderData,
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      status: "Processing",
    };

    setOrders((prevOrders) => {
      const updated = [newOrder, ...prevOrders];
      localStorage.setItem("inf_orders", JSON.stringify(updated));
      return updated;
    });

    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        orders,
        addOrder,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
