import {
  ShoppingCart,
  Star,
  TrendingDown,
  Timer,
  ChevronRight,
  Percent,
} from "lucide-react";

interface DiscountedProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  rating: number;
  reviews: number;
  timeLeft?: string;
  stockLeft?: number;
  isFlashSale?: boolean;
}

const discountedProducts: DiscountedProduct[] = [
  {
    id: "d1",
    name: "Pro Staff RF97 Autograph",
    brand: "Wilson",
    category: "Reket",
    image: "/images/raquet.png",
    originalPrice: 34990,
    discountedPrice: 24490,
    discountPercentage: 30,
    rating: 4.9,
    reviews: 156,
    timeLeft: "Još 2 dana",
    stockLeft: 3,
    isFlashSale: false,
  },
  {
    id: "d2",
    name: "Court FF 3",
    brand: "ASICS",
    category: "Patike",
    image: "/images/shoes.png",
    originalPrice: 18990,
    discountedPrice: 13290,
    discountPercentage: 30,
    rating: 4.7,
    reviews: 89,
    stockLeft: 7,
  },
  {
    id: "d3",
    name: "Championship Extra Duty",
    brand: "Wilson",
    category: "Loptice",
    image: "/images/tennis-balls-packaging.png",
    originalPrice: 1290,
    discountedPrice: 899,
    discountPercentage: 30,
    rating: 4.8,
    reviews: 234,
    timeLeft: "+ 200 RSD za 3 kom",
    isFlashSale: false,
  },
  {
    id: "d4",
    name: "Pure Aero RH12",
    brand: "Babolat",
    category: "Torba",
    image: "/images/tennis-bag.png",
    originalPrice: 12990,
    discountedPrice: 9090,
    discountPercentage: 30,
    rating: 4.6,
    reviews: 67,
    stockLeft: 5,
  },
];

export default function OpremaPopustSection({
  onShowAll,
}: {
  onShowAll: () => void;
}) {
  return (
    <div className="pt-6">
      {/* Section Header */}
      <div className="px-4 mb-5">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Oprema na popustu
                  <span className="animate-pulse">🔥</span>
                </h3>
                <p className="text-white/80 text-sm">
                  Uštedite do 50% na odabranu opremu
                </p>
              </div>
            </div>
            <button
              onClick={onShowAll}
              className="bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-full text-sm hover:bg-white/30 transition-all duration-200"
            >
              Svi popusti
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          {discountedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer relative flex flex-col"
            >
              {/* Discount Badge */}
              <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md flex items-center gap-1">
                -{product.discountPercentage}%
              </div>

              {/* Product Image */}
              <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="p-3 flex flex-col flex-1">
                {/* Brand */}
                <span className="text-xs font-medium text-gray-500 mb-1">
                  {product.brand}
                </span>

                {/* Product Name */}
                <h4 className="font-semibold text-gray-900 text-sm mb-auto line-clamp-2">
                  {product.name}
                </h4>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2 mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{product.rating}</span>
                  <span className="text-xs text-gray-500">
                    ({product.reviews})
                  </span>
                </div>

                {/* Pricing */}
                <div className="mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-red-600">
                      {product.discountedPrice.toLocaleString()} RSD
                    </span>
                    <span className="text-xs text-gray-500 line-through">
                      {product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Stock/Info */}
                {(product.timeLeft ||
                  (product.stockLeft && product.stockLeft < 10)) && (
                  <div className="text-xs mb-2">
                    {product.stockLeft && product.stockLeft < 10 && (
                      <p className="text-orange-600 font-medium">
                        Ostalo samo {product.stockLeft} kom
                      </p>
                    )}
                    {product.timeLeft && (
                      <p className="text-gray-600">{product.timeLeft}</p>
                    )}
                  </div>
                )}

                {/* Add to Cart Button */}
                <button className="w-full bg-emerald-600 text-white py-2 rounded-xl text-xs font-medium hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center gap-1">
                  Dodaj u korpu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
