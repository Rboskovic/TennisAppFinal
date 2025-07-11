import { ChevronDown } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Reketi",
    bgColor: "bg-emerald-300",
    image: "/images/raquet.png",
  },
  {
    id: 2,
    name: "Loptice",
    bgColor: "bg-emerald-400",
    image: "/images/tennis-balls-packaging.png",
  },
  {
    id: 3,
    name: "Patike",
    bgColor: "bg-emerald-500",
    image: "/images/shoes.png",
  },
  {
    id: 4,
    name: "Torbe",
    bgColor: "bg-emerald-600",
    image: "/images/tennis-bag.png",
  },
  {
    id: 5,
    name: "Treneri",
    bgColor: "bg-emerald-700",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cdefs%3E%3ClinearGradient id='trainer' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23a78bfa;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='30' cy='20' r='8' fill='url(%23trainer)'/%3E%3Cpath d='M18 35c0-6.627 5.373-12 12-12s12 5.373 12 12v10H18V35z' fill='url(%23trainer)'/%3E%3Cpath d='M25 45l5-8 5 8' fill='%235b21b6'/%3E%3C/svg%3E",
  },
];

const summerOffers = [
  {
    id: 1,
    title: "Sladoled",
    bgColor: "bg-cyan-400",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='ice1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f472b6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ec4899;stop-opacity:1' /%3E%3C/linearGradient%3E%3ClinearGradient id='ice2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fbbf24;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f59e0b;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='45' cy='40' r='18' fill='url(%23ice1)'/%3E%3Ccircle cx='65' cy='50' r='15' fill='url(%23ice2)'/%3E%3Crect x='52' y='65' width='6' height='25' fill='%23d97706' rx='3'/%3E%3Crect x='40' y='25' width='20' height='8' fill='%23fbbf24' rx='4'/%3E%3C/svg%3E",
  },
  {
    id: 2,
    title: "Hladna pića",
    bgColor: "bg-cyan-400",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='bottle' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2334d399;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2310b981;stop-opacity:1' /%3E%3C/linearGradient%3E%3ClinearGradient id='can' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fbbf24;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f59e0b;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='35' y='20' width='12' height='30' fill='url(%23bottle)' rx='6'/%3E%3Crect x='55' y='30' width='15' height='25' fill='url(%23can)' rx='3'/%3E%3Crect x='35' y='15' width='12' height='8' fill='%23065f46' rx='2'/%3E%3Cpath d='M25 45l8 0M25 50l8 0M78 40l8 0M78 45l8 0' stroke='white' stroke-width='2'/%3E%3C/svg%3E",
  },
  {
    id: 3,
    title: "Restorani",
    bgColor: "bg-cyan-400",
    image:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='pizza' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fbbf24;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f59e0b;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M30 30L90 30Q90 90 30 90Q30 30 30 30Z' fill='url(%23pizza)'/%3E%3Ccircle cx='45' cy='45' r='4' fill='%23dc2626'/%3E%3Ccircle cx='65' cy='55' r='3' fill='%2316a34a'/%3E%3Ccircle cx='55' cy='70' r='3' fill='%23dc2626'/%3E%3Cpath d='M35 25h40v8H35v-8z' fill='%2316a34a' rx='4'/%3E%3C/svg%3E",
  },
];

export default function IstraziScreen() {
  return (
    <div
      className="min-h-screen bg-gray-50 pb-24"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      }}
    >
      {/* Location Header - Like Wolt */}
      <div className="bg-white px-4 py-3">
        <button className="flex items-center space-x-2 text-gray-600">
          <svg
            className="w-4 h-4 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2L3 9l7 7 7-7-7-7zM10 11.5L6.5 8 10 4.5 13.5 8 10 11.5z" />
          </svg>
          <span className="text-sm font-medium text-blue-500">
            Your current location
          </span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Categories Row - Scrollable like Wolt */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">SHOP</h3>
          <button className="bg-gray-100 text-cyan-500 font-semibold py-2 px-4 rounded-full text-xs">
            Prikaži sve
          </button>
        </div>

        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0 text-center"
              style={{ width: "70px" }}
            >
              <div
                className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-1 shadow-sm`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-11 h-11 object-contain"
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 leading-tight block text-center mt-1">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Banner - Baseline GIF */}
      <div className="px-4 pt-4">
        <div
          className="relative overflow-hidden rounded-2xl shadow-lg"
          style={{ height: "160px" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("/videos/baseline.gif")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Discount Badge */}

            {/* Content - Text overlay */}
            <div className="relative z-10 p-4 h-full flex flex-col justify-between">
              <div></div>
              <div>
                <h2 className="text-white text-2xl font-bold leading-tight mb-1">
                  Baseline
                </h2>
                <p className="text-white/90 text-sm">Od 1500 rsd</p>
              </div>
            </div>
            <div className="absolute top-3 right-3 bg-cyan-400 text-gray-900 font-bold py-1.5 px-3 rounded-lg">
              <span className="text-xs font-bold">-30%</span>
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-3 space-x-2">
          <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      <div className="px-4 space-y-5 pt-6">
        {/* Summer Offers Section - Smaller fonts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
              <span>LETNJE PONUDE</span>
              <span className="text-xl">🥵</span>
              <span className="text-xl">☀️</span>
            </h3>
            <button className="bg-gray-100 text-cyan-500 font-semibold py-2 px-4 rounded-full text-xs">
              Prikaži sve
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {summerOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <div
                  className={`${offer.bgColor} h-20 flex items-center justify-center`}
                >
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-12 h-12"
                  />
                </div>
                <div className="p-3 text-center">
                  <h4 className="font-semibold text-gray-900 text-xs leading-tight">
                    {offer.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tennis Clubs Section - Updated with Images */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Najbolji klubovi u gradu
            </h3>
            <button className="bg-gray-100 text-cyan-500 font-semibold py-2 px-4 rounded-full text-xs">
              Prikaži sve
            </button>
          </div>

          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {/* Club 1 - Baseline */}
            <div className="bg-white rounded-2xl shadow-sm flex-shrink-0 w-80">
              <div className="h-32 rounded-t-2xl relative overflow-hidden">
                <img
                  src="/images/base_kompres-min.jpg"
                  alt="Baseline Tennis Club"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-lg font-bold">Baseline</div>
                </div>
              </div>
              <div className="p-3">
                <div className="text-sm text-gray-600 mb-2">
                  Premium tereni • Sponzorisano
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold">2.500 RSD</span>
                    <span>15-20 minuta</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span className="font-semibold">9.2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Club 2 - Tipsarevic */}
            <div className="bg-white rounded-2xl shadow-sm flex-shrink-0 w-80">
              <div className="h-32 rounded-t-2xl relative overflow-hidden">
                <img
                  src="/images/teniski-centar-novak.jpg"
                  alt="Tipsarevic Tennis Club"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-lg font-bold">Tipsarevic</div>
                </div>
              </div>
              <div className="p-3">
                <div className="text-sm text-gray-600 mb-2">
                  Profesionalni tereni • Klub
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold">3.000 RSD</span>
                    <span>20-25 minuta</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span className="font-semibold">9.5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discount Equipment Section */}
        <div className="bg-cyan-100 rounded-2xl p-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2 mb-4">
            <span>Oprema na popustu</span>
            <span className="text-2xl">🛒</span>
            <span className="text-2xl">%</span>
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white rounded-xl p-3">
              <div className="h-20 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Slika</span>
              </div>
              <div className="text-red-500 font-bold text-sm">
                149,99 RSD{" "}
                <span className="line-through text-gray-400 font-normal">
                  329,99
                </span>
              </div>
              <div className="text-gray-700 text-xs mt-1">
                Wilson reketi sa popustom
              </div>
            </div>

            <div className="bg-white rounded-xl p-3">
              <div className="h-20 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Slika</span>
              </div>
              <div className="text-red-500 font-bold text-sm">
                549,00 RSD{" "}
                <span className="line-through text-gray-400 font-normal">
                  1.609,0
                </span>
              </div>
              <div className="text-gray-700 text-xs mt-1">
                Nike patike za tenis
              </div>
            </div>

            <div className="bg-white rounded-xl p-3">
              <div className="h-20 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Slika</span>
              </div>
              <div className="text-red-500 font-bold text-sm">
                129,00 RSD{" "}
                <span className="line-through text-gray-400 font-normal">
                  257,99
                </span>
              </div>
              <div className="text-gray-700 text-xs mt-1">
                Loptice Head Pro 3/1
              </div>
            </div>

            <div className="bg-white rounded-xl p-3">
              <div className="h-20 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Slika</span>
              </div>
              <div className="text-red-500 font-bold text-sm">
                359,99 RSD{" "}
                <span className="line-through text-gray-400 font-normal">
                  549,99
                </span>
              </div>
              <div className="text-gray-700 text-xs mt-1">
                Torba Wilson Pro Staff
              </div>
            </div>
          </div>

          <button className="w-full bg-white text-cyan-600 font-semibold py-3 rounded-xl border border-cyan-200">
            Istražite ponude
          </button>
        </div>

        {/* Bottom spacing */}
        <div className="h-4"></div>
      </div>
    </div>
  );
}
