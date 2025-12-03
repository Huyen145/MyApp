import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  image?: any;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clear: () => void;
  total: () => number;
  placeOrder: () => Promise<{ ok: boolean; orderId?: string }>;
};

export const CartContext = createContext<CartContextType>({} as CartContextType);

const CART_KEY = '@app_cart';
const ORDERS_KEY = '@app_orders';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(CART_KEY);
        if (raw) setItems(JSON.parse(raw));
      } catch {
        // ignore
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(CART_KEY, JSON.stringify(items)).catch(() => {});
  }, [items]);

  function addItem(item: Omit<CartItem, 'qty'>, qty = 1) {
    setItems((cur) => {
      const exists = cur.find((i) => i.id === item.id);
      if (exists) {
        return cur.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...cur, { ...item, qty }];
    });
  }

  function removeItem(id: number) {
    setItems((cur) => cur.filter((i) => i.id !== id));
  }

  function updateQty(id: number, qty: number) {
    setItems((cur) => cur.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  function clear() {
    setItems([]);
  }

  function total() {
    return items.reduce((s, it) => s + it.price * it.qty, 0);
  }

  async function placeOrder() {
    try {
      const order = { id: 'o' + Date.now(), items, total: total(), createdAt: Date.now(), status: 'new' };
      const raw = (await AsyncStorage.getItem(ORDERS_KEY)) || '[]';
      const arr = JSON.parse(raw);
      arr.unshift(order);
      await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(arr));
      clear();
      return { ok: true, orderId: order.id };
    } catch {
      return { ok: false };
    }
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, total, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
}
