import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import AccountDetails from '../../components/account/AccountDetails';
import OrdersSection from '../../components/account/OrdersSection';
import ProfileCard from '../../components/account/ProfileCard';
import Rewards from '../../components/account/Rewards';
import StatsRow from '../../components/account/StatsRow';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { Colors } from '../../constants/theme';

export default function AccountScreen() {
  const { user, signOut } = useAuth();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất không?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đăng xuất', style: 'destructive', onPress: signOut },
      ]
    );
  };

  const toggleSection = (section: string) => {
    setExpandedSection(prev => (prev === section ? null : section));
  };

  if (!user) return null;

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        <ProfileCard
          name={user.full_name}
          email={user.email}
          points={120}
        />

        <StatsRow orders={8} favorites={12} addresses={3} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="gift" size={20} color="#C94A3A" />
            <ThemedText style={styles.sectionTitle}>Ưu đãi & Điểm thưởng</ThemedText>
          </View>
          <Rewards />
        </View>

        <View style={styles.section}>
          <Pressable style={styles.sectionHeader} onPress={() => toggleSection('orders')}>
            <Ionicons name="receipt" size={20} color="#C94A3A" />
            <ThemedText style={styles.sectionTitle}>Đơn hàng gần đây</ThemedText>
          </Pressable>

          {expandedSection === 'orders' && (
            <OrdersSection
              orders={[
                { id: '#ORD001', date: '12/11/2025', status: 'Đã giao', price: '250.000đ' },
                { id: '#ORD002', date: '10/11/2025', status: 'Đang vận chuyển', price: '180.000đ' },
              ]}
            />
          )}
        </View>

        <View style={styles.section}>
          <Pressable style={styles.sectionHeader} onPress={() => toggleSection('account')}>
            <Ionicons name="person" size={20} color="#C94A3A" />
            <ThemedText style={styles.sectionTitle}>Thông tin tài khoản</ThemedText>
          </Pressable>

          {expandedSection === 'account' && (
            <AccountDetails name={user.full_name} email={user.email} />
          )}
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <ThemedText style={styles.logoutText}>Đăng xuất</ThemedText>
        </Pressable>

      </ScrollView>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 80 },

  // Profile Card
  profileCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarWrap: { width: 80, height: 80, borderRadius: 40, overflow: 'hidden' },
  avatar: { width: 80, height: 80 },

  userInfo: { flex: 1, marginLeft: 12 },
  name: { fontSize: 18, fontWeight: '700' },
  email: { fontSize: 13, color: Colors.light.icon, marginTop: 2 },
  coinsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  coins: { fontSize: 12, color: Colors.light.icon, marginLeft: 4 },

  // Stats Row
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  statNumber: { fontSize: 16, fontWeight: '700', marginTop: 6 },
  statLabel: { fontSize: 11, color: Colors.light.icon, marginTop: 4 },

  // Sections
  section: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 12, 
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },

  sectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  sectionTitle: { fontSize: 15, fontWeight: '600', marginLeft: 10 },

  // Rewards
  rewardsBox: { marginTop: 12 },
  rewardItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  rewardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardInfo: { marginLeft: 12, flex: 1 },
  rewardValue: { fontSize: 14, fontWeight: '700' },
  rewardLabel: { fontSize: 12, color: Colors.light.icon, marginTop: 2 },

  // Order Items
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  orderLeft: { flex: 1 },
  orderId: { fontSize: 14, fontWeight: '600' },
  orderDate: { fontSize: 12, color: Colors.light.icon, marginTop: 4 },
  orderRight: { alignItems: 'flex-end' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 4,
  },
  statusText: { fontSize: 11, fontWeight: '600' },
  orderPrice: { fontSize: 14, fontWeight: '700' },

  // Menu Items
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuText: { fontSize: 14, flex: 1, marginLeft: 12 },

  // Logout Button
  logoutButton: { 
    flexDirection: 'row',
    backgroundColor: '#C94A3A', 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  logoutText: { color: '#fff', fontWeight: '700', fontSize: 16, marginLeft: 8 },
});
