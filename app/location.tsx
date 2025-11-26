import { View, Text, Image, StyleSheet } from "react-native";

export default function LocationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vị trí quán</Text>

      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.map}
      />

      <Text style={styles.info}>📍 123 Nguyễn Trãi, TP.HCM</Text>
      <Text style={styles.info}>⏱ 7:00 - 22:00</Text>
      <Text style={styles.info}>☎ 0123 456 789</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F4EDE3" },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 20, color: "#4E3B2F" },
  map: { width: "100%", height: 300, borderRadius: 16, marginBottom: 20 },
  info: { fontSize: 18, color: "#5E4C3B", textAlign: "center", marginVertical: 4 },
});
