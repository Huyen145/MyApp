import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';

type Props = {
  name?: string;
  email?: string;
  points?: number;
};

export default function ProfileCard({ name, email, points = 0 }: Props) {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatarWrap}>
        <Image source={require('../../assets/images/nuoc/latte.jpg')} style={styles.avatar} />
      </View>

      <View style={styles.userInfo}>
        <ThemedText style={styles.name}>{name || 'Người dùng'}</ThemedText>
        <ThemedText style={styles.email}>{email || 'user@example.com'}</ThemedText>
        <View style={styles.coinsRow}>
          <Ionicons name="star" size={14} color="#FFB800" />
          <ThemedText style={styles.coins}>{points} Xu</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  avatarWrap: { width: 80, height: 80, borderRadius: 40, overflow: 'hidden' },
  avatar: { width: 80, height: 80 },
  userInfo: { flex: 1, marginLeft: 12 },
  name: { fontSize: 18, fontWeight: '700' },
  email: { fontSize: 13, color: '#666', marginTop: 2 },
  coinsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  coins: { fontSize: 12, color: '#666', marginLeft: 6 },
});
