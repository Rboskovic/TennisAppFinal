import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Loader2 } from "lucide-react";
import { tennisAPI, getAggregatedAvailability, useRealtimeUpdates } from "../services/api";

interface Venue {
  id: string;
  name: string;
}

interface AggregatedTimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  totalCourts: number;
  availableCourts: number;
  available: boolean;
  price: number;
  availableSlotIds: string[];
}

interface SelectedSlot {
  id: string;
  start: string;
  end: string;
  price: number;
  availableCourts: number;
}

export default function CourtBookingScreen() {
  const navigate = useNavigate();
  const realtimeUpdates = useRealtimeUpdates();

  const [selectedDate, setSelectedDate] = useState("today");
  const [selectedVenue, setSelectedVenue] = useState("");
  const [availableSlots, setAvailableSlots] = useState<AggregatedTimeSlot[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<SelectedSlot[]>([]);
  const [loading, setLoading] = useState(false);

  const venues: Venue[] = [
    { id: "baseline-tennis", name: "Baseline" },
    { id: "privilege", name: "Privilege" },
    { id: "trim", name: "Trim" },
    { id: "tipsarevic", name: "Tipsarevic" },
  ];

  const dates = [
    { id: "today", date: new Date().getDate(), dayName: "Dan", fullDate: new Date().toISOString().split('T')[0] },
    { id: "tomorrow", date: new Date(Date.now() + 86400000).getDate(), dayName: "Sut", fullDate: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
    { id: "day3", date: new Date(Date.now() + 172800000).getDate(), dayName: "Tre", fullDate: new Date(Date.now() + 172800000).toISOString().split('T')[0] },
    { id: "day4", date: new Date(Date.now() + 259200000).getDate(), dayName: "Čet", fullDate: new Date(Date.now() + 259200000).toISOString().split('T')[0] },
    { id: "day5", date: new Date(Date.now() + 345600000).getDate(), dayName: "Pet", fullDate: new Date(Date.now() + 345600000).toISOString().split('T')[0] }
  ];

  const getActualDate = (dateId: string) => {
    const dateObj = dates.find(d => d.id === dateId);
    return dateObj ? dateObj.fullDate : new Date().toISOString().split('T')[0];
  };

  const fetchAggregatedSlots = async (venueId: string, dateId: string) => {
    if (!venueId || !dateId) return;
    
    setLoading(true);
    setSelectedTimeSlots([]);
    
    try {
      const actualDate = getActualDate(dateId);
      const apiSlots = await getAggregatedAvailability(venueId, actualDate);
      setAvailableSlots(apiSlots);
    } catch (error) {
      console.error('Error fetching aggregated time slots:', error);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleSlotUpdate = (data: { slot: any; courtId: string; date: string }) => {
      const actualDate = getActualDate(selectedDate);
      if (data.date === actualDate && selectedVenue) {
        fetchAggregatedSlots(selectedVenue, selectedDate);
      }
    };

    const handleBookingCreated = (data: { booking: any; slot: any }) => {
      const actualDate = getActualDate(selectedDate);
      if (data.slot.date === actualDate && selectedVenue) {
        fetchAggregatedSlots(selectedVenue, selectedDate);
      }
    };

    realtimeUpdates.onSlotUpdated(handleSlotUpdate);
    realtimeUpdates.onBookingCreated(handleBookingCreated);

    return () => {};
  }, [selectedDate, selectedVenue, realtimeUpdates]);

  useEffect(() => {
    if (selectedVenue && selectedDate) {
      fetchAggregatedSlots(selectedVenue, selectedDate);
    }
  }, [selectedVenue, selectedDate]);

  const toggleTimeSlot = (slot: AggregatedTimeSlot) => {
    if (!slot.available || slot.availableCourts === 0) return;
    
    const isSelected = selectedTimeSlots.some(s => s.id === slot.id);
    
    if (isSelected) {
      setSelectedTimeSlots(selectedTimeSlots.filter(s => s.id !== slot.id));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, {
        id: slot.id,
        start: slot.startTime,
        end: slot.endTime,
        price: slot.price,
        availableCourts: slot.availableCourts
      }]);
    }
  };

  const totalPrice = selectedTimeSlots.reduce((sum, slot) => sum + slot.price, 0);
  const availableSlotsCount = availableSlots.filter(slot => slot.available && slot.availableCourts > 0).length;

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

      <div className="relative z-10 h-full flex flex-col">
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

        <div className="flex-1 flex flex-col justify-center">
          <div className="mx-4">
            <div className="bg-white rounded-3xl shadow-2xl">
              <div className="p-4">
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

                {selectedDate && (
                  <div className="mb-4">
                    <div className="flex items-center mb-3">
                      <span className="text-gray-700 font-medium text-sm">
                        Izaberite lokaciju
                      </span>
                    </div>
                    <div className="flex space-x-2 overflow-x-auto pb-1">
                      {venues.map((venue) => (
                        <button
                          key={venue.id}
                          onClick={() => setSelectedVenue(venue.id)}
                          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            selectedVenue === venue.id
                              ? "bg-emerald-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {venue.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDate && selectedVenue && (
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

                    {loading ? (
                      <div className="grid grid-cols-2 gap-2">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-2">😞</div>
                        <div className="text-gray-500 font-medium">Nema dostupnih termina</div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                        {availableSlots.map((slot) => {
                          const isSelected = selectedTimeSlots.some(s => s.id === slot.id);
                          const isAvailable = slot.available && slot.availableCourts > 0;
                          
                          return (
                            <button
                              key={slot.id}
                              onClick={() => toggleTimeSlot(slot)}
                              disabled={!isAvailable}
                              className={`p-3 rounded-lg border-2 transition-all text-left ${
                                isSelected
                                  ? "border-emerald-500 bg-emerald-50"
                                  : isAvailable
                                  ? "border-gray-200 bg-white hover:border-emerald-300"
                                  : "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                              }`}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <span className={`font-semibold text-sm ${
                                  isSelected ? "text-emerald-700" : isAvailable ? "text-gray-900" : "text-gray-400"
                                }`}>
                                  {slot.startTime}
                                </span>
                                {isSelected && (
                                  <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  </div>
                                )}
                              </div>
                              <div className={`text-xs ${
                                isSelected ? "text-emerald-600" : isAvailable ? "text-gray-600" : "text-gray-400"
                              }`}>
                                {isAvailable ? (
                                  <>
                                    <div>dostupno na {slot.availableCourts} terena</div>
                                    <div className="font-medium mt-1">{slot.price} RSD</div>
                                  </>
                                ) : (
                                  <div>Nedostupno</div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {selectedTimeSlots.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-700 font-medium text-sm">
                        Ukupno ({selectedTimeSlots.length} termina):
                      </span>
                      <span className="text-xl font-bold text-emerald-600">
                        {totalPrice} RSD
                      </span>
                    </div>
                    <button
                      onClick={handleBookNow}
                      className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
                    >
                      Rezerviši
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
