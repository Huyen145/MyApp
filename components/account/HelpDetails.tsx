import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';

export default function HelpDetails() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.q}>Q: Làm sao để đổi trả hàng?</ThemedText>
      <ThemedText style={styles.a}>A: Vui lòng liên hệ trung tâm trợ giúp trong vòng 7 ngày kể từ khi nhận hàng.</ThemedText>

      <ThemedText style={styles.q}>Q: Tôi quên mật khẩu?</ThemedText>
      <ThemedText style={styles.a}>A: Sử dụng chức năng Quên mật khẩu để đặt lại mã OTP.</ThemedText>

      <Pressable style={styles.contact}><ThemedText style={{ color: '#C94A3A', fontWeight: '700' }}>Liên hệ hỗ trợ</ThemedText></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10, paddingHorizontal: 8 },
  q: { fontWeight: '700', marginTop: 8 },
  a: { color: '#666', marginBottom: 6 },
  contact: { marginTop: 12, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#F5F5F5', alignItems: 'center' },
});
