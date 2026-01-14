import { CartContext } from "@/contexts/CartContext";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import CategoryList from "@/components/ui/CategoryList";
import Header from "@/components/ui/Header";
import ProductGrid from "@/components/ui/ProductGrid";
import ProductModal from "@/components/ui/ProductModal";
import SearchBar from "@/components/ui/SearchBar";

import {
  getAllCategories,
  getAllProducts,
} from "@/services/product.service";

import { Product } from "@/types/product";
import { Category } from "@/types/category";

export default function HomeScreen() {
  /* ================== STATE ================== */
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const { addItem } = useContext(CartContext);
  const router = useRouter();
  const mountedRef = useRef(true);

  /* ================== FETCH CATEGORIES ================== */
  const fetchCategories = useCallback(async () => {
    try {
      const data = await getAllCategories();
      if (!Array.isArray(data)) return;

      const normalized: Category[] = data.map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
      }));

      setCategories([
        { id: 0, name: "All", slug: "all" },
        ...normalized,
      ]);
    } catch (e) {
      console.warn("Fetch categories failed", e);
    }
  }, []);

  /* ================== FETCH PRODUCTS ================== */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getAllProducts();

      // ✅ BẮT DATA ĐÚNG CHUẨN
      const raw =
        Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.products)
          ? res.data.products
          : [];

      if (mountedRef.current) {
        const normalized: Product[] = raw.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description,

          price: p.price ?? p.basePrice ?? 0,
          basePrice: p.basePrice ?? p.price ?? 0,
          prices: p.prices ?? [],

          image: p.imageUrl ?? p.image ?? undefined,
          images: Array.isArray(p.images) ? p.images : [],

          category: p.category
            ? {
                id: p.category.id,
                name: p.category.name,
                slug: p.category.slug,
              }
            : undefined,

          categorySlug:
            p.category?.slug ?? p.categorySlug ?? "other",

          rating: p.rating ?? 0,
          reviews: p.reviews ?? 0,
        }));

        setProducts(normalized);
      }
    } catch (e: any) {
      setError(e?.message ?? "Lỗi tải sản phẩm");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  /* ================== EFFECT ================== */
  useEffect(() => {
    mountedRef.current = true;
    fetchCategories();
    fetchProducts();

    return () => {
      mountedRef.current = false;
    };
  }, [fetchCategories, fetchProducts]);

  /* ================== FILTER ================== */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        selectedCategory === "all" ||
        p.categorySlug === selectedCategory;

      const matchSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, search]);

  /* ================== UI ================== */
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />

          <View style={styles.section}>
            <SearchBar value={search} onChange={setSearch} />
          </View>

          <View style={styles.section}>
            <CategoryList
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              loading={!categories.length}
              iconShape="rounded"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Danh sách sản phẩm
            </Text>

            {loading ? (
              <Text>Đang tải...</Text>
            ) : error ? (
              <Text>{error}</Text>
            ) : (
              <ProductGrid
                products={filteredProducts}
                onPress={(item) => setSelectedProduct(item)}
              />
            )}
          </View>
        </ScrollView>

        {/* ===== MODAL ===== */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={(item, qty, options) => {
            const price =
              options?.unitPrice ??
              item.price ??
              item.basePrice ??
              0;

            addItem(
              {
                productId: item.id,
                name: item.name,
                price,
                image: item.image,
                options,
              },
              qty
            );

            setSelectedProduct(null);
          }}
        />

        {/* ===== CART BUTTON ===== */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push("/cart")}
        >
          <Ionicons
            name="cart-outline"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ================== STYLE ================== */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F4EFE6" },
  container: { flex: 1 },
  section: { paddingHorizontal: 16, marginTop: 16 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#C94A3A",
    marginBottom: 8,
  },
  fab: {
    position: "absolute",
    bottom: 28,
    left: "50%",
    transform: [{ translateX: -28 }],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#C94A3A",
    justifyContent: "center",
    alignItems: "center",
  },
});
