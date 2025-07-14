import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Calendar, Clock, Loader2 } from "lucide-react";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  price: number;
  available: boolean;
}

interface Venue {
  id: string;
  name: string;
}

interface SelectedSlot {
  id: string;
  start: string;
  end: string;
  price: number;
}

export default function CourtBookingScreen() {
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState("baseline");
  const [selectedDate, setSelectedDate] = useState("today");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<SelectedSlot[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  const venues: Venue[] = [
    { id: "baseline", name: "Baseline" },
    { id: "privilege", name: "Privilege" },
    { id: "trim", name: "Trim" },
    { id: "tipsarevic", name: "Tipsarevic" },
  ];

  // Generate dates starting from today
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    // Add "Today" as first option
    dates.push({
      id: "today",
      label: "Danas",
      dayName: getDayName(today),
      date: today.getDate()
    });

    // Add next 6 days
    for (let i = 1; i <= 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        id: `day-${i}`,
        label: date.getDate().toString(),
        dayName: getDayName(date),
        date: date.getDate()
      });
    }
    
    return dates;
  };

  const getDayName = (date: Date) => {
    const days = ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"];
    return days[date.getDay()];
  };

  const dates = generateDates();

  // Mock API call to fetch available time slots
  const fetchAvailableSlots = async (venueId: string, dateId: string) => {
    setLoading(true);
    setSelectedTimeSlots([]); // Clear selections when changing date/venue
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data based on venue and date
    const mockSlots: TimeSlot[] = [
      { id: "1", start: "08:00", end: "09:00", price: 2500, available: venueId !== "privilege" },
      { id: "2", start: "09:00", end: "10:00", price: 3000, available: true },
      { id: "3", start: "10:00", end: "11:00", price: 3000, available: dateId !== "today" },
      { id: "4", start: "11:00", end: "12:00", price: 3250, available: false },
      { id: "5", start: "12:00", end: "13:00", price: 3550, available: true },
      { id: "6", start: "13:00", end: "14:00", price: 3550, available: dateId === "today" },
      { id: "7", start: "14:00", end: "15:00", price: 4000, available: false },
      { id: "8", start: "15:00", end: "16:00", price: 4000, available: true },
      { id: "9", start: "16:00", end: "17:00", price: 4250, available: venueId === "baseline" },
      { id: "10", start: "17:00", end: "18:00", price: 4500, available: false },
      { id: "11", start: "18:00", end: "19:00", price: 4750, available: true },
      { id: "12", start: "19:00", end: "20:00", price: 5000, available: dateId !== "today" },
      { id: "13", start: "20:00", end: "21:00", price: 4500, available: false },
      { id: "14", start: "21:00", end: "22:00", price: 4000, available: venueId === "baseline" },
    ];
    
    setAvailableSlots(mockSlots);
    setLoading(false);
  };

  // Fetch slots when venue or date changes
  useEffect(() => {
    fetchAvailableSlots(selectedVenue, selectedDate);
  }, [selectedVenue, selectedDate]);

  const toggleTimeSlot = (slot: TimeSlot) => {
    if (!slot.available) return;
    
    const isSelected = selectedTimeSlots.some(s => s.id === slot.id);
    
    if (isSelected) {
      setSelectedTimeSlots(selectedTimeSlots.filter(s => s.id !== slot.id));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, {
        id: slot.id,
        start: slot.start,
        end: slot.end,
        price: slot.price
      }]);
    }
  };

  const totalPrice = selectedTimeSlots.reduce((sum, slot) => sum + slot.price, 0);
  const availableSlotsCount = availableSlots.filter(slot => slot.available).length;

  const handleBookNow = () => {
    if (selectedTimeSlots.length === 0) return;
    
    const selectedVenueData = venues.find((v) => v.id === selectedVenue);
    navigate(`/court-details/${selectedVenue}`, {
      state: {
        venue: selectedVenueData,
        date: selectedDate,
        timeSlots: selectedTimeSlots,
        totalPrice,
      },
    });
  };

  return (
    <div className="h-screen relative overflow-hidden pb-20">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/images/raquet3.png')`,
          backgroundSize: "cover",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center px-4 mt-2 mb-4">
          <h1 className="text-white text-base font-light tracking-wider mb-1">
            TENISKI
          </h1>
          <h2 className="text-white text-3xl font-bold tracking-wide mb-1">
            TERENI
          </h2>
          <p className="text-white text-xs font-light tracking-widest">
            REZERVACIJA
          </p>
        </div>

        {/* Flexible spacer to center content */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Venue Selection */}
          <div className="px-4 mb-3">
            <div className="flex space-x-2 overflow-x-auto pb-1">
              {venues.map((venue) => (
                <button
                  key={venue.id}
                  onClick={() => setSelectedVenue(venue.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedVenue === venue.id
                      ? "bg-emerald-500 text-white"
                      : "bg-white/20 text-white backdrop-blur-sm"
                  }`}
                >
                  {venue.name}
                </button>
              ))}
            </div>
          </div>

          {/* Booking Card */}
          <div className="mx-4">
            <div className="bg-white rounded-3xl shadow-2xl">
              <div className="p-4">
                {/* Date Selection */}
                <div className="mb-4">
                  <div className="flex items-center mb-3">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700 font-medium text-sm">
                      Izaberite datum rezervacije
                    </span>
                  </div>

                  <div className="flex space-x-2 overflow-x-auto pb-1 -mx-1 px-1">
                    {dates.map((date) => (
                      <button
                        key={date.id}
                        onClick={() => setSelectedDate(date.id)}
                        className={`flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all ${
                          selectedDate === date.id
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <span className="text-lg font-bold">
                          {date.id === "today" ? "D" : date.date}
                        </span>
                        <span className="text-xs">{date.dayName}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slot Selection */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-700 font-medium text-sm">
                        Dostupni termini
                      </span>
                      {!loading && (
                        <span className="ml-2 text-xs text-gray-500">
                          ({availableSlotsCount} dostupno)
                        </span>
                      )}
                    </div>
                    {loading && (
                      <div className="flex items-center">
                        <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Time Slots Grid */}
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-lg animate-bounce">🎾</span>
                        </div>
                        <p className="text-gray-500 text-sm">Učitavam termine...</p>
                      </div>
                    </div>
                  ) : availableSlotsCount === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-lg">😔</span>
                      </div>
                      <p className="text-gray-500 text-sm">Nema dostupnih termina</p>
                      <p className="text-gray-400 text-xs">Pokušajte drugi dan</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {availableSlots
                        .filter(slot => slot.available)
                        .map((slot) => {
                          const isSelected = selectedTimeSlots.some(s => s.id === slot.id);
                          return (
                            <button
                              key={slot.id}
                              onClick={() => toggleTimeSlot(slot)}
                              className={`p-2 rounded-lg border transition-all text-xs ${
                                isSelected
                                  ? "bg-emerald-500 text-white border-emerald-500"
                                  : "bg-gray-50 text-gray-700 border-gray-200 hover:border-emerald-300"
                              }`}
                            >
                              <div className="font-medium">{slot.start} - {slot.end}</div>
                              <div className="text-xs opacity-75">{slot.price} RSD</div>
                            </button>
                          );
                        })}
                    </div>
                  )}
                </div>

                {/* Price and Book Button */}
                <div className="flex items-end justify-between">
                  <div className="text-left">
                    <div className="text-gray-500 text-xs mb-1">
                      Ukupno ({selectedTimeSlots.length} termina):
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {totalPrice.toFixed(0)} RSD
                    </div>
                  </div>
                  <button
                    onClick={handleBookNow}
                    disabled={selectedTimeSlots.length === 0}
                    className={`py-2.5 px-5 rounded-xl font-semibold text-sm transition-colors ${
                      selectedTimeSlots.length === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    Rezerviši
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
