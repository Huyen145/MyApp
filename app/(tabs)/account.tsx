import { AuthContext } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { Colors } from '../../constants/theme';

export default function AccountScreen() {
  const router = useRouter();
  const { signOut } = useContext(AuthContext);

  const handleNavigate = (path: string) => {
    try {
      router.push(path as any);
    } catch (e) {}
  };

  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất không?",
      [
        { text: "Hủy", style: "cancel" },
        { 
          text: "Đăng xuất", 
          style: "destructive", 
          onPress: async () => {
            try {
              await signOut();
            } catch (e) {
              // ignore
            }
            router.replace('/login' as any);
          }
        }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <Image
              source={require('../../assets/images/nuoc/latte.jpg')}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>

          <View style={styles.userInfo}>
            <ThemedText style={styles.name}>Nguyễn Văn A</ThemedText>
            <View style={styles.coinsRow}>
              <Ionicons name="star" size={16} color={Colors.light.tint} />
              <ThemedText style={styles.coins}> 120 Xu thưởng</ThemedText>
            </View>
          </View>

          <Pressable 
            style={styles.editBtn} 
            onPress={() => handleNavigate('/(tabs)/profile')}
          >
            <Ionicons name="create-outline" size={20} color={Colors.light.text} />
          </Pressable>
        </View>

        {/* Tài khoản */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Tài khoản</ThemedText>

          <Pressable style={styles.row} onPress={() => handleNavigate('/account/details')}>
            <View style={styles.rowLeft}>
              <Ionicons name="person-circle-outline" size={20} color={Colors.light.text} />
              <ThemedText style={styles.rowText}>Thông tin cá nhân</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.light.icon} />
          </Pressable>

          <Pressable style={styles.row} onPress={() => handleNavigate('/account/payment')}>
            <View style={styles.rowLeft}>
              <Ionicons name="card-outline" size={20} color={Colors.light.text} />
              <ThemedText style={styles.rowText}>Phương thức thanh toán</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.light.icon} />
          </Pressable>

          <Pressable style={styles.row} onPress={() => handleNavigate('/account/notifications')}>
            <View style={styles.rowLeft}>
              <Ionicons name="notifications-outline" size={20} color={Colors.light.text} />
              <ThemedText style={styles.rowText}>Cài đặt thông báo</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.light.icon} />
          </Pressable>
        </View>

        {/* Đơn hàng */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Đơn hàng</ThemedText>

          <Pressable style={styles.row} onPress={() => handleNavigate('/orders')}>
            <View style={styles.rowLeft}>
              <Ionicons name="receipt-outline" size={20} color={Colors.light.text} />
              <ThemedText style={styles.rowText}>Lịch sử đơn hàng</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.light.icon} />
          </Pressable>

          <Pressable style={styles.row} onPress={() => handleNavigate('/rewards')}>
            <View style={styles.rowLeft}>
              <Ionicons name="gift-outline" size={20} color={Colors.light.text} />
              <ThemedText style={styles.rowText}>Điểm thưởng & Ưu đãi</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.light.icon} />
          </Pressable>
        </View>

        {/* Tuỳ chọn */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Tuỳ chọn</ThemedText>

          <Pressable style={styles.row} onPress={() => handleNavigate('/addresses')}>
            <View style={styles.rowLeft}>
              <Ionicons name="location-outline" size={20} color={Colors.light.text} />
              <ThemedText style={styles.rowText}>Sổ địa chỉ</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.light.icon} />
          </Pressable>
        </View>

        {/* Cài đặt */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Cài đặt</ThemedText>

          <Pressable style={styles.row} onPress={() => handleNavigate('/settings')}>
            <View style={styles.rowLeft}>
              <Ionicons name="settings-outline" size={20} color={Colors.light.text} />
              <ThemedText style={styles.rowText}>Cài đặt ứng dụng</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.light.icon} />
          </Pressable>
        </View>

        {/* Đăng xuất */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <ThemedText style={styles.sectionTitle}>Hệ thống</ThemedText>

          <Pressable style={styles.row} onPress={handleLogout}>
            <View style={styles.rowLeft}>
              <Ionicons name="log-out-outline" size={20} color="red" />
              <ThemedText style={[styles.rowText, { color: "red" }]}>
                Đăng xuất
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.light.icon} />
          </Pressable>
        </View>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },

  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatarWrap: { width: 84, height: 84, borderRadius: 44, overflow: 'hidden' },
  avatar: { width: 84, height: 84 },

  userInfo: { flex: 1, marginLeft: 12 },
  name: { fontSize: 18, fontWeight: '700' },
  coinsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  coins: { fontSize: 13, color: Colors.light.icon },

  editBtn: { padding: 8 },

  section: { marginTop: 12, backgroundColor: Colors.light.background, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 6 },
  sectionTitle: { fontSize: 13, color: Colors.light.icon, paddingHorizontal: 10, marginBottom: 6 },

  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 12 },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowText: { marginLeft: 12, fontSize: 15 },
});
