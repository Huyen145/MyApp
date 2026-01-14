import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { Colors } from '../../constants/theme';
import OrderDetail from './OrderDetail';

type Order = { id: string; date: string; status: string; price: string };

type Props = { orders?: Order[] };

export default function OrdersSection({ orders = [] }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <View>
      {orders.map((o) => (
        <View key={o.id}>
          <Pressable style={styles.orderItem} onPress={() => setExpanded(expanded === o.id ? null : o.id)}>
            <View style={styles.orderLeft}>
              <ThemedText style={styles.orderId}>{o.id}</ThemedText>
              <ThemedText style={styles.orderDate}>{o.date}</ThemedText>
            </View>

            <View style={styles.orderRight}>
              <View style={[styles.statusBadge, o.status === 'Đã giao' ? { backgroundColor: '#E8F5E9' } : { backgroundColor: '#FFF3E0' }]}>
                <ThemedText style={[styles.statusText, o.status === 'Đã giao' ? { color: '#2E7D32' } : { color: '#F57C00' }]}>{o.status}</ThemedText>
              </View>
              <ThemedText style={styles.orderPrice}>{o.price}</ThemedText>
            </View>
          </Pressable>

          {expanded === o.id && (
            <View style={styles.orderDetailWrap}>
              <OrderDetail id={o.id} date={o.date} status={o.status} price={o.price} />
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  orderLeft: { flex: 1 },
  orderId: { fontSize: 14, fontWeight: '600' },
  orderDate: { fontSize: 12, color: Colors.light.icon, marginTop: 4 },
  orderRight: { alignItems: 'flex-end' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 4 },
  statusText: { fontSize: 11, fontWeight: '600' },
  orderPrice: { fontSize: 14, fontWeight: '700' },
  orderDetailWrap: { paddingVertical: 10, paddingHorizontal: 8, backgroundColor: '#F9F9F9', borderRadius: 8, marginTop: 8 },
});
