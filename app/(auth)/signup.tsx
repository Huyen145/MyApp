import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignupScreen({ navigation }: any) {
  const { signUp } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSignup() {
    setLoading(true);
    setError('');
    try {
      const ok = await signUp(name.trim(), email.trim(), password);
      if (ok) {
        navigation.replace('index');
      } else setError('Đăng ký thất bại');
    } catch {
      setError('Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.inner}>
        <ThemedText type="title" style={styles.title}>Create account</ThemedText>

        <TextInput style={styles.input} placeholder="Full name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

        {!!error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.btn} onPress={onSignup} disabled={loading}>
          <Text style={styles.btnText}>{loading ? 'Creating...' : 'Sign up'}</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('login')}>
            <Text style={{ color: '#C94A3A', fontWeight: '700' }}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  inner: { width: '86%', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 14 },
  input: { width: '100%', padding: 12, borderRadius: 10, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
  btn: { width: '100%', backgroundColor: '#C94A3A', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: '700' },
  row: { flexDirection: 'row', marginTop: 12 },
  error: { color: '#C94A3A', marginBottom: 8 },
});
