import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function OTPScreen() {
  const { otp, to } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleVerify = () => {
    if (code !== otp) {
      Alert.alert("Sai mã OTP", "Vui lòng kiểm tra lại!");
      return;
    }

    // reset-password route not implemented — navigate back to Forgot screen for now
    router.push("/ForgotPasswordScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác minh OTP</Text>
      <Text style={styles.sub}>Mã đã gửi đến: {to}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập mã OTP"
        keyboardType="numeric"
        maxLength={6}
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F4EDE3",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#8B4513",
    textAlign: "center",
  },
  sub: {
    textAlign: "center",
    marginVertical: 8,
    color: "#6B4F33",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6D7C7",
    textAlign: "center",
    marginTop: 20,
    fontSize: 22,
    letterSpacing: 8,
  },
  button: {
    marginTop: 22,
    backgroundColor: "#C94A3A",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
