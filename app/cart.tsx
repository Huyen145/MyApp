import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function CartScreen() {
  const total = 150; // sau này thay bằng state thực tế

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ Hàng</Text>

      <View style={styles.box}>
        <Text style={styles.item}>• Latte Kem Sữa – 49.000đ</Text>
        <Text style={styles.item}>• Trà Đào Cam Sả – 45.000đ</Text>
        <Text style={styles.item}>• Cà Phê Muối – 55.000đ</Text>
      </View>

      <Text style={styles.total}>Tổng cộng: <Text style={styles.money}>{total}.000đ</Text></Text>

      <TouchableOpacity style={styles.btn} onPress={() => router.push("/checkout")}>
        <Text style={styles.btnText}>Thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F4EDE3" },
  title: { fontSize: 26, fontWeight: "700", textAlign: "center", marginBottom: 20, color: "#4E3B2F" },
  box: { backgroundColor: "#FFFDF8", padding: 20, borderRadius: 16, marginBottom: 20 },
  item: { fontSize: 16, color: "#5E4C3B", marginBottom: 8 },
  total: { fontSize: 20, fontWeight: "700", color: "#4E3B2F", marginBottom: 20 },
  money: { color: "#8B4513" },
  btn: {
    backgroundColor: "#8B4513",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
