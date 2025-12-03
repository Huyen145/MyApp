import { CartContext } from '@/contexts/CartContext';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';

export default function CartHeader() {
  const router = useRouter();
  const { items } = useContext(CartContext);
  const cartCount = items.length;

  return (
    <TouchableOpacity onPress={() => router.push('/(tabs)/cart')} style={styles.container}>
      <ThemedText style={styles.icon}>🛒</ThemedText>
      {cartCount > 0 && (
        <View style={styles.badge}>
          <ThemedText style={styles.badgeText}>{cartCount > 9 ? '9+' : cartCount}</ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#C94A3A',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
