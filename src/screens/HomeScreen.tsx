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
      <div className="relative z-10 flex flex-col h-full px-4 pt-8 text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center mb-2">
              <img
                src="https://randomuser.me/api/portraits/women/24.jpg"
                alt="Profile"
                className="w-11 h-11 rounded-full object-cover mr-3"
              />
              <h1 className="text-2xl font-bold">
                Zdravo, Katarina!{" "}
                <span
                  className="inline-block text-xl"
                  style={{ animation: "wave 2s ease-in-out infinite" }}
                >
                  👋
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-white/70" />
              <span className="text-white/70">Beograd, Serbia</span>
            </div>
          </div>
          <button className="w-11 h-11 flex items-center justify-center">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Spacer pushes content downward */}
        <div className="mt-40" />

        {/* Main content (actions + reservations) */}
        <div className="flex flex-col space-y-2 pb-8">
          {/* Pronađi Teren */}
          <button
            onClick={handleTerenClick}
            className="flex items-center justify-between w-full p-4 bg-white rounded-2xl shadow-md hover:shadow-lg active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center flex-1 text-left">
              <div className="p-3 mr-4 bg-emerald-50 rounded-full">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Pronađi Teren
                </h3>
                <p className="text-sm text-gray-600">Rezerviši teren</p>
              </div>
            </div>
            <span className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-full min-w-[96px] text-center">
              Rezerviši
            </span>
          </button>

          {/* Pronađi Meč */}
          <button
            onClick={handleMecClick}
            className="flex items-center justify-between w-full p-4 bg-emerald-600 rounded-2xl shadow-md hover:shadow-lg active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center flex-1 text-left">
              <div className="p-3 mr-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Pronađi Meč</h3>
                <p className="text-sm text-white/90">
                  {availableMatches} mečeva dostupno
                </p>
              </div>
            </div>
            <span className="px-4 py-2 text-sm font-bold text-emerald-700 bg-white rounded-full min-w-[96px] text-center">
              Igraj
            </span>
          </button>

          {/* Moje Rezervacije */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-white">
                Moje Rezervacije
              </h2>
              <button
                onClick={() => navigate("/poruke")}
                className="text-white/80 text-sm font-medium"
              >
                Vidi sve
              </button>
            </div>

            <div className="flex gap-11 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
              {userBookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="flex-shrink-0 w-64">
                  <BookingCard booking={booking} className="p-3 space-y-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
