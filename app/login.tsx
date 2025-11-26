import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter(); // phải dùng useRouter
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    if (username === 'Han' && password === '123456') {
      if (Platform.OS === 'web') {
        window.alert('Đăng nhập thành công!');
        router.push('/'); // chuyển về Home
      } else {
        Alert.alert('Thành công', 'Đăng nhập thành công!', [
          {
            text: 'OK',
            onPress: () => router.push('/'), // chuyển về Home
          },
        ]);
      }
    } else {
      Alert.alert('Lỗi', 'Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Đăng Nhập Coffee House</Text>

        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          placeholderTextColor="#8B6F47"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#8B6F47"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <Text style={styles.bottomText}>
          Chưa có tài khoản?{' '}
          <Link href="/signup">
            <Text style={styles.bottomLink}>Đăng ký ngay</Text>
          </Link>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 24, backgroundColor: '#F4EDE3' },
  card: {
    backgroundColor: '#FFFDF9',
    padding: 26,
    borderRadius: 18,
    elevation: 4,
    shadowColor: '#8B4513',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
  title: { fontSize: 26, fontWeight: '700', textAlign: 'center', marginBottom: 24, color: '#5A3A22' },
  input: {
    borderWidth: 1,
    borderColor: '#C8B49A',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#FAF6F1',
  },
  button: {
    backgroundColor: '#8B4513',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#8B4513',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  bottomText: { textAlign: 'center', marginTop: 20, fontSize: 15, color: '#6B5641' },
  bottomLink: { color: '#8B4513', fontWeight: '700' },
});
