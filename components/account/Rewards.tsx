import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../../components/themed-text';

export default function Rewards() {
  return (
    <View style={styles.rewardsBox}>
      <View style={styles.rewardItem}>
        <View style={styles.rewardIcon}><Ionicons name="star" size={20} color="#FFB800" /></View>
        <View style={styles.rewardInfo}><ThemedText style={styles.rewardValue}>120</ThemedText><ThemedText style={styles.rewardLabel}>Điểm tích lũy</ThemedText></View>
      </View>

      <View style={styles.rewardItem}>
        <View style={styles.rewardIcon}><Ionicons name="pricetag" size={20} color="#C94A3A" /></View>
        <View style={styles.rewardInfo}><ThemedText style={styles.rewardValue}>5</ThemedText><ThemedText style={styles.rewardLabel}>Voucher khả dụng</ThemedText></View>
      </View>

      <View style={styles.rewardItem}>
        <View style={styles.rewardIcon}><Ionicons name="flame" size={20} color="#FF6B35" /></View>
        <View style={styles.rewardInfo}><ThemedText style={styles.rewardValue}>50%</ThemedText><ThemedText style={styles.rewardLabel}>Ưu đãi hôm nay</ThemedText></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rewardsBox: { marginTop: 12, backgroundColor: '#fff', borderRadius: 8, padding: 8 },
  rewardItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8 },
  rewardIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
  rewardInfo: { marginLeft: 12, flex: 1 },
  rewardValue: { fontSize: 14, fontWeight: '700' },
  rewardLabel: { fontSize: 12, color: '#666', marginTop: 2 },
});
