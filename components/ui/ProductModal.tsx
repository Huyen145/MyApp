import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";

import { Product, PriceItem } from "@/types/product";

/* ===== TYPES ===== */
type Size = PriceItem["size"];

type Props = {
  product: Product | null;
  onClose: () => void;
  onAdd: (
    product: Product,
    qty: number,
    options?: {
      size?: Size;
      unitPrice?: number;
    }
  ) => void;
};

export default function ProductModal({
  product,
  onClose,
  onAdd,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  /* reset khi mở sản phẩm mới */
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedSize(null);
    }
  }, [product]);

  /* ❗ KHÔNG return trước hook */
  const prices: PriceItem[] = product?.prices ?? [];

  const selectedPrice =
    selectedSize
      ? prices.find((p) => p.size === selectedSize)?.price ?? null
      : null;

  if (!product) return null;

  /* ===== IMAGE SOURCE ===== */
  const imageSource =
    typeof product.image === "string"
      ? { uri: product.image }
      : Array.isArray(product.images) &&
        typeof product.images[0] === "string"
      ? { uri: product.images[0] }
      : require("@/assets/images/logo.jpg");

  const handleAdd = () => {
    if (prices.length > 0 && !selectedSize) {
      alert("Vui lòng chọn size");
      return;
    }

    onAdd(product, quantity, {
      size: selectedSize ?? undefined,
      unitPrice:
        selectedPrice ??
        product.price ??
        product.basePrice ??
        0,
    });
  };

  return (
    <Modal transparent animationType="slide">
      <View style={styles.wrap}>
        <View style={styles.card}>
          {/* CLOSE */}
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text>✕</Text>
          </TouchableOpacity>

          {/* IMAGE */}
          <Image
            source={imageSource}
            style={styles.img}
            contentFit="cover"
          />

          {/* NAME */}
          <Text style={styles.name}>{product.name}</Text>

          {/* SIZE OPTIONS */}
          {prices.length > 0 && (
            <View style={styles.optionRow}>
              {prices.map((p) => {
                const active = selectedSize === p.size;
                return (
                  <TouchableOpacity
                    key={p.size}
                    onPress={() => setSelectedSize(p.size)}
                    style={[
                      styles.optionBtn,
                      active && styles.optionBtnActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        active && styles.optionTextActive,
                      ]}
                    >
                      {p.size} – {p.price.toLocaleString()}đ
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* QUANTITY */}
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
            >
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtyValue}>{quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => q + 1)}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* ADD BUTTON */}
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Text style={styles.addText}>Thêm vào giỏ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

/* ================== STYLES ================== */
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    maxHeight: "85%",
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  img: {
    width: "100%",
    height: 260,
    borderRadius: 14,
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 12,
    color: "#222",
  },
  qtyRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    alignItems: "center",
  },
  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F4EFE6",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { fontSize: 20, fontWeight: "700" },
  qtyValue: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 20,
  },
  addBtn: {
    marginTop: 20,
    backgroundColor: "#C94A3A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  optionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#F4EFE6",
    marginRight: 8,
    marginBottom: 8,
  },
  optionBtnActive: {
    backgroundColor: "#C94A3A",
  },
  optionText: { color: "#333" },
  optionTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
});
