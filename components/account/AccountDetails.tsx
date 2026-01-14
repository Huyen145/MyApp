import React from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';

type Props = { name?: string | null; email?: string | null };

export default function AccountDetails({ name, email }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}><ThemedText style={styles.label}>Họ & Tên</ThemedText><ThemedText style={styles.value}>{name || '—'}</ThemedText></View>
      <View style={styles.row}><ThemedText style={styles.label}>Email</ThemedText><ThemedText style={styles.value}>{email || '—'}</ThemedText></View>
      <View style={styles.row}><ThemedText style={styles.label}>Số điện thoại</ThemedText><ThemedText style={styles.value}>0987 654 321</ThemedText></View>

      <View style={styles.actions}>
        <Pressable style={styles.actionBtn} onPress={() => Alert.alert('Chỉnh sửa', 'Chức năng chỉnh sửa chưa được cài đặt')}>
          <ThemedText style={{ color: '#C94A3A', fontWeight: '700' }}>Chỉnh sửa</ThemedText>
        </Pressable>
        <Pressable style={styles.actionBtn} onPress={() => Alert.alert('Đổi mật khẩu', 'Chức năng đổi mật khẩu chưa được cài đặt')}>
          <ThemedText>Đổi mật khẩu</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  label: { color: '#666' },
  value: { fontWeight: '600' },
  actions: { flexDirection: 'row', marginTop: 12 },
  actionBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#F5F5F5', marginRight: 8 },
});
