import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { getAllProducts } from '@/services/product.service';

/* ================= TYPES ================= */
type Product = {
  id: number;
  name: string;
  price?: number;
  basePrice?: number;
  image?: string;
};

type Message = {
  id: string;
  text?: string;
  me: boolean;
  time: number;
  suggested?: Product[];
  image?: string;
  status?: 'sending' | 'sent' | 'failed';
};

const STORAGE_KEY = '@chat_messages';

function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatScreen() {
  /* ================= STATE ================= */
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [kbHeight, setKbHeight] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  const EXTRA_OFFSET = Platform.OS === 'android' ? 40 : 20;
  const listRef = useRef<FlatList>(null);

  /* ================= LOAD CHAT ================= */
  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
    })();
  }, []);

  /* ================= SAVE CHAT ================= */
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages)).catch(() => {});
  }, [messages]);

  /* ================= FETCH PRODUCTS API ================= */
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllProducts();
        const data = Array.isArray(res.data) ? res.data : [];

        const normalized: Product[] = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price ?? p.basePrice ?? 0,
          basePrice: p.basePrice ?? p.price ?? 0,
          image: p.image ?? p.imageUrl ?? '',
        }));

        setProducts(normalized);
      } catch (e) {
        console.warn('Fetch products failed', e);
      }
    })();
  }, []);

  /* ================= KEYBOARD ================= */
  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setKbHeight(e.endCoordinates.height);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKbHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  /* ================= IMAGE PICKER ================= */
  async function ensurePickerPermissions() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Quyền truy cập ảnh', 'Cần quyền truy cập để gửi hình ảnh.');
      return false;
    }
    return true;
  }

  async function pickImage() {
    const ok = await ensurePickerPermissions();
    if (!ok) return;

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    const uri = (res as any).assets?.[0]?.uri;
    if (uri) sendImage(uri);
  }

  /* ================= FAKE AI ================= */
  async function fakeAIReply(userText: string, imageUri?: string) {
    await new Promise((r) => setTimeout(r, 600));

    const suggested = products.slice(0, 3);

    if (imageUri) {
      return { text: 'Đã nhận ảnh. Đây là gợi ý:', suggested };
    }

    if (userText.toLowerCase().includes('gợi ý')) {
      return { text: 'Một số sản phẩm bạn có thể thích:', suggested };
    }

    return { text: 'Cảm ơn bạn. Chúng tôi sẽ hỗ trợ sớm nhất.' };
  }

  async function handleAIReply(userText: string, imageUri?: string) {
    setIsTyping(true);
    const res: any = await fakeAIReply(userText, imageUri);

    setTimeout(() => {
      setMessages((s) => [
        ...s,
        {
          id: String(Date.now()),
          text: res.text,
          suggested: res.suggested,
          me: false,
          time: Date.now(),
        },
      ]);
      setIsTyping(false);
      listRef.current?.scrollToEnd({ animated: true });
    }, 300);
  }

  /* ================= SEND ================= */
  function send() {
    if (!text.trim()) return;

    const m: Message = {
      id: String(Date.now()),
      text: text.trim(),
      me: true,
      time: Date.now(),
      status: 'sending',
    };

    setMessages((s) => [...s, m]);
    const sentText = text;
    setText('');

    setTimeout(() => {
      setMessages((s) =>
        s.map((msg) => (msg.id === m.id ? { ...msg, status: 'sent' } : msg))
      );
      handleAIReply(sentText);
    }, 400);
  }

  function sendImage(uri: string) {
    const m: Message = {
      id: String(Date.now()),
      image: uri,
      me: true,
      time: Date.now(),
      status: 'sending',
    };

    setMessages((s) => [...s, m]);

    setTimeout(() => {
      setMessages((s) =>
        s.map((msg) => (msg.id === m.id ? { ...msg, status: 'sent' } : msg))
      );
      handleAIReply('', uri);
    }, 500);
  }

  function quickReply(value: string) {
    setText(value);
    setTimeout(send, 100);
  }

  /* ================= RENDER ================= */
  function renderItem({ item }: { item: Message }) {
    return (
      <View style={{ marginBottom: 10 }}>
        <View style={[styles.row, item.me ? styles.rowRight : styles.rowLeft]}>
          {!item.me && (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>CS</Text>
            </View>
          )}

          <View style={[styles.msgWrap, item.me ? styles.msgWrapMe : styles.msgWrapBot]}>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.msgImage} />
            )}

            {item.text && (
              <Text style={item.me ? styles.msgTextMe : styles.msgTextBot}>
                {item.text}
              </Text>
            )}

            <Text style={styles.msgTime}>{formatTime(item.time)}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: 16,
          paddingBottom: Math.max(30, kbHeight + 240),
        }}
      />

      {isTyping && (
        <View style={styles.typingRow}>
          <Text>Đang nhập...</Text>
        </View>
      )}

      <View style={styles.quickReplies}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Gợi ý sản phẩm', 'Theo dõi đơn', 'Chính sách đổi trả'].map((q) => (
            <TouchableOpacity key={q} onPress={() => quickReply(q)} style={styles.quickBtn}>
              <Text>{q}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.composer, { marginBottom: kbHeight + EXTRA_OFFSET }]}>
        <TouchableOpacity onPress={pickImage} style={styles.attachBtn}>
          <Ionicons name="image" size={22} color="#666" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Soạn tin..."
          value={text}
          onChangeText={setText}
          multiline
        />

        <TouchableOpacity style={styles.sendBtn} onPress={send}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ================= STYLE ================= */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4EDE3' },

  row: { flexDirection: 'row', alignItems: 'flex-end' },
  rowLeft: { justifyContent: 'flex-start' },
  rowRight: { justifyContent: 'flex-end' },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: { color: '#C94A3A', fontWeight: '700' },

  msgWrap: { maxWidth: '76%', padding: 10, borderRadius: 12 },
  msgWrapBot: { backgroundColor: '#fff' },
  msgWrapMe: { backgroundColor: '#C94A3A' },

  msgTextMe: { color: '#fff' },
  msgTextBot: { color: '#222' },
  msgTime: { fontSize: 10, color: '#666', marginTop: 4 },

  msgImage: { width: 160, height: 110, borderRadius: 8, marginBottom: 6 },

  typingRow: { padding: 10 },

  quickReplies: {
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 6,
    backgroundColor: '#fff',
  },

  quickBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 16,
    marginHorizontal: 6,
  },

  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 10,
  },

  attachBtn: { marginRight: 6 },

  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  sendBtn: {
    backgroundColor: '#C94A3A',
    borderRadius: 12,
    padding: 10,
    marginLeft: 6,
  },
});
