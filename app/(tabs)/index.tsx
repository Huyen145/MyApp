import { Image } from 'expo-image';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const menuItems = [
  { id: 1, name: "Latte Kem Sữa", price: 49, image: require("@/assets/images/nuoc/latte.jpg") },
  { id: 2, name: "Trà Đào Cam Sả", price: 45, image: require("@/assets/images/nuoc/tea.jpg") },
  { id: 3, name: "Cà Phê Muối", price: 55, image: require("@/assets/images/nuoc/saltcoffee.jpg") },
  { id: 4, name: "Trà Sữa Trân Châu", price: 42, image: require("@/assets/images/nuoc/milktea.jpg") },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.banner}
        />
        <ThemedText type="title" style={styles.bannerText}>
          Coffee House Premium
        </ThemedText>
        <ThemedText style={styles.bannerSubtitle}>
          Hương vị tinh tế – trải nghiệm đẳng cấp
        </ThemedText>
      </View>

      {/* VIP Button */}
      <Link href="/signup">
        <ThemedView style={styles.vipBtn}>
          <ThemedText style={styles.vipBtnText}>🌟 Trở thành thành viên VIP</ThemedText>
        </ThemedView>
      </Link>

      {/* Giới thiệu */}
      <View style={styles.card}>
        <Image
          source={require('@/assets/images/nuoc/tea.jpg')}
          style={styles.introImage}
        />
        <ThemedText type="subtitle" style={styles.cardTitle}>
          ☕ Trải nghiệm hương vị tinh tế
        </ThemedText>
        <ThemedText style={styles.cardText}>
          Chào mừng bạn đến với Coffee House – nơi hương vị hòa quyện cùng không gian sang trọng.
        </ThemedText>
      </View>

      {/* Menu nổi bật */}
      <View style={styles.menuSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          📖 Menu nổi bật
        </ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.menuScroll}>
          {menuItems.map((item, i) => (
            <ThemedView key={i} style={styles.menuCard}>
              <Image source={item.image} style={styles.menuImage} />
              <ThemedText style={styles.menuName}>{item.name}</ThemedText>
            </ThemedView>
          ))}
        </ScrollView>
      </View>

      {/* Best Seller */}
      <View style={styles.bestCard}>
        <View style={styles.bestBadge}>
          <ThemedText style={styles.bestBadgeText}>🔥 BESTSELLER</ThemedText>
        </View>
        <Image source={require('@/assets/images/nuoc/tea.jpg')} style={styles.bestImage} />
        <ThemedText type="subtitle" style={styles.bestTitle}>
          Cà phê muối
        </ThemedText>
        <ThemedText style={styles.bestText}>
          Hương vị độc đáo, sang trọng và tinh tế, chỉ có tại Coffee House.
        </ThemedText>
        <Link href="/menu">
          <ThemedView style={styles.menuBtn}>
            <ThemedText style={styles.menuBtnText}>📋 Xem tất cả Menu</ThemedText>
          </ThemedView>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4EDE3' },

  // Banner
  bannerContainer: { alignItems: 'center', marginTop: 20, marginBottom: 16 },
  banner: { width: 140, height: 140, borderRadius: 70, borderWidth: 3, borderColor: '#8B4513', marginBottom: 12 },
  bannerText: { fontSize: 28, fontWeight: '800', color: '#4E3B2F', textAlign: 'center' },
  bannerSubtitle: { fontSize: 16, color: '#5E4C3B', fontStyle: 'italic', marginTop: 4 },

  // VIP Button
  vipBtn: { backgroundColor: '#FFD700', marginHorizontal: 40, paddingVertical: 12, borderRadius: 30, alignItems: 'center', marginBottom: 20, shadowColor: '#B8860B', shadowOpacity: 0.5, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
  vipBtnText: { color: '#4E3B2F', fontSize: 16, fontWeight: '700' },

  // Card Giới thiệu
  card: { backgroundColor: '#FFFDF8', padding: 20, borderRadius: 16, marginHorizontal: 16, marginBottom: 16, shadowColor: '#C2A889', shadowOpacity: 0.25, shadowRadius: 10, shadowOffset: { width: 0, height: 5 } },
  introImage: { width: '100%', height: 160, borderRadius: 12, marginBottom: 12 },
  cardTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10, color: '#4E3B2F' },
  cardText: { fontSize: 16, color: '#5E4C3B', lineHeight: 22 },

  // Menu Section
  menuSection: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginHorizontal: 16, marginBottom: 12, color: '#4E3B2F' },
  menuScroll: { paddingLeft: 16 },
  menuCard: { width: 140, marginRight: 12, borderRadius: 16, backgroundColor: '#FFFDF8', padding: 10, alignItems: 'center', shadowColor: '#C2A889', shadowOpacity: 0.25, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
  menuImage: { width: 120, height: 100, borderRadius: 12, marginBottom: 6 },
  menuName: { fontSize: 14, fontWeight: '600', color: '#5E4C3B', textAlign: 'center' },

  // Best Seller
  bestCard: { backgroundColor: '#F2E3C6', padding: 20, borderRadius: 16, marginHorizontal: 16, shadowColor: '#B0854A', shadowOpacity: 0.3, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, marginBottom: 40, alignItems: 'center' },
  bestBadge: { backgroundColor: '#FF4500', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 20, marginBottom: 8 },
  bestBadgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  bestImage: { width: 160, height: 140, borderRadius: 12, marginBottom: 12 },
  bestTitle: { fontSize: 22, fontWeight: '800', color: '#7A512E', marginBottom: 6 },
  bestText: { fontSize: 16, color: '#6A4A33', lineHeight: 22, textAlign: 'center', marginBottom: 12 },

  // Menu Button
  menuBtn: { backgroundColor: '#8B4513', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 25, alignItems: 'center', shadowColor: '#8B4513', shadowOpacity: 0.35, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
  menuBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
