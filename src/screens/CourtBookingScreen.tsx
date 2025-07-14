import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Calendar, Clock } from "lucide-react";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  price: number;
}

interface Venue {
  id: string;
  name: string;
}

export default function CourtBookingScreen() {
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState("baseline");
  const [selectedDate, setSelectedDate] = useState(2);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([
    { id: "1", start: "12:00", end: "13:00", price: 3550 },
  ]);

  const venues: Venue[] = [
    { id: "baseline", name: "Baseline" },
    { id: "privilege", name: "Privilege" },
    { id: "trim", name: "Trim" },
    { id: "tipsarevic", name: "Tipsarevic" },
  ];

  const dates = [
    { number: 2, day: "Sre" },
    { number: 3, day: "Čet" },
    { number: 4, day: "Pet" },
    { number: 5, day: "Sub" },
    { number: 6, day: "Ned" },
    { number: 7, day: "Pon" },
    { number: 8, day: "Uto" },
  ];

  const availableTimeSlots = [
    { start: "08:00", end: "09:00", price: 2500, available: false }, // booked
    { start: "09:00", end: "10:00", price: 3000, available: true },
    { start: "10:00", end: "11:00", price: 3000, available: false }, // booked
    { start: "11:00", end: "12:00", price: 3250, available: false }, // booked
    { start: "12:00", end: "13:00", price: 3550, available: true },
    { start: "13:00", end: "14:00", price: 3550, available: false }, // booked
    { start: "14:00", end: "15:00", price: 4000, available: false }, // booked
    { start: "15:00", end: "16:00", price: 4000, available: true },
    { start: "16:00", end: "17:00", price: 4250, available: false }, // booked
    { start: "17:00", end: "18:00", price: 4500, available: false }, // booked
    { start: "18:00", end: "19:00", price: 4750, available: true },
    { start: "19:00", end: "20:00", price: 5000, available: false }, // booked
    { start: "20:00", end: "21:00", price: 4500, available: false }, // booked
    { start: "21:00", end: "22:00", price: 4000, available: true },
  ];

  const availableSlots = availableTimeSlots.filter((slot) => slot.available);

  const addTimeSlot = () => {
    const firstAvailable = availableSlots.find(
      (slot) =>
        !selectedTimeSlots.some((selected) => selected.start === slot.start)
    );

    if (firstAvailable) {
      const newSlot: TimeSlot = {
        id: Date.now().toString(),
        start: firstAvailable.start,
        end: firstAvailable.end,
        price: firstAvailable.price,
      };
      setSelectedTimeSlots([...selectedTimeSlots, newSlot]);
    }
  };

  const removeTimeSlot = (id: string) => {
    if (selectedTimeSlots.length > 1) {
      setSelectedTimeSlots(selectedTimeSlots.filter((slot) => slot.id !== id));
    }
  };

  const updateTimeSlot = (
    id: string,
    timeSlot: { start: string; end: string; price: number }
  ) => {
    setSelectedTimeSlots(
      selectedTimeSlots.map((slot) =>
        slot.id === id ? { ...slot, ...timeSlot } : slot
      )
    );
  };

  const totalPrice = selectedTimeSlots.reduce(
    (sum, slot) => sum + slot.price,
    0
  );

  const handleBookNow = () => {
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
    <div className="min-h-screen relative overflow-hidden">
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

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 text-center px-4 mt-8 mb-12">
        <h1 className="text-white text-lg font-light tracking-wider mb-2">
          TENISKI
        </h1>
        <h2 className="text-white text-4xl font-bold tracking-wide mb-2">
          TERENI
        </h2>
        <p className="text-white text-sm font-light tracking-widest">
          REZERVACIJA
        </p>
      </div>

      {/* Venue Selection - Right above card with minimal gap */}
      <div className="relative z-10 px-4 mb-1" style={{ marginTop: "180px" }}>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {venues.map((venue) => (
            <button
              key={venue.id}
              onClick={() => setSelectedVenue(venue.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
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

      {/* Booking Card - Right below filters */}
      <div className="relative z-10 mx-4 bg-white rounded-3xl p-6 shadow-2xl">
        {/* Date Selection */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-gray-400 mr-3" />
            <span className="text-gray-700 font-medium">
              Izaberite datum rezervacije
            </span>
          </div>

          <div className="flex space-x-3 overflow-x-auto pb-2">
            {dates.map((date) => (
              <button
                key={date.number}
                onClick={() => setSelectedDate(date.number)}
                className={`flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  selectedDate === date.number
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-xl font-bold">{date.number}</span>
                <span className="text-xs">{date.day}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-gray-400 mr-3" />
              <span className="text-gray-700 font-medium">
                Izaberite termin
              </span>
            </div>
            <button
              onClick={addTimeSlot}
              className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="space-y-3">
            {selectedTimeSlots.map((slot, index) => (
              <div key={slot.id} className="flex items-center space-x-3">
                <select
                  value={`${slot.start}-${slot.end}`}
                  onChange={(e) => {
                    const [start, end] = e.target.value.split("-");
                    const timeSlot = availableSlots.find(
                      (t) => t.start === start && t.end === end
                    );
                    if (timeSlot) {
                      updateTimeSlot(slot.id, timeSlot);
                    }
                  }}
                  className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-gray-700 font-medium"
                >
                  {availableSlots.map((time) => (
                    <option
                      key={`${time.start}-${time.end}`}
                      value={`${time.start}-${time.end}`}
                    >
                      {time.start} - {time.end}
                    </option>
                  ))}
                </select>

                {selectedTimeSlots.length > 1 && (
                  <button
                    onClick={() => removeTimeSlot(slot.id)}
                    className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-red-600" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Price and Book Button - Aligned in same row */}
        <div className="flex items-end justify-between">
          <div className="text-left">
            <div className="text-gray-500 text-sm mb-1">Ukupno:</div>
            <div className="text-3xl font-bold text-gray-900">
              {totalPrice.toFixed(0)} RSD
            </div>
          </div>
          <button
            onClick={handleBookNow}
            className="bg-black text-white py-3 px-6 rounded-xl font-semibold text-base hover:bg-gray-800 transition-colors"
          >
            Rezerviši
          </button>
        </div>
      </div>

      {/* Minimal bottom spacing */}
      <div className="h-4"></div>
    </div>
  );
}
