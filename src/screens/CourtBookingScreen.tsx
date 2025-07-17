import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Loader2, MapPin, Filter, Star, Navigation } from "lucide-react";
import { tennisAPI, getAggregatedAvailability, useRealtimeUpdates } from "../services/api";

interface Venue {
  id: string;
  name: string;
  price: string;
  distance: string;
  rating: number;
  image: string;
  courtCount?: number;
  features?: string[];
  description?: string;
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
  const [currentVenueIndex, setCurrentVenueIndex] = useState(0);

  const venues: Venue[] = [
    { 
      id: "baseline-tennis", 
      name: "Baseline",
      price: "2.500 RSD",
      distance: "15-20 minuta",
      rating: 9.2,
      image: "/images/base_kompres-min.jpg",
      courtCount: 5,
      features: ["Šljaka", "LED osvetljenje", "Parking", "Kafić"],
      description: "Profesionalni teniski centar sa 5 terena najnovije generacije"
    },
    { 
      id: "privilege", 
      name: "Privilege",
      price: "3.000 RSD",
      distance: "10-15 minuta",
      rating: 8.8,
      image: "/images/teniski-centar-novak.jpg",
      courtCount: 8,
      features: ["Hard", "Zatvoreni tereni", "Fitness", "Restoran"],
      description: "Ekskluzivni klub sa zatvorenim i otvorenim terenima"
    },
    { 
      id: "trim", 
      name: "Trim",
      price: "2.000 RSD",
      distance: "20-25 minuta",
      rating: 8.5,
      image: "/images/base_kompres-min.jpg",
      courtCount: 6,
      features: ["Šljaka", "Trava", "Tribine", "Svlačionice"],
      description: "Tradicionalni klub sa dugom istorijom i kvalitetnim terenima"
    },
    { 
      id: "tipsarevic", 
      name: "Tipsarevic",
      price: "3.000 RSD",
      distance: "25-30 minuta",
      rating: 9.5,
      image: "/images/teniski-centar-novak.jpg",
      courtCount: 10,
      features: ["Hard", "Akademija", "Pro Shop", "Wellness"],
      description: "Najmoderniji teniski kompleks sa akademijom i wellness centrom"
    },
  ];

  const dates = [
    { id: "today", date: new Date().getDate(), dayName: "Pon", fullName: "Danas", fullDate: new Date().toISOString().split('T')[0] },
    { id: "tomorrow", date: new Date(Date.now() + 86400000).getDate(), dayName: "Uto", fullName: "Sutra", fullDate: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
    { id: "day3", date: new Date(Date.now() + 172800000).getDate(), dayName: "Sre", fullName: null, fullDate: new Date(Date.now() + 172800000).toISOString().split('T')[0] },
    { id: "day4", date: new Date(Date.now() + 259200000).getDate(), dayName: "Čet", fullName: null, fullDate: new Date(Date.now() + 259200000).toISOString().split('T')[0] },
    { id: "day5", date: new Date(Date.now() + 345600000).getDate(), dayName: "Pet", fullName: null, fullDate: new Date(Date.now() + 345600000).toISOString().split('T')[0] }
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

  const handleVenueScroll = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentVenueIndex > 0) {
      setCurrentVenueIndex(currentVenueIndex - 1);
    } else if (direction === 'right' && currentVenueIndex < venues.length - 1) {
      setCurrentVenueIndex(currentVenueIndex + 1);
    }
  };

  const selectVenueByIndex = (index: number) => {
    setCurrentVenueIndex(index);
    setSelectedVenue(venues[index].id);
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
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">
            TENISKI TERENI REZERVACIJA
          </h1>
          <div className="w-10 h-10"></div>
        </div>

        <div className="flex-1 px-4 pb-6 overflow-y-auto">
          <div className="mt-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-5 max-w-md mx-auto">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-700 font-medium text-sm">
                      Izaberi datum
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {dates.map((date) => (
                    <button
                      key={date.id}
                      onClick={() => setSelectedDate(date.id)}
                      className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all min-w-[70px] ${
                        selectedDate === date.id
                          ? "bg-emerald-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-lg font-bold">
                        {date.fullName ? date.fullName.substring(0, 3) : date.date}
                      </span>
                      <span className="text-xs">{date.dayName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && !selectedVenue && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-700 font-medium text-sm">
                        Izaberi klub
                      </span>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Filter className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Horizontal scrolling venue cards */}
                  <div className="relative">
                    <div className="overflow-hidden">
                      <div 
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentVenueIndex * 100}%)` }}
                      >
                        {venues.map((venue, index) => (
                          <div
                            key={venue.id}
                            className="w-full flex-shrink-0 px-2"
                          >
                            <button
                              onClick={() => selectVenueByIndex(index)}
                              className="w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-100"
                            >
                              <div className="h-40 relative overflow-hidden">
                                <img
                                  src={venue.image}
                                  alt={venue.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 right-3 text-white">
                                  <div className="text-2xl font-bold mb-1">{venue.name}</div>
                                  <div className="text-sm opacity-90">{venue.description}</div>
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-4">
                                    <div>
                                      <div className="text-xs text-gray-500">Cena po satu</div>
                                      <div className="font-bold text-gray-900">{venue.price}</div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-gray-500">Udaljenost</div>
                                      <div className="text-sm text-gray-700">{venue.distance}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center bg-emerald-50 px-3 py-1 rounded-full">
                                    <Star className="w-4 h-4 text-emerald-600 mr-1" fill="currentColor" />
                                    <span className="font-bold text-emerald-700">{venue.rating}</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-sm text-gray-600">
                                    <span className="font-medium">{venue.courtCount} terena</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {venue.features?.slice(0, 2).map((feature, idx) => (
                                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation buttons */}
                    {currentVenueIndex > 0 && (
                      <button
                        onClick={() => handleVenueScroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 shadow-md rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 text-gray-700" />
                      </button>
                    )}
                    {currentVenueIndex < venues.length - 1 && (
                      <button
                        onClick={() => handleVenueScroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 shadow-md rounded-full flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 text-gray-700 rotate-180" />
                      </button>
                    )}
                  </div>

                  {/* Venue indicators */}
                  <div className="flex justify-center mt-3 gap-1">
                    {venues.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentVenueIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === currentVenueIndex
                            ? "w-6 bg-emerald-600"
                            : "w-1.5 bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedVenue && selectedDate && (
                <>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-700 font-medium text-sm">
                          Dostupni termini
                        </span>
                      </div>
                      <span className="text-emerald-600 text-sm font-medium">
                        {availableSlotsCount} dostupno
                      </span>
                    </div>

                    <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                      {venues.map((venue) => (
                        <button
                          key={venue.id}
                          onClick={() => setSelectedVenue(venue.id)}
                          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                            selectedVenue === venue.id
                              ? "bg-emerald-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {venue.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                    </div>
                  ) : (
                    <div className="max-h-52 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300">
                      <div className="grid grid-cols-2 gap-2">
                        {availableSlots.map((slot) => {
                          const isSelected = selectedTimeSlots.some(s => s.id === slot.id);
                          const isAvailable = slot.available && slot.availableCourts > 0;
                          
                          return (
                            <button
                              key={slot.id}
                              onClick={() => toggleTimeSlot(slot)}
                              disabled={!isAvailable}
                              className={`p-3 rounded-xl border-2 transition-all ${
                                isSelected
                                  ? "border-emerald-600 bg-emerald-50 shadow-sm"
                                  : isAvailable
                                  ? "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
                                  : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                              }`}
                            >
                              <div className={`text-sm font-bold ${isSelected ? "text-emerald-700" : isAvailable ? "text-gray-900" : "text-gray-400"}`}>
                                {slot.startTime} - {slot.endTime}
                              </div>
                              <div className={`text-xs ${isAvailable ? "text-gray-600" : "text-gray-400"}`}>
                                {slot.availableCourts}/{slot.totalCourts} terena
                              </div>
                              <div className={`text-xs font-medium ${isSelected ? "text-emerald-600" : isAvailable ? "text-gray-700" : "text-gray-400"}`}>
                                {slot.price} RSD
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-600 text-sm">
                        Izabrano: {selectedTimeSlots.length} termina
                      </span>
                      <div className="text-right">
                        <span className="text-gray-500 text-xs">Ukupno</span>
                        <div className="text-emerald-600 font-bold text-lg">
                          {totalPrice} RSD
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleBookNow}
                      disabled={selectedTimeSlots.length === 0}
                      className={`w-full py-3 rounded-xl font-semibold transition-all ${
                        selectedTimeSlots.length > 0
                          ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Nastavi rezervaciju
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
