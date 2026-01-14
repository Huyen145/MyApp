import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function OtpScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // chỉ cho nhập số

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // focus ô tiếp theo
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // đủ 6 số → chuyển sang reset password
    if (index === 5) {
      const otp = newCode.join("");

      if (otp.length !== 6) {
        Alert.alert("Lỗi", "OTP không hợp lệ");
        return;
      }

      router.push({
        pathname: "/reset-password",
        params: { email, otp },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập mã OTP</Text>
      <Text style={styles.subtitle}>
        OTP đã gửi đến: {email ?? "Không xác định"}
      </Text>

      <View style={styles.row}>
        {code.map((v, i) => (
          <TextInput
            key={i}
            ref={(ref) => {
              inputs.current[i] = ref; // ⚠️ KHÔNG return
            }}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={v}
            autoFocus={i === 0}
            onChangeText={(value) => handleChange(value, i)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F4EDE3",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#8B4513",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 25,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    width: 48,
    height: 52,
    borderWidth: 1.5,
    borderColor: "#C94A3A",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    backgroundColor: "#fff",
  },
  backBtn: {
    marginTop: 20,
  },
  backText: {
    textAlign: "center",
    color: "#999",
  },
});
