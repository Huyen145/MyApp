import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignupScreen() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignup() {
    setError('');

    if (!username || !fullName || !email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (password !== confirm) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);

    const ok = await signUp({
      username,
      password,
      full_name: fullName,
      email,
    });

    setLoading(false);

    if (!ok) {
      setError('Username đã tồn tại hoặc lỗi kết nối');
      return;
    }

    Alert.alert('Thành công', 'Đăng ký thành công', [
      { text: 'OK', onPress: () => router.replace('/login') },
    ]);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Tạo tài khoản</Text>

        <Input placeholder="Username" value={username} set={setUsername} />
        <Input placeholder="Họ tên" value={fullName} set={setFullName} />
        <Input placeholder="Email" value={email} set={setEmail} />
        <Input placeholder="Mật khẩu" value={password} set={setPassword} secure />
        <Input placeholder="Xác nhận mật khẩu" value={confirm} set={setConfirm} secure />

        {!!error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Đang tạo...' : 'Đăng ký'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ===== INPUT COMPONENT ===== */
function Input({
  value,
  set,
  placeholder,
  secure = false,
}: {
  value: string;
  set: (v: string) => void;
  placeholder: string;
  secure?: boolean;
}) {
  return (
    <View style={styles.inputRow}>
      <Ionicons name="person-outline" size={20} color="#000" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={set}
        secureTextEntry={secure}
      />
    </View>
  );
}

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EDE3',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#FFFDF9',
    padding: 24,
    borderRadius: 20,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    color: '#5A3A22',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF6F1',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8D7C1',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#C94A3A',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  error: {
    color: '#C94A3A',
    marginBottom: 10,
    textAlign: 'center',
  },
});
