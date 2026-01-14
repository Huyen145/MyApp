import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';

export default function AddressDetails() {
  return (
    <View style={styles.container}>
      <View style={styles.addressItem}>
        <ThemedText style={styles.name}>Nhà riêng (Mặc định)</ThemedText>
        <ThemedText>Nguyễn Văn A — 0987 654 321</ThemedText>
        <ThemedText>123 Đường ABC, Phường 1, Quận 1, TP.HCM</ThemedText>
      </View>

      <View style={styles.addressItem}>
        <ThemedText style={styles.name}>Văn phòng</ThemedText>
        <ThemedText>CTY XYZ — 0912 345 678</ThemedText>
        <ThemedText>456 Đường DEF, Phường 2, Quận 3, TP.HCM</ThemedText>
      </View>

      <Pressable style={styles.addBtn}><ThemedText style={{ color: '#C94A3A', fontWeight: '700' }}>Thêm địa chỉ mới</ThemedText></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 8 },
  addressItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  name: { fontWeight: '700', marginBottom: 4 },
  addBtn: { marginTop: 12, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#F5F5F5', alignItems: 'center' },
});
