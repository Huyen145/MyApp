import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ForgotPassword() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleNext = () => {
    if (!value.trim()) return;
    router.push({
      pathname: "/(auth)/otp",
      params: { target: value },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>
      <Text style={styles.subtitle}>
        Nhập email hoặc số điện thoại của bạn
      </Text>

      <TextInput
        placeholder="Email hoặc SĐT"
        style={styles.input}
        value={value}
        onChangeText={setValue}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Gửi OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 10 },
  subtitle: { fontSize: 14, opacity: 0.6, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#C94A3A",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "700" },
  back: { color: "#C94A3A", textAlign: "center", marginTop: 10 },
});
