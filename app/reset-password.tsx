import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email, otp } = useLocalSearchParams<{
    email: string;
    otp: string;
  }>();

  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!pass || !confirm) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (pass.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải từ 6 ký tự trở lên");
      return;
    }

    if (pass !== confirm) {
      Alert.alert("Lỗi", "Mật khẩu nhập lại không khớp");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://example10-production-1d2e.up.railway.app/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            email: String(email),
            otp: String(otp),
            newPassword: pass,
          }).toString(),
        }
      );

      if (!res.ok) throw new Error();

      Alert.alert("Thành công", "Đổi mật khẩu thành công", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    } catch {
      Alert.alert("Lỗi", "OTP không đúng hoặc đã hết hạn");
    } finally {
      setLoading(false);
    }
  };

  // ✅ JSX PHẢI Ở ĐÂY
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Đặt lại mật khẩu</Text>

        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Mật khẩu mới"
          value={pass}
          onChangeText={setPass}
        />

        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          value={confirm}
          onChangeText={setConfirm}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EDE3",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#8B4513",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFDF9",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E8D7C1",
    marginBottom: 14,
    fontSize: 16,
    color: "#5A3A22",
  },
  button: {
    backgroundColor: "#C94A3A",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
