import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgotScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function onSend() {
    // Mock: pretend we sent email
    setSent(true);
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.inner}>
        <ThemedText type="title" style={styles.title}>Reset password</ThemedText>
        {!sent ? (
          <>
            <TextInput style={styles.input} placeholder="Your email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            <TouchableOpacity style={styles.btn} onPress={onSend}>
              <Text style={styles.btnText}>Send reset link</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={{ color: '#2F2F2F' }}>If the email exists, a reset link has been sent.</Text>
        )}

        <TouchableOpacity style={{ marginTop: 16 }} onPress={() => navigation.goBack()}>
          <Text style={{ color: '#6B6B6B' }}>Back</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  inner: { width: '86%', alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 12 },
  input: { width: '100%', padding: 12, borderRadius: 10, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
  btn: { width: '100%', backgroundColor: '#C94A3A', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: '700' },
});
