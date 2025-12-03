import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CheckoutScreen() {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "momo" | "bank">("cash");
  const router = useRouter();

  const handleCheckout = () => {
    // Xử lý thanh toán ở đây (nếu có)

    router.replace("/"); // điều hướng về trang chủ
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Title */}
        <Text style={styles.title}>Thanh toán</Text>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tóm tắt đơn hàng</Text>

          <View style={styles.itemRow}>
            <Text style={styles.itemName}>Giá sản phẩm</Text>
            <Text style={styles.itemPrice}>150.000đ</Text>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.itemName}>Phí vận chuyển</Text>
            <Text style={styles.itemPrice}>0đ</Text>
          </View>

          <View style={styles.divider} />

          <View className="totalRow">
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalPrice}>150.000đ</Text>
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Họ và tên *</Text>
            <TextInput style={styles.input} placeholder="Nhập tên của bạn" placeholderTextColor="#999" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Số điện thoại *</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Địa chỉ giao hàng *</Text>
            <TextInput
              style={[styles.input, { height: 60 }]}
              multiline
              placeholder="Nhập địa chỉ đầy đủ"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>

          {[
            { key: "cash", label: "Thanh toán khi nhận hàng (COD)" },
            { key: "momo", label: "Ví MoMo" },
            { key: "bank", label: "Chuyển khoản ngân hàng" },
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.paymentOption,
                paymentMethod === option.key && styles.paymentOptionActive,
              ]}
              onPress={() => setPaymentMethod(option.key as any)}
            >
              <View
                style={[
                  styles.radio,
                  paymentMethod === option.key && styles.radioActive,
                ]}
              />
              <Text style={styles.paymentLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Note */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ghi chú đơn hàng (không bắt buộc)</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            multiline
            placeholder="Ví dụ: Giao giờ hành chính..."
            placeholderTextColor="#999"
          />
        </View>

      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutBtnText}>Xác nhận thanh toán - 150.000đ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2E3C6" },

  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 110 },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2F2F2F",
    textAlign: "center",
    marginBottom: 16,
  },

  section: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2F2F2F",
    marginBottom: 12,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  itemName: { fontSize: 14, color: "#5B5B5B" },
  itemPrice: { fontSize: 14, fontWeight: "700", color: "#C94A3A" },

  divider: {
    height: 1,
    backgroundColor: "#E8E8E8",
    marginVertical: 10,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  totalLabel: { fontSize: 15, fontWeight: "700", color: "#2F2F2F" },
  totalPrice: { fontSize: 18, fontWeight: "800", color: "#C94A3A" },

  inputGroup: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: "600", color: "#2F2F2F", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FAFAFA",
    color: "#333",
  },

  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 8,
  },
  paymentOptionActive: {
    borderColor: "#C94A3A",
    backgroundColor: "rgba(201, 74, 58, 0.08)",
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D0D0D0",
    marginRight: 12,
  },
  radioActive: {
    borderColor: "#C94A3A",
    backgroundColor: "#C94A3A",
  },

  paymentLabel: { fontSize: 14, fontWeight: "500", color: "#333" },

  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },

  checkoutBtn: {
    backgroundColor: "#C94A3A",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  checkoutBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
