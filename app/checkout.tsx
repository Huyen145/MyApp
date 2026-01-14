import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useContext, useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { CartContext } from "@/contexts/CartContext";

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, clear } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] =
    useState<"cash" | "momo" | "bank">("cash");

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  /* ===== TÍNH TIỀN ===== */
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const shippingFee = 0;
  const total = subtotal + shippingFee;

  /* ===== BUILD ORDER ===== */
const buildOrderPayload = () => ({
  table: {
    id: 1, // ✅ LUÔN LÀ BÀN 1
  },

  customerName,
  address,
  paymentMethod,
  note,

  discount: 0,

  orderItems: items.map((i) => ({
    product: {
      id: i.productId,
    },
    quantity: i.qty,
    size: i.options?.size,
  })),
});
  /* ===== SUBMIT ===== */
const handleCheckout = async () => {
  if (!items.length) {
    Alert.alert("Thông báo", "Giỏ hàng trống");
    return;
  }

  if (!customerName || !phone || !address) {
    Alert.alert("Thiếu thông tin", "Vui lòng nhập đầy đủ thông tin giao hàng");
    return;
  }

  try {
    const token = await AsyncStorage.getItem("token");

    const payload = buildOrderPayload();

    // ✅ LOG DATA GỬI VỀ BACKEND
    console.log("===== ORDER PAYLOAD =====");
    console.log(JSON.stringify(payload, null, 2));
    console.log("=========================");

    const res = await fetch(
      "https://example10-production-1d2e.up.railway.app/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.log("❌ BACKEND ERROR:", err);
      throw new Error(err);
    }

    const data = await res.json();

    // ✅ LOG RESPONSE BACKEND
    console.log("✅ BACKEND RESPONSE:", data);

    clear();
    Alert.alert("Thành công", "Đặt hàng thành công 🎉");
    router.replace("/");
  } catch (e: any) {
    console.log("🔥 CHECKOUT ERROR:", e);
    Alert.alert("Lỗi", e.message || "Đặt hàng thất bại");
  }
};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* TITLE */}
        <Text style={styles.title}>Thanh toán</Text>

        {/* ===== ORDER SUMMARY ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tóm tắt đơn hàng</Text>

          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemName}>
                {item.name}
                {item.options?.size ? ` (${item.options.size})` : ""} × {item.qty}
              </Text>
              <Text style={styles.itemPrice}>
                {(item.price * item.qty).toLocaleString()}đ
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.itemRow}>
            <Text style={styles.itemName}>Tạm tính</Text>
            <Text style={styles.itemPrice}>
              {subtotal.toLocaleString()}đ
            </Text>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.itemName}>Phí vận chuyển</Text>
            <Text style={styles.itemPrice}>0đ</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalPrice}>
              {total.toLocaleString()}đ
            </Text>
          </View>
        </View>

        {/* ===== DELIVERY INFO ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>

          <TextInput
            style={styles.input}
            value={customerName}
            onChangeText={setCustomerName}
            placeholder="Họ và tên"
          />

          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="Số điện thoại"
          />

          <TextInput
            style={[styles.input, { height: 60 }]}
            value={address}
            onChangeText={setAddress}
            multiline
            placeholder="Địa chỉ giao hàng"
          />
        </View>

        {/* ===== PAYMENT ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>

          {[
            { key: "cash", label: "Thanh toán khi nhận hàng (COD)" },
            { key: "momo", label: "Ví MoMo" },
            { key: "bank", label: "Chuyển khoản ngân hàng" },
          ].map((o) => (
            <TouchableOpacity
              key={o.key}
              style={[
                styles.paymentOption,
                paymentMethod === o.key && styles.paymentOptionActive,
              ]}
              onPress={() => setPaymentMethod(o.key as any)}
            >
              <View
                style={[
                  styles.radio,
                  paymentMethod === o.key && styles.radioActive,
                ]}
              />
              <Text>{o.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* NOTE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ghi chú</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            value={note}
            onChangeText={setNote}
            multiline
            placeholder="Ghi chú đơn hàng"
          />
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutBtnText}>
            Xác nhận đặt hàng – {total.toLocaleString()}đ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================== STYLES ================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2E3C6" },
  scrollContent: { padding: 16, paddingBottom: 120 },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", marginBottom: 16 },

  section: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },

  itemRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  itemName: { fontSize: 14, color: "#555" },
  itemPrice: { fontWeight: "700", color: "#C94A3A" },

  divider: { height: 1, backgroundColor: "#eee", marginVertical: 10 },

  totalRow: { flexDirection: "row", justifyContent: "space-between" },
  totalLabel: { fontWeight: "700" },
  totalPrice: { fontSize: 18, fontWeight: "800", color: "#C94A3A" },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },

  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  paymentOptionActive: {
    borderColor: "#C94A3A",
    backgroundColor: "rgba(201,74,58,0.08)",
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 10,
  },
  radioActive: {
    borderColor: "#C94A3A",
    backgroundColor: "#C94A3A",
  },

  footer: { position: "absolute", bottom: 20, left: 16, right: 16 },
  checkoutBtn: {
    backgroundColor: "#C94A3A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
