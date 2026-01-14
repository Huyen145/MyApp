import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';

type Props = { id: string; date: string; status: string; price: string };

export default function OrderDetail({ id, date, status, price }: Props) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.heading}>Chi tiết đơn hàng {id}</ThemedText>

      <View style={styles.row}>
        <ThemedText style={styles.label}>Ngày đặt:</ThemedText>
        <ThemedText style={styles.value}>{date}</ThemedText>
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>Trạng thái:</ThemedText>
        <ThemedText style={styles.value}>{status}</ThemedText>
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>Tổng:</ThemedText>
        <ThemedText style={styles.value}>{price}</ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.subheading}>Sản phẩm</ThemedText>
        <ThemedText>- Áo thun nữ (x1) — 120.000đ</ThemedText>
        <ThemedText>- Bình giữ nhiệt (x1) — 130.000đ</ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.subheading}>Địa chỉ nhận hàng</ThemedText>
        <ThemedText>Nguyễn Văn A</ThemedText>
        <ThemedText>123 Đường ABC, Quận 1, TP.HCM</ThemedText>
        <ThemedText>0987 654 321</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 8 },
  heading: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  subheading: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { color: '#666' },
  value: { fontWeight: '600' },
  section: { marginTop: 8 },
});
