import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';

export default function PaymentMethods() {
  return (
    <View style={styles.container}>
      <View style={styles.cardItem}>
        <ThemedText style={styles.cardTitle}>Visa •••• 4242</ThemedText>
        <ThemedText>Hết hạn 12/25</ThemedText>
      </View>

      <View style={styles.cardItem}>
        <ThemedText style={styles.cardTitle}>Momo •••• 1234</ThemedText>
        <ThemedText>Tài khoản đã xác thực</ThemedText>
      </View>

      <Pressable style={styles.addBtn}><ThemedText style={{ color: '#C94A3A', fontWeight: '700' }}>Thêm phương thức thanh toán</ThemedText></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 8 },
  cardItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  cardTitle: { fontWeight: '700', marginBottom: 4 },
  addBtn: { marginTop: 12, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#F5F5F5', alignItems: 'center' },
});
