import { Star, Menu, MapPin, Zap, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import { currentUser, userBookings } from "../data/mockData";

export default function HomeScreen() {
  const navigate = useNavigate();

  const handleTerenClick = () => {
    navigate("/court-booking");
  };

  const handleMecClick = () => {
    navigate("/find-match");
  };

  const handleRankClick = () => {
    navigate("/ranking");
  };

  return (
    <div
      className="h-screen relative overflow-hidden pb-20"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      {/* Import Inter Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/images/tennis-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-green-600/10"></div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-10deg);
          }
        }

        .wave-emoji {
          animation: wave 2s ease-in-out infinite;
          transform-origin: 70% 70%;
        }
      `}</style>

      <div className="relative z-10 h-full flex flex-col text-white p-4">
        {/* Fixed Header - Reduced spacing */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            {/* Profile Photo - Smaller */}
            <div className="relative mb-3">
              <img
                src="https://randomuser.me/api/portraits/women/24.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full shadow-lg object-cover"
                style={{
                  boxShadow:
                    "0 0 0 2px rgba(59, 130, 246, 0.4), 0 8px 25px -5px rgba(0, 0, 0, 0.3)",
                }}
              />
            </div>

            <div>
              {/* Greeting - Smaller text */}
              <div className="flex items-center space-x-2">
                <span
                  className="text-xl font-medium opacity-90 tracking-wide"
                  style={{ fontFamily: "Inter, sans-serif", fontWeight: "500" }}
                >
                  Ćao,
                </span>
                <span className="text-3xl wave-emoji">👋</span>
              </div>
              {/* Katarina - Smaller */}
              <div
                className="text-4xl font-bold leading-tight text-white tracking-tight -mt-1"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: "800" }}
              >
                Katarina
              </div>
            </div>
          </div>
          {/* Hamburger Menu - Smaller */}
          <div
            className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm"
            style={{
              height: "40px",
              width: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Menu className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Rating - Compact */}
        <button
          onClick={handleRankClick}
          className="flex items-center space-x-2 mb-4 hover:bg-white/10 rounded-xl p-2 -ml-2 transition-all self-start"
        >
          <Star className="w-4 h-4 fill-white text-white" />
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: "600" }}
          >
            47 rank
          </span>
          <TrendingUp className="w-4 h-4 text-green-400" />
        </button>

        {/* Flexible Middle Section */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Main Action Buttons - Reduced padding */}
          <div className="space-y-2.5 mb-6">
            <button
              onClick={handleTerenClick}
              className="w-full bg-white/85 backdrop-blur-md border border-white/30 rounded-2xl p-3.5 shadow-2xl hover:bg-white/90 hover:shadow-3xl transition-all active:scale-98 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div
                    className="text-gray-900 font-bold text-base tracking-tight"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "700",
                    }}
                  >
                    Pronađi Teren
                  </div>
                  <div
                    className="text-gray-600 font-medium text-sm tracking-wide"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "500",
                    }}
                  >
                    Rezerviši terene u blizini
                  </div>
                </div>
                <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={handleMecClick}
              className="w-full bg-white/85 backdrop-blur-md border border-white/30 rounded-2xl p-3.5 shadow-2xl hover:bg-white/90 hover:shadow-3xl transition-all active:scale-98 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div
                    className="text-gray-900 font-bold text-base tracking-tight"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "700",
                    }}
                  >
                    Pronađi Meč
                  </div>
                  <div
                    className="text-gray-600 font-medium text-sm tracking-wide"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "500",
                    }}
                  >
                    Igraj protiv drugih igrača
                  </div>
                </div>
                <div className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Bookings Section - Compact */}
        <div className="mt-auto">
          <h2
            className="text-xl tracking-tight drop-shadow-sm mb-2"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: "700" }}
          >
            <span className="font-bold">Vaše</span>{" "}
            <span className="font-light" style={{ fontWeight: "300" }}>
              Rezervacije
            </span>
          </h2>

          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide -mr-4 pr-4">
            {userBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
