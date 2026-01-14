import { ThemedText } from "@/components/themed-text";
import { Ionicons } from '@expo/vector-icons';
import { Image } from "expo-image";
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Header() {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <View>
        <ThemedText style={styles.title}>Tiệm Bánh Mây</ThemedText>
        <ThemedText style={styles.note}>Good Morning</ThemedText>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={styles.chatBtn} onPress={() => router.push('/chat')}>
          <Ionicons name="chatbubble-ellipses-outline" size={22} color="#8B4513" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.avatarBtn}>
          <Image
            source={require("../../assets/images/logo.jpg")}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 30,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "700" },
  note: { fontSize: 12, color: "#777" },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  chatBtn: { marginRight: 10, padding: 6 },
});
