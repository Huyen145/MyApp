import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    setLoading(true);
    const success = await signIn(username, password);
    setLoading(false);

    if (success) {
      Alert.alert('Thành công', 'Đăng nhập thành công!', [
        { text: 'OK', onPress: () => router.replace('/') },
      ]);
    } else {
      Alert.alert('Đăng nhập thất bại', 'Tên đăng nhập hoặc mật khẩu không đúng');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.brand}>Tiệm Bánh Mây</Text>
        <Text style={styles.title}>Đăng nhập</Text>

        <View style={styles.inputRow}>
          <Ionicons name="person-outline" size={20} color="#8B6F47" />
          <TextInput
            style={styles.input}
            placeholder="Tên đăng nhập"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

<View style={styles.inputRow}>
  <Ionicons name="lock-closed-outline" size={20} color="#8B6F47" />

  <TextInput
    style={styles.input}
    placeholder="Mật khẩu"
    secureTextEntry={!showPassword}   // 👈 quan trọng
    value={password}
    onChangeText={setPassword}
  />

  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Ionicons
      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
      size={20}
      color="#8B6F47"
    />
  </TouchableOpacity>
</View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Đăng nhập</Text>
          )}
        </TouchableOpacity>

        <View style={styles.linksRow}>
          <Link href="/signup">
            <Text style={styles.linkText}>Đăng ký</Text>
          </Link>
          <Link href="/forgot">
            <Text style={styles.linkText}>Quên mật khẩu?</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#F4EDE3',
  },
  card: {
    backgroundColor: '#FFFDF9',
    padding: 24,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#8B4513',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  brand: {
    fontSize: 24,
    color: '#8B4513',
    fontWeight: '700',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 18,
    color: '#5A3A22',
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF6F1',
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E8D7C1',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#C94A3A',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  linkText: {
    color: '#8B4513',
    fontWeight: '600',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8D7C1',
  },
  orText: {
    marginHorizontal: 8,
    color: '#B0865F',
    fontWeight: '500',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  socialText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#6B6B6B',
    fontWeight: '500',
  },
});
