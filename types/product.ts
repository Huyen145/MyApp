export type PriceItem = {
  size: "S" | "M" | "L";
  price: number;
};

export type Product = {
  id: number;
  name: string;

  // ===== PRICE =====
  price?: number;
  basePrice?: number;
  prices?: PriceItem[];

  // ===== OPTIONS =====
  sizes?: ("S" | "M" | "L")[];
  flavors?: string[];
  noteOptions?: string[];

  // ===== IMAGE =====
  image?: string;          // ✅ CHỈ STRING URL
  images?: string[];       // ✅ CHỈ STRING URL
  imageUrl?: string;       // (nếu backend trả field này)

  // ===== CATEGORY =====
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  categorySlug?: string;

  // ===== META =====
  rating?: number;
  reviews?: number;
  restaurant?: string;
  description?: string;
};
