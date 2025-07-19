import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import ShopSection from "../components/ShopSection";
import TurniriLigeSection from "../components/TurniriLigeSection";
import PredlozeniMeceviSection from "../components/PredlozeniMeceviSection";
import OpremaPopustSection from "../components/OpremaPopustSection";
import ShopFullPage from "../components/ShopFullPage";
import ClubLandingPage from "../components/ClubLandingPage";

export default function IstraziScreen() {
  const navigate = useNavigate();
  const [showShopModal, setShowShopModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState<string | null>(null);

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

      {/* Shop Section */}
      <ShopSection onShowAll={() => setShowShopModal(true)} />

      {/* Turniri & Lige Section (replaced baseline video) */}
      <TurniriLigeSection navigate={navigate} />

      {/* Predloženi Mečevi Section (replaced summer offers) */}
      <PredlozeniMeceviSection 
        navigate={navigate} 
        currentUserRating={1600} 
      />

      {/* Tennis Clubs Section - Updated with Images and Click Handlers */}
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Najbolji klubovi u gradu
          </h3>
          <button 
            onClick={() => navigate('/court-booking')}
            className="bg-gray-100 text-emerald-600 font-semibold py-2 px-4 rounded-full text-sm hover:bg-emerald-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Prikaži sve
          </button>
        </div>

        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {/* Club 1 - Baseline */}
          <div 
            onClick={() => setSelectedClub('baseline-tennis')}
            className="bg-white rounded-2xl shadow-sm flex-shrink-0 w-80 cursor-pointer hover:shadow-lg transition-all"
          >
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
          <div 
            onClick={() => setSelectedClub('tipsarevic')}
            className="bg-white rounded-2xl shadow-sm flex-shrink-0 w-80 cursor-pointer hover:shadow-lg transition-all"
          >
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

          {/* Club 3 - Privilege */}
          <div 
            onClick={() => setSelectedClub('privilege')}
            className="bg-white rounded-2xl shadow-sm flex-shrink-0 w-80 cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="h-32 rounded-t-2xl relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=800&h=400&fit=crop"
                alt="Privilege Tennis Club"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-lg font-bold">Privilege</div>
              </div>
            </div>
            <div className="p-3">
              <div className="text-sm text-gray-600 mb-2">
                Ekskluzivni klub • VIP
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold">4.000 RSD</span>
                  <span>10-15 minuta</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span className="font-semibold">9.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Oprema na Popustu Section */}
      <OpremaPopustSection onShowAll={() => setShowShopModal(true)} />

      {/* Modals */}
      {showShopModal && (
        <ShopFullPage onClose={() => setShowShopModal(false)} />
      )}
      
      {selectedClub && (
        <ClubLandingPage
          clubId={selectedClub}
          onClose={() => setSelectedClub(null)}
          onBookCourt={(clubId) => navigate(`/court-booking?club=${clubId}`)}
          onContactClub={(clubId) => navigate(`/poruke?club=${clubId}`)}
        />
      )}
    </div>
  );
}
