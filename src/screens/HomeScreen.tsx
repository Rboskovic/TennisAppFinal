import { Menu, MapPin, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import { currentUser, userBookings } from "../data/mockData";

export default function HomeScreen() {
  const navigate = useNavigate();

  const handleTerenClick = () => navigate("/court-booking");
  const handleMecClick = () => navigate("/find-match");

  const availableMatches = 8;

  return (
    <div
      className="h-screen relative overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/images/tennis-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-green-600/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-4 text-white">
        {/* Header - Fixed alignment */}
        <div className="flex items-start justify-between pt-8 pb-6">
          {/* Profile and greeting */}
          <div className="flex items-start">
            <img
              src="https://randomuser.me/api/portraits/women/24.jpg"
              alt="Profile"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-white/20 shadow-lg flex-shrink-0"
            />
            <div className="ml-3 flex-1">
              <h1 className="text-2xl font-bold flex items-center">
                Zdravo, Katarina!{" "}
                <span
                  className="inline-block text-xl ml-1"
                  style={{ animation: "wave 2s ease-in-out infinite" }}
                >
                  👋
                </span>
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-white/70 flex-shrink-0" />
                <span className="text-sm text-white/70">Beograd, Serbia</span>
              </div>
            </div>
          </div>
          
          {/* Menu button */}
          <button className="w-11 h-11 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors flex-shrink-0">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Quick Stats - Without icons, gradient backgrounds */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Matches */}
          <div className="relative overflow-hidden bg-gradient-to-br from-yellow-400/20 to-orange-400/15 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
            <div className="relative z-10">
              <span className="text-[11px] text-white/60 font-medium block mb-1">Ovaj mesec</span>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-white/80">Mečeva</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl"></div>
          </div>
          
          {/* Tournaments */}
          <button 
            onClick={() => navigate("/turniri")}
            className="relative overflow-hidden bg-gradient-to-br from-emerald-400/20 to-teal-400/15 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10 hover:bg-white/15 transition-colors text-left"
          >
            <div className="relative z-10">
              <span className="text-[11px] text-white/60 font-medium block mb-1">Aktivno</span>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-white/80">Turniri</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-400/10 rounded-full blur-xl"></div>
          </button>
          
          {/* Rank */}
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-400/20 to-pink-400/15 backdrop-blur-sm rounded-2xl p-3.5 border border-white/10">
            <div className="relative z-10">
              <span className="text-[11px] text-white/60 font-medium block mb-1">Rank</span>
              <p className="text-2xl font-bold">#47</p>
              <p className="text-xs text-white/80">Beograd</p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-400/10 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Spacer to push content up */}
        <div className="flex-1 min-h-0" />

        {/* Main content area - moved up */}
        <div className="pb-24">
          {/* Action buttons */}
          <div className="space-y-3 mb-5">
            {/* Pronađi Teren */}
            <button
              onClick={handleTerenClick}
              className="flex items-center justify-between w-full p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 group"
            >
              <div className="flex items-center flex-1 text-left">
                <div className="p-3 mr-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Pronađi Teren
                  </h3>
                  <p className="text-sm text-gray-600">Rezerviši terene u blizini</p>
                </div>
              </div>
              <span className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full min-w-[100px] text-center shadow-sm group-hover:shadow-md transition-shadow">
                Rezerviši
              </span>
            </button>

            {/* Pronađi Meč */}
            <button
              onClick={handleMecClick}
              className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 group overflow-hidden relative"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white rounded-full animate-pulse delay-700"></div>
              </div>
              
              <div className="flex items-center flex-1 text-left relative z-10">
                <div className="p-3 mr-4 bg-white/20 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Pronađi Meč</h3>
                  <p className="text-sm text-white/90">
                    <span className="font-semibold">{availableMatches}</span> aktivnih igrača
                  </p>
                </div>
              </div>
              <span className="px-5 py-2.5 text-sm font-bold text-emerald-700 bg-white rounded-full min-w-[100px] text-center shadow-sm group-hover:shadow-md transition-shadow">
                Igraj
              </span>
            </button>
          </div>

          {/* Moje Rezervacije */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-base font-semibold text-white">
                Moje Rezervacije
              </h2>
              <button
                onClick={() => navigate("/poruke")}
                className="text-white/70 text-sm font-medium hover:text-white transition-colors flex items-center gap-1"
              >
                Vidi sve 
                <span className="text-xs">→</span>
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
              {userBookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="flex-shrink-0 w-64">
                  <BookingCard booking={booking} compact />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
