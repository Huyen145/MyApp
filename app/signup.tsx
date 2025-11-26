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
import { router } from "expo-router";

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!name || !email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    Alert.alert('Thành công', 'Đăng ký thành công!');
    router.push('/login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Tạo tài khoản Coffee House</Text>

        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          placeholderTextColor="#8B6F47"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#8B6F47"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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

        <TouchableOpacity style={styles.button} onPress={handleSignUp} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

        <Text style={styles.bottomText}>
          Đã có tài khoản?{' '}
          <Text style={styles.bottomLink} onPress={() => router.push('/login')}>
            Đăng nhập
          </Text>
        </Text>
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
    padding: 26,
    borderRadius: 18,
    elevation: 4,
    shadowColor: '#8B4513',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    color: '#5A3A22',
  },
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
    color: '#6B5641',
  },
  bottomLink: {
    color: '#8B4513',
    fontWeight: '700',
  },
});
