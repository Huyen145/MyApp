import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
  onPress: (item: Product) => void;
}

export default function ProductGrid({ products, onPress }: Props) {
  const renderStars = (rate = 0) => {
    const r = Math.round(rate * 2) / 2;
    const full = Math.floor(r);
    const half = r - full >= 0.5;

    return (
      <View style={{ flexDirection: "row" }}>
        {[...Array(5)].map((_, i) => {
          if (i < full)
            return <Ionicons key={i} name="star" size={12} color="#F2B7C1" />;
          if (i === full && half)
            return (
              <Ionicons key={i} name="star-half" size={12} color="#F2B7C1" />
            );
          return (
            <Ionicons
              key={i}
              name="star-outline"
              size={12}
              color="#E6E6E6"
            />
          );
        })}
      </View>
    );
  };

const renderPrice = (item: Product) => {
  // Có prices (nhiều size)
  if (item.prices?.length) {
    const min = Math.min(...item.prices.map(p => p.price));
    return `${min.toLocaleString()}đ`;
  }

  // Không có prices → dùng price hoặc basePrice
  const price = item.price ?? item.basePrice ?? 0;
  return `${price.toLocaleString()}đ`;
};

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(i) => i.id.toString()}
      scrollEnabled={false}
      columnWrapperStyle={styles.columnWrapper}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
          <Image
            source={
              typeof item.image === "string"
                ? { uri: item.image }
                : require("@/assets/images/logo.jpg")
            }
            style={styles.thumb}
          />

          <ThemedText style={styles.name} numberOfLines={2}>
            {item.name}
          </ThemedText>

          <View style={styles.row}>
            {renderStars(item.rating)}
            <ThemedText style={styles.price}>
              {renderPrice(item)}
            </ThemedText>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  columnWrapper: { justifyContent: "space-between", paddingHorizontal: 8 },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 12,
    alignItems: "center",
  },
  thumb: { width: 76, height: 76, borderRadius: 38 },
  name: { marginTop: 8, fontWeight: "700", textAlign: "center" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 6,
  },
  price: { color: "#C94A3A", fontWeight: "800" },
});
