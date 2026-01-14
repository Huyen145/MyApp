import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ForgotPasswordScreen() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSendOTP = () => {
    if (!value.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập email hoặc số điện thoại");
      return;
    }

    // 🚀 Gửi OTP (demo: tạo OTP randomly)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    router.push({
      pathname: "/OTPScreen",
      params: { otp, to: value },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>
      <Text style={styles.sub}>
        Nhập email hoặc số điện thoại của bạn để nhận mã OTP
      </Text>

      <View style={styles.inputRow}>
        <Ionicons name="mail-outline" size={20} color="#8B6F47" />
        <TextInput
          style={styles.input}
          placeholder="Email hoặc Số điện thoại"
          value={value}
          onChangeText={setValue}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
        <Text style={styles.buttonText}>Gửi mã OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F4EDE3",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#8B4513",
    textAlign: "center",
  },
  sub: {
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
    color: "#6B4F33",
  },
  inputRow: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6D7C7",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#C94A3A",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
