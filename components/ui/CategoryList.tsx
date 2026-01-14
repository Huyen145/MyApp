import { ThemedText } from "@/components/themed-text";
import { Category } from "@/types/category";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

/* ===== PROPS ===== */
export type CategoryListProps = {
  selected: string; // slug
  onSelect: (slug: string) => void;
  categories?: Category[];
  loading?: boolean;
  iconShape?: "circle" | "square" | "rounded";
};

/* ===== DEFAULT (fallback khi API chưa có) ===== */
const defaultItems: Category[] = [
  { id: 0, name: "All", slug: "all" },
  { id: 1, name: "Coffee", slug: "coffee" },
  { id: 2, name: "Trà", slug: "tra" },
  { id: 3, name: "Sinh tố", slug: "sinh-to" },
  { id: 4, name: "Bánh ngọt", slug: "banh-ngot" },
  { id: 5, name: "Khác", slug: "khac" },
];

/* ===== CHUẨN HÓA TÊN (BỎ DẤU + lowercase) ===== */
const normalize = (text = "") =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

/* ===== ICON MAP THEO TÊN ===== */
const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  all: "apps-outline",

  coffee: "cafe-outline",
  "ca-phe": "cafe-outline",

  tra: "water-outline",
  tea: "water-outline",

  "sinh-to": "sparkles-outline",
  smoothie: "sparkles-outline",

  "banh-ngot": "gift-outline",
  cake: "gift-outline",
  bakery: "gift-outline",

  khac: "sparkles-outline",
  other: "sparkles-outline",
};

/* ===== LẤY ICON THEO NAME ===== */
const getIconByName = (name?: string) => {
  const key = normalize(name);
  return iconMap[key] ?? "ellipse-outline";
};

/* ===== COMPONENT ===== */
export default function CategoryList({
  selected,
  onSelect,
  categories,
  loading = false,
  iconShape = "circle",
}: CategoryListProps) {
  const items = categories?.length ? categories : defaultItems;

  const shapeStyle =
    iconShape === "square"
      ? styles.square
      : iconShape === "rounded"
      ? styles.rounded
      : styles.circle;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {loading
        ? Array.from({ length: 6 }).map((_, idx) => (
            <View key={idx} style={styles.tile}>
              <View style={shapeStyle}>
                <Ionicons
                  name="ellipse-outline"
                  size={22}
                  color="#C94A3A"
                />
              </View>
              <ThemedText style={styles.tileLabel}> </ThemedText>
            </View>
          ))
        : items
            .filter(Boolean)
            .map((item) => {
              const isActive = selected === item.slug;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.tile}
                  onPress={() => onSelect(item.slug)}
                  activeOpacity={0.85}
                >
                  <View
                    style={[
                      shapeStyle,
                      isActive && styles.shapeActive,
                    ]}
                  >
                    <Ionicons
                      name={getIconByName(item.name)}
                      size={22}
                      color={isActive ? "#fff" : "#C94A3A"}
                    />
                  </View>

                  <ThemedText
                    style={[
                      styles.tileLabel,
                      isActive && styles.tileLabelActive,
                    ]}
                    numberOfLines={1}
                  >
                    {item.name}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
    </ScrollView>
  );
}

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  tile: {
    width: 84,
    marginRight: 12,
    alignItems: "center",
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  square: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  rounded: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  shapeActive: {
    backgroundColor: "#C94A3A",
    elevation: 6,
  },
  tileLabel: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#3B3B3B",
    textAlign: "center",
  },
  tileLabelActive: {
    color: "#C94A3A",
  },
});
