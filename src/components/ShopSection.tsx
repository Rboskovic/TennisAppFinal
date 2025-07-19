import { ShoppingBag, ArrowRight } from "lucide-react";

// Shop categories with emerald theme and better icons
const shopCategories = [
  {
    id: 1,
    name: "Reketi",
    bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    icon: "🎾",
    image: "/images/raquet.png",
    description: "Profesionalni reketi",
    itemCount: 67,
  },
  {
    id: 2,
    name: "Loptice",
    bgColor: "bg-gradient-to-br from-emerald-400 to-emerald-500",
    icon: "🎾",
    image: "/images/tennis-balls-packaging.png",
    description: "Premium loptice",
    itemCount: 23,
  },
  {
    id: 3,
    name: "Patike",
    bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    icon: "👟",
    image: "/images/shoes.png",
    description: "Teniske patike",
    itemCount: 89,
  },
  {
    id: 4,
    name: "Torbe",
    bgColor: "bg-gradient-to-br from-emerald-600 to-emerald-700",
    icon: "🎒",
    image: "/images/tennis-bag.png",
    description: "Torbe za opremu",
    itemCount: 34,
  },
  {
    id: 5,
    name: "Oprema",
    bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    icon: "🏸",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='25' fill='%2310b981'/%3E%3Cpath d='M20 30h20M30 20v20' stroke='white' stroke-width='3'/%3E%3C/svg%3E",
    description: "Dodatna oprema",
    itemCount: 45,
  },
];

export default function ShopSection({ onShowAll }: { onShowAll: () => void }) {
  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-100 p-2 rounded-xl">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Tenis Shop</h3>
        </div>
        <button
          onClick={onShowAll}
          className="bg-gray-100 text-emerald-600 font-semibold py-2 px-4 rounded-full text-sm hover:bg-emerald-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Prikaži sve
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
        {shopCategories.map((category) => (
          <div key={category.id} className="flex-shrink-0 group cursor-pointer">
            <div className="relative">
              <div
                className={`w-20 h-20 ${category.bgColor} rounded-2xl flex items-center justify-center mb-2 shadow-md group-hover:shadow-xl transform transition-all duration-300 group-hover:scale-105`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-14 h-14 object-contain filter drop-shadow-lg"
                />
                {/* Item count badge */}
                <div className="absolute -top-2 -right-2 bg-white text-emerald-700 text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-1 shadow-md border-2 border-emerald-100">
                  {category.itemCount}
                </div>
              </div>

              <div className="text-center px-1">
                <h4 className="text-sm font-semibold text-gray-900 leading-tight">
                  {category.name}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {category.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
