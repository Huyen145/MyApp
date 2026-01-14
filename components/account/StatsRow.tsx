import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';

type Props = { orders?: number; favorites?: number; addresses?: number };

export default function StatsRow({ orders = 0, favorites = 0, addresses = 0 }: Props) {
  return (
    <View style={styles.statsRow}>
      <View style={styles.statCard}>
        <Ionicons name="receipt" size={24} color="#C94A3A" />
        <ThemedText style={styles.statNumber}>{orders}</ThemedText>
        <ThemedText style={styles.statLabel}>Đơn hàng</ThemedText>
      </View>

      <View style={styles.statCard}>
        <Ionicons name="bookmark" size={24} color="#C94A3A" />
        <ThemedText style={styles.statNumber}>{favorites}</ThemedText>
        <ThemedText style={styles.statLabel}>Yêu thích</ThemedText>
      </View>

      <View style={styles.statCard}>
        <Ionicons name="card" size={24} color="#C94A3A" />
        <ThemedText style={styles.statNumber}>{addresses}</ThemedText>
        <ThemedText style={styles.statLabel}>Địa chỉ</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#fff', paddingVertical: 14, paddingHorizontal: 8, borderRadius: 10, alignItems: 'center', marginHorizontal: 4 },
  statNumber: { fontSize: 16, fontWeight: '700', marginTop: 6 },
  statLabel: { fontSize: 11, color: '#666', marginTop: 4 },
});
