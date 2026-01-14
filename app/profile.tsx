import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';

export default function ProfileScreen() {
	return (
		<ThemedView style={styles.container}>
			<ThemedText style={styles.title}>Profile</ThemedText>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	title: { fontSize: 20, fontWeight: '700' },
});
