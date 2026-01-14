import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// removed unused router import

type Drink = {
  id: number;
  name: string;
  price: number;
  image: any;
};

const drinks: Drink[] = [
  { id: 1, name: "Latte Kem Sữa", price: 49, image: require("../assets/images/nuoc/latte.jpg") },
  { id: 2, name: "Trà Đào Cam Sả", price: 45, image: require("../assets/images/nuoc/tea.jpg") },
  { id: 3, name: "Cà Phê Muối", price: 55, image: require("../assets/images/nuoc/saltcoffee.jpg") },
  { id: 4, name: "Trà Sữa Trân Châu", price: 42, image: require("../assets/images/nuoc/milktea.jpg") },
];

export default function MenuScreen() {
  const [cart, setCart] = useState<Drink[]>([]);

  const addToCart = (item: Drink) => {
    setCart([...cart, item]);
    alert(`${item.name} đã được thêm vào giỏ hàng`);
  };

  const renderItem = ({ item }: { item: Drink }) => (
    <View style={styles.itemCard}>
      <Image source={item.image} style={styles.image} />

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>💰 {item.price}.000đ</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => addToCart(item)}>
        <Text style={styles.btnText}>🛒 Chọn</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>☕ Menu Đồ Uống Cao Cấp</Text>

      <FlatList
        data={drinks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F4EDE3" },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16,
    color: "#4E3B2F",
  },
  itemCard: {
    flexDirection: "row",
    backgroundColor: "#FFFDF8",
    padding: 14,
    marginBottom: 14,
    borderRadius: 16,
    shadowColor: "#C2A889",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
  },
  image: { width: 90, height: 90, borderRadius: 12, marginRight: 12 },
  name: { fontSize: 18, fontWeight: "700", color: "#4E3B2F" },
  price: { fontSize: 16, color: "#7A5A42", marginTop: 4 },
  btn: {
    backgroundColor: "#8B4513",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#8B4513",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
