import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

export type CartItem = {
  id: string; // unique cart id (productId + options fingerprint)
  productId?: number;
  name: string;
  price: number;
  qty: number;
  image?: any;
  options?: {
    size?: string;
    flavor?: string;
    notes?: string[];
    customText?: string;
    [k: string]: any;
  };
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty' | 'id'> & { productId?: number }, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
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

  function addItem(item: Omit<CartItem, 'qty' | 'id'> & { productId?: number }, qty = 1) {
    // normalize image strings to { uri } so RN <Image> and storage work consistently
    const normalizedItem = {
      ...item,
      image: typeof item.image === 'string' ? { uri: item.image } : item.image,
    } as Omit<CartItem, 'qty' | 'id'> & { productId?: number };

    const optionsKey = normalizedItem.options ? JSON.stringify(normalizedItem.options) : '';
    const id = `${normalizedItem.productId ?? 'p'}-${encodeURIComponent(optionsKey || 'default')}`;

    setItems((cur) => {
      const exists = cur.find((i) => i.id === id);
      if (exists) {
        return cur.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...cur, { ...normalizedItem, qty, id } as CartItem];
    });
  }

  function removeItem(id: string) {
    setItems((cur) => cur.filter((i) => i.id !== id));
  }

  function updateQty(id: string, qty: number) {
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
