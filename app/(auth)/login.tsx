import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onLogin() {
    setLoading(true);
    setError('');
    try {
      const ok = await signIn(email.trim(), password);
      if (!ok) setError('Đăng nhập thất bại');
    } catch {
      setError('Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, width: '100%' }}>
        <View style={styles.inner}>
          <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {!!error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity style={styles.btn} onPress={onLogin} disabled={loading}>
            <Text style={styles.btnText}>{loading ? 'Loading...' : 'Sign in'}</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text>Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push('signup')}>
              <Text style={{ color: '#C94A3A', fontWeight: '700' }}> Sign up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.link} onPress={() => navigation.push('forgot')}>
            <Text style={{ color: '#6B6B6B' }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  inner: { width: '86%', alignItems: 'center' },
  title: { fontSize: 28, marginBottom: 20 },
  input: { width: '100%', padding: 12, borderRadius: 10, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
  btn: { width: '100%', backgroundColor: '#C94A3A', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: '700' },
  row: { flexDirection: 'row', marginTop: 12 },
  link: { marginTop: 8 },
  error: { color: '#C94A3A', marginBottom: 8 },
});
