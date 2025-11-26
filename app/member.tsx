import { View, Text, StyleSheet } from "react-native";

export default function MemberScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thành viên VIP</Text>

      <View style={styles.card}>
        <Text style={styles.level}>Hạng hiện tại: GOLD</Text>
        <Text style={styles.point}>Điểm tích lũy: 340 điểm</Text>
        <Text style={styles.desc}>Ưu đãi: Giảm 20% mọi món nước</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4EDE3", padding: 24 },
  title: { fontSize: 30, fontWeight: "800", textAlign: "center", marginBottom: 20, color: "#4E3B2F" },
  card: { backgroundColor: "#FFFDF8", padding: 24, borderRadius: 16 },
  level: { fontSize: 22, fontWeight: "700", color: "#8B4513", marginBottom: 10 },
  point: { fontSize: 18, marginBottom: 6 },
  desc: { fontSize: 16, color: "#5E4C3B" },
});
