import React, { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

// Generic product type for carousel
type ProductLike = {
  id: number;
  image?: string | any;
  [key: string]: any;
};

type Props<T extends ProductLike = ProductLike> = {
  data: T[];
  onPress?: (item: T) => void;
};

export default function FeaturedCarousel<T extends ProductLike = ProductLike>({ data, onPress }: Props<T>) {
  const flatRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);

  // 🔥 Auto slide FIXED
  useEffect(() => {
    if (data.length === 0) return;

    const timer = setInterval(() => {
      const next = (index + 1) % data.length;
      flatRef.current?.scrollToIndex({ index: next, animated: true });
      setIndex(next);
    }, 3000);

    return () => clearInterval(timer);
  }, [index, data.length]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()} // 🔥 FIXED
        onScroll={(e) => {
          const newIndex = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} onPress={() => onPress?.(item)}>
            {/* support both remote uri (string) and local require() (number) */}
            <Image
              source={typeof item.image === 'string' ? { uri: item.image } : item.image}
              style={styles.image}
            />
          </TouchableOpacity>
        )}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, index === i && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  image: {
    width: width - 32,
    height: 180,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#C94A3A",
    width: 10,
  },
});
