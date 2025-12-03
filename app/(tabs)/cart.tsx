import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CartContext } from '@/contexts/CartContext';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CartScreen() {
  const router = useRouter();
  const { items, updateQty, removeItem, total } = useContext(CartContext);

  function onCheckout() {
    router.push('/checkout');
  }

  return (
    <ThemedView style={styles.container}>
      {items.length === 0 ? (
        <View style={{ padding: 20 }}>
          <ThemedText>Your cart is empty</ThemedText>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Image source={item.image} style={styles.img} />
              <View style={{ flex: 1, paddingLeft: 12 }}>
                <ThemedText style={styles.name}>{item.name}</ThemedText>
                <ThemedText style={styles.price}>{(item.price * item.qty).toLocaleString()}đ</ThemedText>
                <View style={styles.qtyRow}>
                  <TouchableOpacity onPress={() => updateQty(item.id, Math.max(1, item.qty - 1))} style={styles.qtyBtn}><ThemedText>-</ThemedText></TouchableOpacity>
                  <ThemedText style={{ marginHorizontal: 8 }}>{item.qty}</ThemedText>
                  <TouchableOpacity onPress={() => updateQty(item.id, item.qty + 1)} style={styles.qtyBtn}><ThemedText>+</ThemedText></TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.del}><ThemedText>Remove</ThemedText></TouchableOpacity>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={{ padding: 16 }}>
              <ThemedText style={styles.total}>Total: {total().toLocaleString()}đ</ThemedText>
              <TouchableOpacity style={styles.checkout} onPress={onCheckout}><ThemedText style={{ color: '#fff', fontWeight: '700' }}>Checkout</ThemedText></TouchableOpacity>
            </View>
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2E3C6' },
  row: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12, alignItems: 'center' },
  img: { width: 80, height: 64, borderRadius: 8 },
  name: { fontWeight: '700' },
  price: { marginTop: 6, color: '#C94A3A' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F0F0', borderRadius: 6 },
  del: { padding: 8 },
  total: { fontSize: 16, fontWeight: '800', marginBottom: 12 },
  checkout: { backgroundColor: '#C94A3A', padding: 14, borderRadius: 12, alignItems: 'center' },
});
