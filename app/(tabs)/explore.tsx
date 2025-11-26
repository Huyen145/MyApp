// app/explore.tsx
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';

type Drink = {
  id: number;
  name: string;
  price: number;
  image: any;
};

const drinks: Drink[] = [
  { id: 1, name: "Latte Kem Sữa", price: 49, image: require("@/assets/images/nuoc/latte.jpg") },
  { id: 2, name: "Trà Đào Cam Sả", price: 45, image: require("@/assets/images/nuoc/tea.jpg") },
  { id: 3, name: "Cà Phê Muối", price: 55, image: require("@/assets/images/nuoc/saltcoffee.jpg") },
  { id: 4, name: "Trà Sữa Trân Châu", price: 42, image: require("@/assets/images/nuoc/milktea.jpg") },
];

export default function ExploreScreen() {
  const [cart, setCart] = useState<Drink[]>([]);

  const addToCart = (item: Drink) => {
    setCart([...cart, item]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>🛒 Đặt món</ThemedText>
        <ThemedView style={styles.cartBadge}>
          <ThemedText style={styles.cartBadgeText}>{cart.length}</ThemedText>
        </ThemedView>
      </View>

      {/* Menu */}
      <FlatList
        data={drinks}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <ThemedText style={styles.name}>{item.name}</ThemedText>
              <ThemedText style={styles.price}>{item.price}.000đ</ThemedText>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => addToCart(item)}>
              <ThemedText style={styles.btnText}>Chọn</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4EDE3', padding: 16 },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#4E3B2F' },
  cartBadge: { backgroundColor: '#8B4513', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  cartBadgeText: { color: '#fff', fontWeight: '700' },

  // Item card
  itemCard: { flexDirection: 'row', backgroundColor: '#FFFDF8', padding: 14, marginBottom: 14, borderRadius: 16, shadowColor: '#C2A889', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, alignItems: 'center' },
  image: { width: 80, height: 80, borderRadius: 12 },
  name: { fontSize: 18, fontWeight: '600', color: '#4E3B2F' },
  price: { fontSize: 16, color: '#7A5A42', marginTop: 4 },
  btn: { backgroundColor: '#FFD700', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12, alignSelf: 'center' },
  btnText: { color: '#4E3B2F', fontWeight: '700' },
});
