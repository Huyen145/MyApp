import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { Colors } from '../../constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];
type Props = { items: { key: string; label: string; icon?: IconName }[] };

export default function SettingsSection({ items }: Props) {
  return (
    <View>
      {items.map((it) => (
        <Pressable key={it.key} style={styles.menuItem}>
          <Ionicons name={it.icon || 'chevron-forward'} size={18} color={Colors.light.text} />
          <ThemedText style={styles.menuText}>{it.label}</ThemedText>
          <Ionicons name="chevron-forward" size={16} color={Colors.light.icon} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  menuText: { fontSize: 14, flex: 1, marginLeft: 12 },
});
