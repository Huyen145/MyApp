const products = [
  // ====== COFFEE ======
  {
    id: 1,
    name: "Cà phê đen đá",
    price: 25000,
    category: "Coffe",
    rating: 4.9,
    reviews: 512,
    image: require("@/assets/images/nuoc/tea.jpg"),
    restaurant: "High Coffee",
    description: "Cà phê đen nguyên chất, đậm vị, rang xay mỗi ngày."
  },
  {
    id: 2,
    name: "Cà phê sữa đá",
    price: 30000,
    category: "Coffe",
    rating: 5.0,
    reviews: 623,
    image: require("@/assets/images/nuoc/latte.jpg"),
    restaurant: "High Coffee",
    description: "Cà phê sữa đậm đà, béo nhẹ, vị truyền thống Việt Nam."
  },
  {
    id: 3,
    name: "Bạc xỉu",
    price: 32000,
    category: "Coffe",
    rating: 4.8,
    reviews: 421,
    image: require("@/assets/images/nuoc/saltcoffee.jpg"),
    restaurant: "High Coffee",
    description: "Cà phê pha sữa nhiều, thơm, béo, nhẹ nhàng."
  },

  // ====== TRÀ ======
  {
    id: 4,
    name: "Trà đào cam sả",
    price: 45000,
    category: "Trà",
    rating: 5.0,
    reviews: 899,
    image: require("@/assets/images/nuoc/milktea.jpg"),
    restaurant: "Tea House",
    description: "Trà đào thơm lừng, miếng đào giòn, vị đậm đà."
  },
  {
    id: 5,
    name: "Trà sữa trân châu đường đen",
    price: 42000,
    category: "Trà",
    rating: 4.9,
    reviews: 751,
    image: require("@/assets/images/nuoc/tea.jpg"),
    restaurant: "Tea House",
    description: "Trà sữa béo nhẹ, trân châu mềm – chuẩn vị."
  },
  {
    id: 6,
    name: "Trà matcha latte",
    price: 49000,
    category: "Trà",
    rating: 4.7,
    reviews: 388,
    image: require("@/assets/images/nuoc/latte.jpg"),
    restaurant: "Tea House",
    description: "Matcha đậm vị, kết hợp sữa tươi thơm béo."
  },

  // ====== SINH TỐ ======
  {
    id: 7,
    name: "Sinh tố bơ",
    price: 35000,
    category: "Sinh tố",
    rating: 5.0,
    reviews: 500,
    image: require("@/assets/images/nuoc/saltcoffee.jpg"),
    restaurant: "Smoothie VN",
    description: "Sinh tố bơ tươi, béo mịn, topping đậu phộng rang."
  },
  {
    id: 8,
    name: "Sinh tố xoài",
    price: 33000,
    category: "Sinh tố",
    rating: 4.8,
    reviews: 381,
    image: require("@/assets/images/nuoc/milktea.jpg"),
    restaurant: "Smoothie VN",
    description: "Xoài chín tự nhiên, xay lạnh giữ vị tươi ngọt."
  },
  {
    id: 9,
    name: "Sinh tố dâu",
    price: 36000,
    category: "Sinh tố",
    rating: 4.9,
    reviews: 410,
    image: require("@/assets/images/nuoc/latte.jpg"),
    restaurant: "Smoothie VN",
    description: "Dâu tây Đà Lạt xay cùng sữa chua cực mát."
  },

  // ====== BÁNH NGỌT ======
  {
    id: 10,
    name: "Bánh tiramisu",
    basePrice: 300000,
    prices: { S: 260000, M: 300000, L: 360000 },
    sizes: ["S", "M", "L"],
    flavors: ["socola", "vani"],
    noteOptions: ["Ít ngọt", "Không trứng", "Ghi chữ lên bánh"],
    images: [require("@/assets/images/nuoc/tea.jpg")],
    image: require("@/assets/images/nuoc/tea.jpg"),
    category: "Bánh ngọt",
    rating: 4.8,
    reviews: 209,
    restaurant: "Cake Shop",
    description: "Tiramisu mềm mịn, vị cacao nhẹ và béo."
  },
  {
    id: 11,
    name: "Bánh croissant bơ",
    price: 25000,
    category: "Bánh ngọt",
    rating: 4.9,
    reviews: 332,
    image: require("@/assets/images/nuoc/latte.jpg"),
    restaurant: "Cake Shop",
    description: "Bánh bơ thơm, lớp vỏ giòn chuẩn Pháp."
  },
  {
    id: 12,
    name: "Bánh su kem",
    basePrice: 280000,
    prices: { S: 240000, M: 280000, L: 320000 },
    sizes: ["S", "M", "L"],
    flavors: ["vani", "socola"],
    noteOptions: ["Ít ngọt", "Không trứng", "Ghi chữ lên bánh"],
    images: [require("@/assets/images/nuoc/saltcoffee.jpg")],
    image: require("@/assets/images/nuoc/saltcoffee.jpg"),
    category: "Bánh ngọt",
    rating: 4.7,
    reviews: 210,
    restaurant: "Cake Shop",
    description: "Su kem mềm, nhân vani béo vừa."
  },

  // ====== KHÁC ======
  {
    id: 13,
    name: "Coca Cola",
    price: 15000,
    category: "Khác",
    rating: 5.0,
    reviews: 700,
    image: require("@/assets/images/nuoc/tea.jpg"),
    restaurant: "Drink Store",
    description: "Nước ngọt có ga mát lạnh."
  },
  {
    id: 14,
    name: "Pepsi",
    price: 15000,
    category: "Khác",
    rating: 4.8,
    reviews: 512,
    image: require("@/assets/images/nuoc/latte.jpg"),
    restaurant: "Drink Store",
    description: "Pepsi vị cola truyền thống."
  },
  {
    id: 15,
    name: "Nước suối",
    price: 10000,
    category: "Khác",
    rating: 4.9,
    reviews: 200,
    image: require("@/assets/images/nuoc/milktea.jpg"),
    restaurant: "Drink Store",
    description: "Nước lọc tinh khiết."
  }
];

export default products;
