import { ChevronDown } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Reketi",
    bgColor: "bg-blue-600",
    image: "/images/raquet.png",
  },
  {
    id: 2,
    name: "Loptice",
    bgColor: "bg-lime-500", 
    image: "/images/tennis-balls-packaging.png",
  },
  {
    id: 3,
    name: "Patike",
    bgColor: "bg-gray-500",
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
    bgColor: "bg-purple-100",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cdefs%3E%3ClinearGradient id='trainer' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23a78bfa;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='30' cy='20' r='8' fill='url(%23trainer)'/%3E%3Cpath d='M18 35c0-6.627 5.373-12 12-12s12 5.373 12 12v10H18V35z' fill='url(%23trainer)'/%3E%3Cpath d='M25 45l5-8 5 8' fill='%235b21b6'/%3E%3C/svg%3E",
  },
];

const summerOffers = [
  {
    id: 1,
    title: "Sladoled",
    bgColor: "bg-cyan-400",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='ice1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f472b6;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ec4899;stop-opacity:1' /%3E%3C/linearGradient%3E%3ClinearGradient id='ice2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fbbf24;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f59e0b;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='45' cy='40' r='18' fill='url(%23ice1)'/%3E%3Ccircle cx='65' cy='50' r='15' fill='url(%23ice2)'/%3E%3Crect x='52' y='65' width='6' height='25' fill='%23d97706' rx='3'/%3E%3Crect x='40' y='25' width='20' height='8' fill='%23fbbf24' rx='4'/%3E%3C/svg%3E",
  },
  {
    id: 2, 
    title: "Hladna pića",
    bgColor: "bg-cyan-400",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='bottle' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2334d399;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2310b981;stop-opacity:1' /%3E%3C/linearGradient%3E%3ClinearGradient id='can' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fbbf24;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f59e0b;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='35' y='20' width='12' height='30' fill='url(%23bottle)' rx='6'/%3E%3Crect x='55' y='30' width='15' height='25' fill='url(%23can)' rx='3'/%3E%3Crect x='35' y='15' width='12' height='8' fill='%23065f46' rx='2'/%3E%3Cpath d='M25 45l8 0M25 50l8 0M78 40l8 0M78 45l8 0' stroke='white' stroke-width='2'/%3E%3C/svg%3E",
  },
  {
    id: 3,
    title: "Restorani", 
    bgColor: "bg-cyan-400",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='pizza' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fbbf24;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f59e0b;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M30 30L90 30Q90 90 30 90Q30 30 30 30Z' fill='url(%23pizza)'/%3E%3Ccircle cx='45' cy='45' r='4' fill='%23dc2626'/%3E%3Ccircle cx='65' cy='55' r='3' fill='%2316a34a'/%3E%3Ccircle cx='55' cy='70' r='3' fill='%23dc2626'/%3E%3Cpath d='M35 25h40v8H35v-8z' fill='%2316a34a' rx='4'/%3E%3C/svg%3E",
  },
];

export default function IstraziScreen() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
      {/* Location Header - Like Wolt */}
      <div className="bg-white px-4 py-3">
        <button className="flex items-center space-x-2 text-gray-600">
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 9l7 7 7-7-7-7zM10 11.5L6.5 8 10 4.5 13.5 8 10 11.5z"/>
          </svg>
          <span className="text-sm font-medium text-blue-500">Your current location</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Categories Row - Scrollable like Wolt */}
      <div className="px-4 pt-4">
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <div key={category.id} className="flex-shrink-0 text-center" style={{ width: '70px' }}>
              <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-2 shadow-sm`}>
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-900 leading-tight">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Banner - Scrollable */}
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{ height: '160px' }}>
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
            }}
          >
            {/* Discount Badge */}
            <div className="absolute top-3 right-3 bg-cyan-400 text-gray-900 font-bold py-1.5 px-3 rounded-lg">
              <span className="text-xs font-bold">-30%</span>
            </div>
            
            {/* Better tennis illustration */}
            <div className="absolute right-4 bottom-2 opacity-20">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="30" fill="white" opacity="0.3"/>
                <circle cx="40" cy="40" r="18" fill="white" opacity="0.5"/>
                <path d="M15 40a25 25 0 0 1 50 0M40 15a25 25 0 0 1 0 50" stroke="white" strokeWidth="2" opacity="0.4"/>
              </svg>
            </div>
            
            {/* Content - Smaller fonts */}
            <div className="relative z-10 p-4 h-full flex flex-col justify-between">
              <div></div>
              <div>
                <h2 className="text-white text-2xl font-bold leading-tight mb-1">
                  Tennis Pro
                </h2>
                <p className="text-white/90 text-sm">
                  Profesionalna oprema za sve nivoe
                </p>
              </div>
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
              <div key={offer.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className={`${offer.bgColor} h-20 flex items-center justify-center`}>
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

        {/* Best Courts Section - Smaller fonts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Najbolji tereni u gradu...
            </h3>
            <button className="bg-gray-100 text-cyan-500 font-semibold py-2 px-4 rounded-full text-xs">
              Prikaži sve
            </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm h-32 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-2">🎾</div>
              <span className="text-gray-500 text-sm">Tereni će biti dodani uskoro</span>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-4"></div>
      </div>
    </div>
  );
}
