import { useState } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  MessageCircle,
  Calendar,
  DollarSign,
  Users,
  Shield,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  ShowerHead,
  ChevronRight,
  Heart,
  Share2,
  Camera
} from "lucide-react";

interface ClubDetails {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  priceRange: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  images: string[];
  workingHours: {
    day: string;
    hours: string;
    isOpen: boolean;
  }[];
  amenities: {
    icon: any;
    name: string;
    available: boolean;
  }[];
  courts: {
    type: string;
    count: number;
    surface: string;
    indoor: boolean;
    pricePerHour: number;
  }[];
  coaches: {
    name: string;
    avatar: string;
    specialization: string;
    rating: number;
    pricePerHour: number;
  }[];
  reviews: {
    id: string;
    userName: string;
    userAvatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

const mockClubData: ClubDetails = {
  id: "baseline-tennis",
  name: "Baseline Tennis Club",
  description: "Vrhunski teniski klub sa modernim terenima i profesionalnim osobljem. Idealno mesto za rekreativce i profesionalce.",
  rating: 4.8,
  reviews: 234,
  priceRange: "2.000 - 4.000 RSD",
  address: "Bulevar Arsenija Čarnojevića 95, Novi Beograd",
  phone: "+381 11 123 4567",
  email: "info@baseline.rs",
  website: "www.baseline.rs",
  images: [
    "/images/base_kompres-min.jpg",
    "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1622279457486-62dbd3a66d69?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=400&fit=crop"
  ],
  workingHours: [
    { day: "Ponedeljak", hours: "07:00 - 23:00", isOpen: true },
    { day: "Utorak", hours: "07:00 - 23:00", isOpen: true },
    { day: "Sreda", hours: "07:00 - 23:00", isOpen: true },
    { day: "Četvrtak", hours: "07:00 - 23:00", isOpen: true },
    { day: "Petak", hours: "07:00 - 23:00", isOpen: true },
    { day: "Subota", hours: "08:00 - 22:00", isOpen: true },
    { day: "Nedelja", hours: "08:00 - 22:00", isOpen: true }
  ],
  amenities: [
    { icon: Wifi, name: "Besplatan WiFi", available: true },
    { icon: Car, name: "Parking", available: true },
    { icon: Coffee, name: "Kafić", available: true },
    { icon: Dumbbell, name: "Teretana", available: true },
    { icon: ShowerHead, name: "Svlačionice", available: true },
    { icon: Shield, name: "Obezbeđenje", available: true }
  ],
  courts: [
    { type: "Centralni teren", count: 1, surface: "Šljaka", indoor: false, pricePerHour: 4000 },
    { type: "Standardni tereni", count: 4, surface: "Šljaka", indoor: false, pricePerHour: 2500 },
    { type: "Zatvoreni tereni", count: 2, surface: "Hard", indoor: true, pricePerHour: 3500 }
  ],
  coaches: [
    {
      name: "Marko Jovanović",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      specialization: "Tehnika i taktika",
      rating: 4.9,
      pricePerHour: 5000
    },
    {
      name: "Ana Petrović",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      specialization: "Juniorski program",
      rating: 4.8,
      pricePerHour: 4500
    }
  ],
  reviews: [
    {
      id: "r1",
      userName: "Stefan Nikolić",
      userAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5,
      date: "Pre 2 dana",
      comment: "Odlični tereni, profesionalno osoblje. Preporučujem!"
    },
    {
      id: "r2",
      userName: "Milica Stojanović",
      userAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
      rating: 4,
      date: "Pre nedelju dana",
      comment: "Lepo održavani tereni, malo skuplje cene ali vredi."
    }
  ]
};

export default function ClubLandingPage({ 
  clubId, 
  onClose,
  onBookCourt,
  onContactClub
}: { 
  clubId: string;
  onClose: () => void;
  onBookCourt: (clubId: string) => void;
  onContactClub: (clubId: string) => void;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // In real app, fetch club data based on clubId
  const club = mockClubData;

  const currentDateTime = new Date();
  const currentDay = currentDateTime.toLocaleDateString('sr-RS', { weekday: 'long' });
  const currentHours = club.workingHours.find(h => 
    h.day.toLowerCase() === currentDay.toLowerCase()
  );

  const isOpenNow = () => {
    if (!currentHours || !currentHours.isOpen) return false;
    const [openTime, closeTime] = currentHours.hours.split(' - ');
    const currentTime = currentDateTime.toTimeString().slice(0, 5);
    return currentTime >= openTime && currentTime <= closeTime;
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden">
      {/* Image Gallery */}
      <div className="relative h-64 bg-gray-200">
        <img
          src={club.images[selectedImageIndex]}
          alt={club.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Header Actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </button>
            <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          {club.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedImageIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Camera Count */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <Camera className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">{club.images.length}</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="h-[calc(100%-16rem)] overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Club Header */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{club.name}</h1>
              <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">{club.rating}</span>
                <span className="text-xs text-gray-600">({club.reviews})</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-3">{club.description}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-gray-600">
                <DollarSign className="w-4 h-4" />
                {club.priceRange}
              </span>
              <span className={`flex items-center gap-1 font-medium ${
                isOpenNow() ? 'text-green-600' : 'text-red-600'
              }`}>
                <Clock className="w-4 h-4" />
                {isOpenNow() ? 'Otvoreno' : 'Zatvoreno'}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => onBookCourt(club.id)}
              className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Rezerviši teren
            </button>
            <button
              onClick={() => onContactClub(club.id)}
              className="flex-1 bg-emerald-100 text-emerald-700 py-3 rounded-xl font-semibold hover:bg-emerald-200 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Kontakt
            </button>
          </div>

          {/* Location & Contact */}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            <h3 className="font-semibold text-gray-900 mb-2">Lokacija i kontakt</h3>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-gray-700">{club.address}</p>
                <button className="text-emerald-600 text-sm font-medium mt-1">
                  Prikaži na mapi →
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <a href={`tel:${club.phone}`} className="text-gray-700 hover:text-emerald-600">
                {club.phone}
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <a href={`mailto:${club.email}`} className="text-gray-700 hover:text-emerald-600">
                {club.email}
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <a href={`https://${club.website}`} className="text-gray-700 hover:text-emerald-600">
                {club.website}
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Radno vreme</h3>
            <div className="space-y-2">
              {club.workingHours.map((schedule) => (
                <div key={schedule.day} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{schedule.day}</span>
                  <span className={`font-medium ${schedule.isOpen ? 'text-gray-900' : 'text-gray-400'}`}>
                    {schedule.isOpen ? schedule.hours : 'Zatvoreno'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Sadržaji</h3>
            <div className="grid grid-cols-2 gap-3">
              {club.amenities
                .slice(0, showAllAmenities ? undefined : 4)
                .map((amenity, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      amenity.available 
                        ? 'bg-emerald-50 text-gray-700' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <amenity.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{amenity.name}</span>
                  </div>
                ))}
            </div>
            {club.amenities.length > 4 && (
              <button
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="text-emerald-600 text-sm font-medium mt-3"
              >
                {showAllAmenities ? 'Prikaži manje' : `Prikaži sve (${club.amenities.length})`}
              </button>
            )}
          </div>

          {/* Courts */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Tereni</h3>
            <div className="space-y-3">
              {club.courts.map((court, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{court.type}</h4>
                      <p className="text-sm text-gray-600">
                        {court.count} {court.count === 1 ? 'teren' : 'terena'} • {court.surface}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      court.indoor 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {court.indoor ? 'Zatvoreni' : 'Otvoreni'}
                    </span>
                  </div>
                  <p className="text-emerald-600 font-semibold">
                    {court.pricePerHour.toLocaleString()} RSD/sat
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Coaches */}
          {club.coaches.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Treneri</h3>
              <div className="space-y-3">
                {club.coaches.map((coach, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                    <img
                      src={coach.avatar}
                      alt={coach.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{coach.name}</h4>
                      <p className="text-sm text-gray-600">{coach.specialization}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{coach.rating}</span>
                      </div>
                      <p className="text-sm text-emerald-600 font-medium">
                        {coach.pricePerHour.toLocaleString()} RSD/h
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="pb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Recenzije</h3>
              <button className="text-emerald-600 text-sm font-medium">
                Sve recenzije →
              </button>
            </div>
            <div className="space-y-3">
              {club.reviews.slice(0, 2).map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{review.userName}</h4>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-300 text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
