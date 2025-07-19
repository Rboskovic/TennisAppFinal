import { useState } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  ShoppingCart,
  Star,
  Heart,
  Check,
  X,
  ChevronDown,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: "reketi" | "loptice" | "patike" | "torbe" | "oprema";
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  brand: string;
  description: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

const mockProducts: Product[] = [
  // Reketi
  {
    id: "r1",
    name: "Wilson Pro Staff RF97",
    category: "reketi",
    price: 28990,
    originalPrice: 34990,
    discount: 17,
    image: "/images/raquet.png",
    brand: "Wilson",
    description: "Profesionalni reket koji koristi Roger Federer",
    inStock: true,
    rating: 4.9,
    reviews: 234,
  },
  {
    id: "r2",
    name: "Babolat Pure Drive 2024",
    category: "reketi",
    price: 26490,
    originalPrice: 29990,
    discount: 12,
    image: "/images/raquet.png",
    brand: "Babolat",
    description: "Moć i kontrola za napredne igrače",
    inStock: true,
    rating: 4.8,
    reviews: 189,
  },
  {
    id: "r3",
    name: "HEAD Gravity MP",
    category: "reketi",
    price: 22990,
    image: "/images/raquet.png",
    brand: "HEAD",
    description: "Savršen balans između kontrole i snage",
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  // Loptice
  {
    id: "l1",
    name: "Wilson US Open (4 kom)",
    category: "loptice",
    price: 890,
    originalPrice: 1190,
    discount: 25,
    image: "/images/tennis-balls-packaging.png",
    brand: "Wilson",
    description: "Oficijalne loptice US Open turnira",
    inStock: true,
    rating: 4.8,
    reviews: 412,
  },
  {
    id: "l2",
    name: "Babolat Gold Championship",
    category: "loptice",
    price: 750,
    image: "/images/tennis-balls-packaging.png",
    brand: "Babolat",
    description: "Premium loptice za turnire",
    inStock: true,
    rating: 4.6,
    reviews: 298,
  },
  // Patike
  {
    id: "p1",
    name: "Adidas Barricade 2024",
    category: "patike",
    price: 15990,
    originalPrice: 18990,
    discount: 16,
    image: "/images/shoes.png",
    brand: "Adidas",
    description: "Vrhunska stabilnost i izdržljivost",
    inStock: true,
    rating: 4.9,
    reviews: 178,
  },
  {
    id: "p2",
    name: "Nike Vapor Pro 2",
    category: "patike",
    price: 14490,
    image: "/images/shoes.png",
    brand: "Nike",
    description: "Brzina i agilnost na terenu",
    inStock: true,
    rating: 4.7,
    reviews: 145,
  },
  // Torbe
  {
    id: "t1",
    name: "HEAD Tour Team 12R",
    category: "torbe",
    price: 8990,
    originalPrice: 10990,
    discount: 18,
    image: "/images/tennis-bag.png",
    brand: "HEAD",
    description: "Prostrana torba za 12 reketa",
    inStock: true,
    rating: 4.8,
    reviews: 89,
  },
  {
    id: "t2",
    name: "Wilson Super Tour 15",
    category: "torbe",
    price: 11990,
    image: "/images/tennis-bag.png",
    brand: "Wilson",
    description: "Profesionalna torba sa termo odeljkom",
    inStock: true,
    rating: 4.9,
    reviews: 134,
  },
  // Oprema
  {
    id: "o1",
    name: "Overgrip Wilson Pro (3 kom)",
    category: "oprema",
    price: 590,
    image: "https://via.placeholder.com/200x200/10b981/ffffff?text=Grip",
    brand: "Wilson",
    description: "Profesionalni overgrip za bolji hvat",
    inStock: true,
    rating: 4.7,
    reviews: 567,
  },
  {
    id: "o2",
    name: "Vibrastop Babolat (2 kom)",
    category: "oprema",
    price: 390,
    originalPrice: 490,
    discount: 20,
    image: "https://via.placeholder.com/200x200/10b981/ffffff?text=Vibrastop",
    brand: "Babolat",
    description: "Smanjuje vibracije pri udaru",
    inStock: true,
    rating: 4.5,
    reviews: 234,
  },
];

export default function ShopFullPage({ onClose }: { onClose: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("sve");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "price-asc" | "price-desc" | "rating" | "discount"
  >("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const categories = [
    { id: "sve", name: "🛍️ Sve", count: mockProducts.length },
    {
      id: "reketi",
      name: "🎾 Reketi",
      count: mockProducts.filter((p) => p.category === "reketi").length,
    },
    {
      id: "loptice",
      name: "🎾 Loptice",
      count: mockProducts.filter((p) => p.category === "loptice").length,
    },
    {
      id: "patike",
      name: "👟 Patike",
      count: mockProducts.filter((p) => p.category === "patike").length,
    },
    {
      id: "torbe",
      name: "🎒 Torbe",
      count: mockProducts.filter((p) => p.category === "torbe").length,
    },
    {
      id: "oprema",
      name: "🏸 Oprema",
      count: mockProducts.filter((p) => p.category === "oprema").length,
    },
  ];

  const brands = [...new Set(mockProducts.map((p) => p.brand))];

  const filteredProducts = mockProducts
    .filter(
      (product) =>
        (selectedCategory === "sve" || product.category === selectedCategory) &&
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "discount":
          return (b.discount || 0) - (a.discount || 0);
        default:
          return 0;
      }
    });

  const toggleCart = (productId: string) => {
    setCart((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Tenis Shop</h1>
          </div>
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cart.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Pretraži proizvode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                selectedCategory === category.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs opacity-70">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-gray-700 bg-white px-3 py-1.5 rounded-lg border border-gray-200"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 text-sm text-gray-700 bg-white px-3 py-1.5 rounded-lg border border-gray-200"
            >
              <span>Sortiraj</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10 min-w-[150px]">
                <button
                  onClick={() => {
                    setSortBy("rating");
                    setShowSortDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    sortBy === "rating"
                      ? "text-emerald-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  Po oceni
                </button>
                <button
                  onClick={() => {
                    setSortBy("price-asc");
                    setShowSortDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    sortBy === "price-asc"
                      ? "text-emerald-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  Cena: Niža-Viša
                </button>
                <button
                  onClick={() => {
                    setSortBy("price-desc");
                    setShowSortDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    sortBy === "price-desc"
                      ? "text-emerald-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  Cena: Viša-Niža
                </button>
                <button
                  onClick={() => {
                    setSortBy("discount");
                    setShowSortDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    sortBy === "discount"
                      ? "text-emerald-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  Po popustu
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-3 pb-3 space-y-3">
            {/* Price Range */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Cena</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-24 px-2 py-1 text-sm border border-gray-200 rounded"
                  placeholder="Od"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-24 px-2 py-1 text-sm border border-gray-200 rounded"
                  placeholder="Do"
                />
                <span className="text-sm text-gray-600">RSD</span>
              </div>
            </div>

            {/* Brands */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Brendovi</p>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`px-3 py-1 text-sm rounded-full transition-all ${
                      selectedBrands.includes(brand)
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-gray-700 border border-gray-200"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 p-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all flex flex-col"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain p-4 bg-gray-50"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{product.discount}%
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <div className="p-3 flex flex-col flex-1">
                <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 flex-1">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{product.rating}</span>
                  <span className="text-xs text-gray-500">
                    ({product.reviews})
                  </span>
                </div>

                <div className="mb-2">
                  <p className="text-lg font-bold text-emerald-600">
                    {product.price.toLocaleString()} RSD
                  </p>
                  {product.originalPrice && (
                    <p className="text-xs text-gray-500 line-through">
                      {product.originalPrice.toLocaleString()} RSD
                    </p>
                  )}
                </div>

                <button
                  onClick={() => toggleCart(product.id)}
                  className={`w-full py-2 rounded-xl font-medium text-sm transition-all ${
                    cart.includes(product.id)
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  {cart.includes(product.id) ? (
                    <span className="flex items-center justify-center gap-1">
                      <Check className="w-4 h-4" /> U korpi
                    </span>
                  ) : (
                    "Dodaj u korpu"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary Footer */}
      {cart.length > 0 && (
        <div className="shrink-0 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Ukupno proizvoda: {cart.length}
              </p>
              <p className="text-lg font-bold text-gray-900">
                {mockProducts
                  .filter((p) => cart.includes(p.id))
                  .reduce((sum, p) => sum + p.price, 0)
                  .toLocaleString()}{" "}
                RSD
              </p>
            </div>
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-full font-medium hover:bg-emerald-700 transition-all">
              Nastavi ka plaćanju
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
