import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

// ==== Khai báo kiểu Props ==== 
interface Props {
  value: string;
  onChange: (text: string) => void;
  onImageSearch?: (uri: string) => void; // callback khi người dùng chọn ảnh để tìm
}

export default function SearchBar({ value, onChange, onImageSearch }: Props) {
  const [picked, setPicked] = useState<string | null>(null);

  async function pickImage() {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') return;

      const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
      // Newer expo-image-picker returns { canceled, assets: [{ uri, ... }] }
      const uri = Array.isArray((res as any).assets) ? (res as any).assets[0]?.uri : (res as any).uri;
      const canceled = (res as any).canceled ?? (res as any).cancelled ?? false;
      if (!canceled && uri) {
        setPicked(uri);
        onImageSearch?.(uri);
      }
    } catch {
      // ignore
    }
  }

  return (
    <View style={styles.box}>
      <Ionicons name="search" size={18} color="#666" />
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm sản phẩm"
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChange}
      />

      {/* Image search button */}
      <TouchableOpacity onPress={pickImage} style={styles.iconBtn} accessibilityLabel="Search by image">
        <Ionicons name="camera" size={18} color="#666" />
      </TouchableOpacity>

      {/* Preview small thumbnail if picked */}
      {picked ? (
        <Image source={{ uri: picked }} style={styles.thumb} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
  iconBtn: {
    marginLeft: 8,
    padding: 6,
  },
  thumb: { width: 34, height: 34, borderRadius: 8, marginLeft: 8 },
});
