import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

interface Court {
  id: string;
  name: string;
  type: "indoor" | "outdoor";
  available: boolean;
  featured?: boolean;
}

export default function VenueDetailsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { venue, date, timeSlots, totalPrice } = location.state || {};

  const [selectedCourt, setSelectedCourt] = useState("B2");
  const [courtType, setCourtType] = useState<"indoor" | "outdoor">("indoor");

  const courts: Court[] = [
    { id: "A1", name: "A1", type: "indoor", available: true },
    { id: "B1", name: "B1", type: "indoor", available: true },
    { id: "B2", name: "B2", type: "indoor", available: true, featured: true },
    { id: "B3", name: "B3", type: "outdoor", available: true },
    { id: "C1", name: "C1", type: "indoor", available: false },
  ];

  const filteredCourts = courts.filter((court) => court.type === courtType);

  const handleMakeReservation = () => {
    console.log("Making reservation:", {
      venue,
      court: selectedCourt,
      date,
      timeSlots,
      totalPrice,
      courtType,
    });
    navigate("/");
  };

  const handleBookLesson = () => {
    console.log("Booking lesson...");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image - Full Screen Tennis Court */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/images/base_kompres-min.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Header Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Venue Info */}
      <div className="absolute top-20 left-4 z-20">
        <h1 className="text-white text-2xl font-bold mb-1">Tennis court</h1>
        <p className="text-white/90 text-lg">{venue?.name || "Baseline"}</p>
      </div>

      {/* Top 10 Badge */}
      <div className="absolute top-24 right-4 z-20">
        <div className="bg-emerald-500 px-3 py-1 rounded-full">
          <span className="text-white text-sm font-semibold">Top 10</span>
        </div>
      </div>

      {/* Bottom Content Card */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-3xl z-10"
        style={{ height: "70%" }}
      >
        <div className="p-6">
          {/* Court Selection Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl font-semibold">
              Izaberite teren
            </h2>

            {/* Indoor/Outdoor Toggle */}
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setCourtType("indoor")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  courtType === "indoor"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                }`}
              >
                A/C Indoor
              </button>
              <button
                onClick={() => setCourtType("outdoor")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  courtType === "outdoor"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                }`}
              >
                B outdoor
              </button>
            </div>
          </div>

          {/* Court Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {filteredCourts.map((court) => (
              <button
                key={court.id}
                onClick={() => court.available && setSelectedCourt(court.id)}
                disabled={!court.available}
                className={`aspect-square rounded-2xl flex items-center justify-center text-xl font-bold transition-all relative ${
                  selectedCourt === court.id
                    ? "bg-emerald-500 text-white ring-2 ring-emerald-400"
                    : court.available
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
              >
                {court.name}
                {court.featured && selectedCourt === court.id && (
                  <Star className="w-4 h-4 absolute top-2 right-2 text-yellow-400 fill-current" />
                )}
              </button>
            ))}
          </div>

          {/* Book Lesson Section */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 mb-6 relative overflow-hidden">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <div className="text-white text-2xl">🎾</div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">
                  Rezervišite čas sa trenerom
                </h3>
                <p className="text-white/90 text-sm mb-3">
                  Igrajte sa najboljim trenerima
                </p>
                <button
                  onClick={handleBookLesson}
                  className="bg-emerald-500 text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-emerald-600 transition-colors"
                >
                  Rezervišite termin
                </button>
              </div>
            </div>
          </div>

          {/* Make Reservation Button */}
          <button
            onClick={handleMakeReservation}
            className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 transition-colors"
          >
            Napravite rezervaciju
          </button>
        </div>
      </div>

      {/* Bottom Navigation Spacing */}
      <div className="h-24"></div>
    </div>
  );
}
