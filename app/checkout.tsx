import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán</Text>

      <View style={styles.box}>
        <Text style={styles.item}>• Tổng tiền: 150.000đ</Text>
        <Text style={styles.item}>• Phương thức: Tiền mặt / Momo / Banking</Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Xác nhận thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F4EDE3" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20, textAlign: "center", color: "#4E3B2F" },
  box: { backgroundColor: "#FFFDF8", padding: 20, borderRadius: 16, marginBottom: 20 },
  item: { fontSize: 16, color: "#5E4C3B", marginBottom: 10 },
  btn: {
    backgroundColor: "#8B4513",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 18 },
});
