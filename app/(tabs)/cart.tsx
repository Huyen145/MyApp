import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { CartContext } from "@/contexts/CartContext";
import { useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function CartScreen() {
  const router = useRouter();
  const { items, updateQty, removeItem, total } = useContext(CartContext);

  const DELIVERY_FEE = 15000;
  const DISCOUNT = 5000;

  function onCheckout() {
    router.push("/checkout");
  }

  return (
    <ThemedView style={styles.container}>
      {/* TITLE */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Giỏ hàng</ThemedText>
      </View>

      {/* EMPTY */}
      {items.length === 0 ? (
        <View style={styles.emptyBox}>
          <Image
            source={require("@/assets/images/nuoc/tea.jpg")}
            style={styles.emptyImg}
          />
          <ThemedText style={styles.emptyText}>Giỏ hàng của bạn trống</ThemedText>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.img} />

              <View style={styles.infoBox}>
                <ThemedText style={styles.name}>{item.name}</ThemedText>

                {/* Options (size / flavor / notes) */}
                {(() => {
                  const opts = (item as any).options;
                  return (
                    <>
                      {opts?.size && <ThemedText style={{fontSize:13, color:'#6B6B6B'}}>Size: {opts.size}</ThemedText>}
                      {opts?.flavor && <ThemedText style={{fontSize:13, color:'#6B6B6B'}}>Vị: {opts.flavor}</ThemedText>}
                      {opts?.notes && opts.notes.length > 0 && <ThemedText style={{fontSize:13, color:'#6B6B6B'}}>Ghi chú: {opts.notes.join(', ')}</ThemedText>}
                      {opts?.customText && <ThemedText style={{fontSize:13, color:'#6B6B6B'}}>Nội dung: {opts.customText}</ThemedText>}
                    </>
                  );
                })()}

                <ThemedText style={styles.unitPrice}>
                  Đơn giá: {item.price.toLocaleString()}đ
                </ThemedText>

                <ThemedText style={styles.lineTotal}>
                  Thành tiền: {(item.price * item.qty).toLocaleString()}đ
                </ThemedText>

                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    onPress={() =>
                      updateQty(item.id, Math.max(1, item.qty - 1))
                    }
                    style={styles.qtyBtn}
                  >
                    <ThemedText style={styles.qtyText}>−</ThemedText>
                  </TouchableOpacity>

                  <ThemedText style={styles.qtyNumber}>{item.qty}</ThemedText>

                  <TouchableOpacity
                    onPress={() => updateQty(item.id, item.qty + 1)}
                    style={styles.qtyBtn}
                  >
                    <ThemedText style={styles.qtyText}>+</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => removeItem(item.id)}
                style={styles.del}
              >
                <ThemedText style={styles.removeText}>Xóa</ThemedText>
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              <View style={styles.totalRow}>
                <ThemedText>Tạm tính</ThemedText>
                <ThemedText>{total().toLocaleString()}đ</ThemedText>
              </View>

              <View style={styles.totalRow}>
                <ThemedText>Giảm giá</ThemedText>
                <ThemedText>-{DISCOUNT.toLocaleString()}đ</ThemedText>
              </View>

              <View style={styles.totalRow}>
                <ThemedText>Phí giao hàng</ThemedText>
                <ThemedText>{DELIVERY_FEE.toLocaleString()}đ</ThemedText>
              </View>

              <View style={styles.totalFinal}>
                <ThemedText style={styles.totalFinalText}>Tổng thanh toán</ThemedText>
                <ThemedText style={styles.totalFinalPrice}>
                  {(total() - DISCOUNT + DELIVERY_FEE).toLocaleString()}đ
                </ThemedText>
              </View>

              <TouchableOpacity style={styles.checkout} onPress={onCheckout}>
                <ThemedText style={styles.checkoutText}>Thanh toán</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2E3C6" },

  header: {
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#C94A3A",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  emptyBox: { marginTop: 80, alignItems: "center" },
  emptyImg: { width: 130, height: 130, opacity: 0.8 },
  emptyText: { marginTop: 12, fontSize: 16 },

  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    elevation: 2,
  },
  img: { width: 90, height: 70, borderRadius: 10 },

  infoBox: { flex: 1, paddingLeft: 12 },

  name: { fontWeight: "700", fontSize: 15, marginBottom: 6 },
  unitPrice: { color: "#9C735A", fontSize: 13 },
  lineTotal: { marginTop: 4, fontWeight: "700", color: "#C94A3A" },

  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F6EFE7",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { fontSize: 20, fontWeight: "700" },
  qtyNumber: { marginHorizontal: 12, fontWeight: "700", fontSize: 15 },

  del: { justifyContent: "center", paddingLeft: 6 },
  removeText: { color: "#C94A3A", fontWeight: "700" },

  footer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginTop: 10,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  totalFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#E5D6C8",
  },
  totalFinalText: { fontWeight: "800", fontSize: 16 },
  totalFinalPrice: { fontWeight: "800", fontSize: 18, color: "#C94A3A" },

  checkout: {
    marginTop: 20,
    backgroundColor: "#C94A3A",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 30,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
