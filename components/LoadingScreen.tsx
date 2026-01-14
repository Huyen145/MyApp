import { useRef } from "react";
import { ActivityIndicator, Animated, Easing, StyleSheet, Text, View } from "react-native";

export default function LoadingScreen() {
  // Dùng useRef để không reset giá trị khi re-render
  const rotateValue = useRef(new Animated.Value(0)).current;

  // Animation xoay logo
  Animated.loop(
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 5500,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  // Convert value → degree
  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/nuoc/tea.jpg")}
        style={[styles.logo, { transform: [{ rotate: spin }] }]}
      />

      <Text style={styles.title}>Coffee House</Text>
      <Text style={styles.subtitle}>Chào mừng bạn trở lại</Text>

      <ActivityIndicator size="large" color="#8B4513" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4EDE3",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#8B4513",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    color: "#A48063",
  },
});
