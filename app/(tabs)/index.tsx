import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CartContext } from '@/contexts/CartContext';
import products from '@/data/products';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useContext, useState } from 'react';
import { Alert, Dimensions, FlatList, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Phổ');
  const [searchText, setSearchText] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [productQty, setProductQty] = useState(1);
  const { addItem } = useContext(CartContext);

  const categories = ['Phổ', 'Pizza', 'Burger', 'Coke'];

  // products imported from data/products.ts

  const filteredProducts = products.filter(
    (item) =>
      item.category === selectedCategory &&
      item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderProductItem = ({ item }: { item: typeof products[0] }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => { setSelectedProduct(item); setProductQty(1); }}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.productImage} />
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <ThemedText style={styles.ratingBadgeText}>{item.rating}</ThemedText>
        </View>
      </View>
      <View style={styles.productInfo}>
        <ThemedText style={styles.productName} numberOfLines={1}>
          {item.name}
        </ThemedText>
        <ThemedText style={styles.restaurantName}>{item.restaurant}</ThemedText>
        <View style={styles.priceRow}>
          <ThemedText style={styles.price}>{item.price.toLocaleString()}đ</ThemedText>
          <ThemedText style={styles.deliveryTime}>• 12 min</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Header small */}
        <View style={styles.headerSmall}>
          <View>
            <ThemedText style={styles.appTitle}>Café&Come</ThemedText>
            <ThemedText style={styles.headerNote}>Good Morning</ThemedText>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image source={require('@/assets/images/nuoc/tea.jpg')} style={styles.profileImage} />
          </TouchableOpacity>
        </View>

        {/* Search & Banner */}
        <View style={styles.mainRow}>
          <View style={styles.searchBannerCol}>
            <View style={styles.searchSmall}>
              <Ionicons name="search" size={16} color="#7D7D7D" />
              <TextInput
                style={styles.searchInputSmall}
                placeholder="Search"
                placeholderTextColor="#9A9A9A"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            <View style={styles.bannerCard}>
              <View style={styles.bannerLeft}>
                <ThemedText style={styles.bannerTitle}>Daily Specials</ThemedText>
                <ThemedText style={styles.bannerSub}>Discount up to 20% off</ThemedText>
              </View>
              <Image source={require('@/assets/images/nuoc/latte.jpg')} style={styles.bannerImage} />
            </View>
          </View>
        </View>

        {/* Category small cards */}
        <View style={styles.categoryRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((c) => (
              <View key={c} style={[styles.catCard, selectedCategory === c && styles.catCardActive]}>
                <Image source={require('@/assets/images/nuoc/tea.jpg')} style={styles.catIcon} />
                <ThemedText style={styles.catLabel}>{c}</ThemedText>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Featured horizontal carousel */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Featured</ThemedText>
          <ThemedText style={styles.sectionMore}>See all</ThemedText>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
          {products.slice(0, 4).map((p) => (
            <TouchableOpacity key={p.id} style={styles.featuredCard} activeOpacity={0.85}>
              <Image source={p.image} style={styles.featuredImage} />
              <View style={styles.featuredInfo}>
                <ThemedText style={styles.featuredName}>{p.name}</ThemedText>
                <View style={styles.featuredMeta}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <ThemedText style={styles.featuredRating}>{p.rating} </ThemedText>
                  <ThemedText style={styles.featuredReviews}>({p.reviews})</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular small icons */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Popular</ThemedText>
          <ThemedText style={styles.sectionMore}>See all</ThemedText>
        </View>
        <View style={styles.popularRow}>
          {products.slice(0, 4).map((p) => (
            <View key={p.id} style={styles.popularCard}>
              <Image source={p.image} style={styles.popularImage} />
              <ThemedText style={styles.popularLabel}>{p.name.split(' ')[0]}</ThemedText>
            </View>
          ))}
        </View>

        {/* All Products Grid */}
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>All Products</ThemedText>
        </View>
        <View style={{ paddingHorizontal: 8, marginBottom: 20 }}>
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            renderItem={renderProductItem}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />
        </View>
      </ScrollView>

      {/* Floating Add Button remains */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      {/* Product Detail Modal */}
      <Modal
        visible={!!selectedProduct}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedProduct(null)}
      >
        <ThemedView style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedProduct(null)}>
              <Ionicons name="chevron-back" size={28} color="#2F2F2F" />
            </TouchableOpacity>
            <ThemedText style={styles.modalHeaderTitle}>Product Details</ThemedText>
            <View style={{ width: 28 }} />
          </View>

          {/* Modal Body */}
          <ScrollView contentContainerStyle={styles.modalBody}>
            {selectedProduct && (
              <>
                {/* Product Image */}
                <Image source={selectedProduct.image} style={styles.modalImage} />

                {/* Product Info */}
                <View style={styles.modalInfo}>
                  <ThemedText style={styles.modalName}>{selectedProduct.name}</ThemedText>
                  <ThemedText style={styles.modalRestaurant}>{selectedProduct.restaurant}</ThemedText>

                  {/* Rating */}
                  <View style={styles.modalRating}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <ThemedText style={{ marginLeft: 6, fontWeight: '600' }}>
                      {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                    </ThemedText>
                  </View>

                  {/* Price */}
                  <ThemedText style={styles.modalPrice}>
                    {(selectedProduct.price * productQty).toLocaleString()}đ
                  </ThemedText>

                  {/* Description */}
                  <ThemedText style={styles.modalDescription}>{selectedProduct.description}</ThemedText>

                  {/* Quantity Selector */}
                  <View style={styles.qtyContainer}>
                    <ThemedText style={styles.qtyLabel}>Quantity:</ThemedText>
                    <View style={styles.qtyControl}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => setProductQty(Math.max(1, productQty - 1))}
                      >
                        <ThemedText style={styles.qtyBtnText}>−</ThemedText>
                      </TouchableOpacity>
                      <ThemedText style={styles.qtyValue}>{productQty}</ThemedText>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => setProductQty(productQty + 1)}
                      >
                        <ThemedText style={styles.qtyBtnText}>+</ThemedText>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            )}
          </ScrollView>

          {/* Add to Cart Button */}
          {selectedProduct && (
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.addToCartBtn}
                onPress={() => {
                  addItem({
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    image: selectedProduct.image,
                  }, productQty);
                  Alert.alert('Success', `${selectedProduct.name} đã được thêm vào giỏ (${productQty}x)`);
                  setSelectedProduct(null);
                }}
              >
                <ThemedText style={styles.addToCartBtnText}>Add to Cart</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E3C6',
  },

  // Header small
  headerSmall: {
    paddingTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appTitle: { fontSize: 18, fontWeight: '700', color: '#2F2F2F' },
  headerNote: { fontSize: 12, color: '#6B6B6B', marginTop: 4 },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  // Search small
  mainRow: { paddingHorizontal: 18, marginTop: 6 },
  searchBannerCol: { width: '100%' },
  searchSmall: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF6EA', padding: 10, borderRadius: 20, marginBottom: 12 },
  searchInputSmall: { marginLeft: 8, flex: 1, fontSize: 14, color: '#6B6B6B' },

  // Banner
  bannerCard: { backgroundColor: '#DFF3E8', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bannerLeft: { flex: 1, paddingRight: 8 },
  bannerTitle: { fontSize: 16, fontWeight: '700', color: '#1F5132' },
  bannerSub: { fontSize: 12, color: '#2F6F46', marginTop: 6 },
  bannerImage: { width: 70, height: 70, borderRadius: 10 },

  // Category small cards
  categoryRow: { paddingLeft: 18, paddingVertical: 12 },
  catCard: { width: 84, height: 90, backgroundColor: '#fff', borderRadius: 10, marginRight: 12, alignItems: 'center', justifyContent: 'center', padding: 8, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  catCardActive: { borderWidth: 1, borderColor: '#FF7B7B' },
  catIcon: { width: 44, height: 44, borderRadius: 8, marginBottom: 6 },
  catLabel: { fontSize: 12, color: '#5B5B5B', fontWeight: '600' },

  // Featured
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginTop: 18, marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#2F2F2F' },
  sectionMore: { fontSize: 12, color: '#8A8A8A' },
  featuredScroll: { paddingLeft: 18, paddingRight: 8 },
  featuredCard: { width: width * 0.62, height: 180, marginRight: 12, borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3 },
  featuredImage: { width: '100%', height: 110 },
  featuredInfo: { padding: 10 },
  featuredName: { fontSize: 14, fontWeight: '700', color: '#2F2F2F' },
  featuredMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  featuredRating: { fontSize: 12, color: '#444', marginLeft: 6 },
  featuredReviews: { fontSize: 11, color: '#9A9A9A', marginLeft: 6 },

  // Product Card (used in grid earlier)
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
    backgroundColor: '#f9f9f9',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: { position: 'absolute', left: 8, top: 8, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, flexDirection: 'row', alignItems: 'center' },
  ratingBadgeText: { fontSize: 12, marginLeft: 6, color: '#333', fontWeight: '700' },

  // Product Info
  productInfo: { padding: 12 },
  productName: { fontSize: 13, fontWeight: '700', color: '#2F2F2F' },
  restaurantName: { fontSize: 11, color: '#8A8A8A', marginTop: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  price: { fontSize: 14, fontWeight: '800', color: '#C94A3A' },
  deliveryTime: { fontSize: 12, color: '#8A8A8A' },

  // Popular
  popularRow: { flexDirection: 'row', paddingHorizontal: 18, justifyContent: 'space-between', marginTop: 8 },
  popularCard: { width: (width - 72) / 4, alignItems: 'center' },
  popularImage: { width: 64, height: 64, borderRadius: 12, marginBottom: 8 },
  popularLabel: { fontSize: 12, color: '#5A5A5A', textAlign: 'center' },

  // Add Button
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#C94A3A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#C94A3A',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F2E3C6',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2F2F2F',
  },
  modalBody: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  modalInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  modalName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2F2F2F',
  },
  modalRestaurant: {
    fontSize: 14,
    color: '#8A8A8A',
    marginTop: 4,
  },
  modalRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#C94A3A',
    marginTop: 12,
  },
  modalDescription: {
    fontSize: 13,
    color: '#5B5B5B',
    lineHeight: 20,
    marginTop: 12,
  },
  qtyContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  qtyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2F2F2F',
    marginBottom: 10,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F2E3C6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#C94A3A',
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2F2F2F',
    minWidth: 30,
    textAlign: 'center',
  },
  modalFooter: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  addToCartBtn: {
    backgroundColor: '#C94A3A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
