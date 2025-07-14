import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, Users, CreditCard } from "lucide-react";

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

  const [selectedCourt, setSelectedCourt] = useState("baseline_1");
  const [courtType, setCourtType] = useState<"indoor" | "outdoor">("indoor");
  const [playerName, setPlayerName] = useState("Katarina");
  const [playerPhone, setPlayerPhone] = useState("");

  const courts: Court[] = [
    { id: "baseline_1", name: "Teren 1", type: "indoor", available: true, featured: true },
    { id: "baseline_2", name: "Teren 2", type: "indoor", available: true },
    { id: "baseline_3", name: "Teren 3", type: "outdoor", available: true },
    { id: "baseline_4", name: "Teren 4", type: "outdoor", available: true },
    { id: "baseline_5", name: "Teren 5", type: "indoor", available: false },
  ];

  const filteredCourts = courts.filter((court) => court.type === courtType && court.available);

  const handleMakeReservation = async () => {
    try {
      console.log("Making reservation:", {
        venue,
        court: selectedCourt,
        date,
        timeSlots,
        totalPrice,
        courtType,
        playerName,
        playerPhone
      });
      
      alert(`Rezervacija uspešna!\nTeren: ${selectedCourt}\nCena: ${totalPrice} RSD`);
      navigate("/");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Greška pri rezervaciji. Pokušajte ponovo.");
    }
  };

  const getDateDisplay = (dateId: string) => {
    if (dateId === "today") return "Danas";
    if (dateId === "tomorrow") return "Sutra";
    return dateId;
  };

  if (!venue || !timeSlots) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Greška</h2>
          <p className="text-gray-600 mb-4">Podaci o rezervaciji nisu pronađeni.</p>
          <button 
            onClick={() => navigate("/court-booking")}
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg"
          >
            Nazad na rezervaciju
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Potvrda Rezervacije</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      <div className="pb-24">
        <div className="bg-white m-4 rounded-xl shadow-sm overflow-hidden">
          <div 
            className="h-32 bg-gradient-to-r from-emerald-500 to-emerald-600 relative"
            style={{
              backgroundImage: `url('/images/tennis-bg.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-4 left-4">
              <h2 className="text-white text-xl font-bold">{venue.name}</h2>
              <div className="flex items-center text-white/90 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Beograd, Srbija</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white m-4 rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-emerald-500" />
            Detalji Rezervacije
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Datum:</span>
              <span className="font-medium text-gray-900">{getDateDisplay(date)}</span>
            </div>
            
            <div className="border-b border-gray-100 pb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Termini:</span>
                <span className="font-medium text-gray-900">{timeSlots?.length || 0} termin(a)</span>
              </div>
              {timeSlots?.map((slot: any, index: number) => (
                <div key={index} className="flex justify-between items-center text-sm py-1">
                  <span className="text-gray-500">{slot.start} - {slot.end}</span>
                  <span className="text-emerald-600 font-medium">
                    {slot.availableCourts ? `${slot.availableCourts} terena dostupno` : ''} • {slot.price} RSD
                  </span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-lg font-semibold text-gray-900">Ukupno:</span>
              <span className="text-xl font-bold text-emerald-600">{totalPrice} RSD</span>
            </div>
          </div>
        </div>

        <div className="bg-white m-4 rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Izbor Terena</h3>
          
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => setCourtType("indoor")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                courtType === "indoor"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              🏠 Zatvoreni Tereni
            </button>
            <button
              onClick={() => setCourtType("outdoor")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                courtType === "outdoor"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              🌅 Otvoreni Tereni
            </button>
          </div>

          <div className="space-y-2">
            {filteredCourts.map((court) => (
              <button
                key={court.id}
                onClick={() => setSelectedCourt(court.id)}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                  selectedCourt === court.id
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-200 bg-gray-50 hover:border-emerald-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900 flex items-center">
                      {court.name}
                      {court.featured && (
                        <Star className="w-4 h-4 ml-1 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      {court.type === "indoor" ? "Zatvoreni teren" : "Otvoreni teren"}
                    </div>
                  </div>
                  {selectedCourt === court.id && (
                    <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white m-4 rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-emerald-500" />
            Podaci o Igraču
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ime i prezime
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Unesite ime i prezime"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Broj telefona
              </label>
              <input
                type="tel"
                value={playerPhone}
                onChange={(e) => setPlayerPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Unesite broj telefona"
              />
            </div>
          </div>
        </div>

        <div className="bg-white m-4 rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-emerald-500" />
            Način Plaćanja
          </h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-blue-800 text-sm">
              💳 Plaćanje na licu mesta
            </div>
            <div className="text-blue-600 text-xs mt-1">
              Rezervacija će biti potvrđena. Platićete kada dođete na teren.
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold text-gray-900">Ukupno:</span>
          <span className="text-xl font-bold text-emerald-600">{totalPrice} RSD</span>
        </div>
        <button
          onClick={handleMakeReservation}
          disabled={!playerName || !selectedCourt}
          className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Potvrdi Rezervaciju
        </button>
      </div>
    </div>
  );
}
