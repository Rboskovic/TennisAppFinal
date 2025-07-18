import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ChevronRight,
  Filter,
  Search,
  Star,
  TrendingUp,
  Award,
  Zap,
  Target,
  Crown
} from "lucide-react";

// Tournament/League types
interface Tournament {
  id: string;
  name: string;
  type: "tournament" | "league";
  format: "singles" | "doubles" | "mixed";
  level: "beginner" | "intermediate" | "advanced" | "pro";
  startDate: string;
  endDate: string;
  venue: string;
  venueId: string;
  entryFee: number;
  prizePool?: number;
  currentParticipants: number;
  maxParticipants: number;
  status: "upcoming" | "ongoing" | "completed";
  enrolled: boolean;
  description: string;
  image: string;
  organizer: string;
  featured?: boolean;
  participantAvatars?: string[];
}

// Mock data for tournaments and leagues
const mockTournaments: Tournament[] = [
  {
    id: "t1",
    name: "Baseline Masters Cup 2025",
    type: "tournament",
    format: "singles",
    level: "advanced",
    startDate: "2025-08-15",
    endDate: "2025-08-18",
    venue: "Baseline Tennis Club",
    venueId: "baseline-tennis",
    entryFee: 3000,
    prizePool: 50000,
    currentParticipants: 24,
    maxParticipants: 32,
    status: "upcoming",
    enrolled: false,
    description: "Prestižni turnir za napredne igrače sa bogatim nagradnim fondom",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop",
    organizer: "Baseline Academy",
    featured: true,
    participantAvatars: [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg"
    ]
  },
  {
    id: "l1",
    name: "Letnja Liga Beograda",
    type: "league",
    format: "singles",
    level: "intermediate",
    startDate: "2025-07-01",
    endDate: "2025-09-30",
    venue: "Više lokacija",
    venueId: "multiple",
    entryFee: 2000,
    currentParticipants: 48,
    maxParticipants: 64,
    status: "ongoing",
    enrolled: true,
    description: "Tromesečna liga sa grupnom fazom i plej-ofom",
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=400&fit=crop",
    organizer: "Teniski Savez Beograda",
    participantAvatars: [
      "https://randomuser.me/api/portraits/women/4.jpg",
      "https://randomuser.me/api/portraits/men/5.jpg",
      "https://randomuser.me/api/portraits/women/6.jpg"
    ]
  },
  {
    id: "t2",
    name: "Vikend Challenger",
    type: "tournament",
    format: "doubles",
    level: "beginner",
    startDate: "2025-07-25",
    endDate: "2025-07-26",
    venue: "TC Trim",
    venueId: "tc-trim",
    entryFee: 1500,
    currentParticipants: 14,
    maxParticipants: 16,
    status: "upcoming",
    enrolled: false,
    description: "Idealan turnir za početnike koji žele da steknu iskustvo",
    image: "https://images.unsplash.com/photo-1622279457486-62dbd3a8d2a9?w=800&h=400&fit=crop",
    organizer: "TC Trim",
    participantAvatars: [
      "https://randomuser.me/api/portraits/men/7.jpg",
      "https://randomuser.me/api/portraits/women/8.jpg"
    ]
  },
  {
    id: "l2",
    name: "Korporativna Liga",
    type: "league",
    format: "doubles",
    level: "intermediate",
    startDate: "2025-08-01",
    endDate: "2025-10-31",
    venue: "Privilege Tennis Club",
    venueId: "privilege",
    entryFee: 4000,
    currentParticipants: 20,
    maxParticipants: 24,
    status: "upcoming",
    enrolled: true,
    description: "Liga za kompanije i njihove zaposlene",
    image: "https://images.unsplash.com/photo-1530915365347-e35b749a0381?w=800&h=400&fit=crop",
    organizer: "Privilege Club",
    participantAvatars: [
      "https://randomuser.me/api/portraits/men/9.jpg",
      "https://randomuser.me/api/portraits/women/10.jpg",
      "https://randomuser.me/api/portraits/men/11.jpg"
    ]
  },
  {
    id: "t3",
    name: "Novak Junior Open",
    type: "tournament",
    format: "singles",
    level: "intermediate",
    startDate: "2025-09-10",
    endDate: "2025-09-12",
    venue: "Tipsarevic Tennis Academy",
    venueId: "tipsarevic",
    entryFee: 2500,
    prizePool: 30000,
    currentParticipants: 28,
    maxParticipants: 48,
    status: "upcoming",
    enrolled: false,
    description: "Turnir za mlade nade tenisa do 18 godina",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&h=400&fit=crop",
    organizer: "Tipsarevic Academy",
    featured: true,
    participantAvatars: [
      "https://randomuser.me/api/portraits/women/12.jpg",
      "https://randomuser.me/api/portraits/men/13.jpg",
      "https://randomuser.me/api/portraits/women/14.jpg"
    ]
  },
  {
    id: "t4",
    name: "Ada Ciganlija Open",
    type: "tournament",
    format: "mixed",
    level: "intermediate",
    startDate: "2025-07-20",
    endDate: "2025-07-21",
    venue: "TC Ada",
    venueId: "tc-ada",
    entryFee: 2000,
    prizePool: 15000,
    currentParticipants: 16,
    maxParticipants: 24,
    status: "upcoming",
    enrolled: false,
    description: "Mešoviti parovi turnir na otvorenim terenima",
    image: "https://images.unsplash.com/photo-1560012057-4372e14c5085?w=800&h=400&fit=crop",
    organizer: "TC Ada",
    participantAvatars: [
      "https://randomuser.me/api/portraits/women/15.jpg",
      "https://randomuser.me/api/portraits/men/16.jpg"
    ]
  },
  {
    id: "l3",
    name: "Zimska Liga Novog Sada",
    type: "league",
    format: "singles",
    level: "beginner",
    startDate: "2025-10-01",
    endDate: "2025-12-20",
    venue: "NS Tennis Arena",
    venueId: "ns-arena",
    entryFee: 1800,
    currentParticipants: 32,
    maxParticipants: 40,
    status: "upcoming",
    enrolled: false,
    description: "Liga na zatvorenim terenima tokom zimske sezone",
    image: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=800&h=400&fit=crop",
    organizer: "NS Tennis",
    participantAvatars: [
      "https://randomuser.me/api/portraits/men/17.jpg",
      "https://randomuser.me/api/portraits/women/18.jpg",
      "https://randomuser.me/api/portraits/men/19.jpg"
    ]
  }
];

export default function TurniriScreen() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "tournament" | "league">("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedClub, setSelectedClub] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tournaments, setTournaments] = useState<Tournament[]>(mockTournaments);
  const [showFilters, setShowFilters] = useState(false);
  const [showOnlyMine, setShowOnlyMine] = useState(false);

  // Available locations and clubs for filters
  const locations = ["Beograd", "Novi Sad", "Niš", "Kragujevac"];
  const clubs = ["Baseline Tennis Club", "TC Trim", "Privilege Tennis Club", "Tipsarevic Tennis Academy"];

  // Filter tournaments based on selections
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesType = selectedFilter === "all" || tournament.type === selectedFilter;
    const matchesLevel = selectedLevel === "all" || tournament.level === selectedLevel;
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "enrolled" && tournament.enrolled) ||
      (selectedStatus === tournament.status);
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === "all" || tournament.venue.includes(selectedLocation);
    const matchesClub = selectedClub === "all" || tournament.venue === selectedClub;
    const matchesPrice = tournament.entryFee >= priceRange[0] && tournament.entryFee <= priceRange[1];
    const matchesMine = !showOnlyMine || tournament.enrolled;
    
    return matchesType && matchesLevel && matchesStatus && matchesSearch && 
           matchesLocation && matchesClub && matchesPrice && matchesMine;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-700";
      case "ongoing": return "bg-emerald-100 text-emerald-700";
      case "completed": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming": return "Uskoro";
      case "ongoing": return "U toku";
      case "completed": return "Završeno";
      default: return status;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "beginner": return "🟢";
      case "intermediate": return "🟡";
      case "advanced": return "🟠";
      case "pro": return "🔴";
      default: return "⚪";
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case "beginner": return "Početnik";
      case "intermediate": return "Srednji";
      case "advanced": return "Napredni";
      case "pro": return "Pro";
      default: return level;
    }
  };

  const formatDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startMonth = start.toLocaleDateString('sr-RS', { month: 'short' });
    const endMonth = end.toLocaleDateString('sr-RS', { month: 'short' });
    
    if (startMonth === endMonth) {
      return `${start.getDate()}-${end.getDate()} ${startMonth}`;
    }
    return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth}`;
  };

  const handleEnroll = (tournamentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTournaments(prev => 
      prev.map(t => t.id === tournamentId ? { ...t, enrolled: !t.enrolled } : t)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header with Background */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 px-4 pt-6 pb-8">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <Trophy className="w-7 h-7 mr-2" />
            Turniri & Lige
          </h1>
          <p className="text-emerald-100 text-sm">
            Pronađi i pridruži se takmičenjima na svom nivou
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pretraži turnire i lige..."
              className="w-full pl-10 pr-12 py-3 bg-white/95 backdrop-blur-sm text-gray-900 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                showFilters ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="flex gap-2">
          <button
            onClick={() => setShowOnlyMine(false)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              !showOnlyMine
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🎾 Svi
          </button>
          <button
            onClick={() => setShowOnlyMine(true)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
              showOnlyMine
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Star className="w-4 h-4" />
            Moje
          </button>
        </div>
      </div>

      {/* Advanced Filters (Collapsible) */}
      {showFilters && (
        <div className="px-4 py-3 bg-white border-b border-gray-200 space-y-3 animate-in slide-in-from-top">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Lokacija</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">Sve lokacije</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Klub</label>
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">Svi klubovi</option>
                {clubs.map(club => (
                  <option key={club} value={club}>{club}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Cena ulaza: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} RSD
            </label>
            <input
              type="range"
              min="0"
              max="10000"
              step="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1 block">Nivo</label>
            <div className="flex gap-2 flex-wrap">
              {["all", "beginner", "intermediate", "advanced", "pro"].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedLevel === level
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {level === "all" ? "Svi nivoi" : `${getLevelIcon(level)} ${getLevelText(level)}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Featured Tournament Banner */}
      {filteredTournaments.filter(t => t.featured).length > 0 && (
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-amber-500" />
            Istaknuto takmičenje
          </h2>
          {filteredTournaments.filter(t => t.featured).map(tournament => (
            <button
              key={tournament.id}
              onClick={() => navigate(`/tournament/${tournament.id}`)}
              className="w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
            >
              <div className="h-40 relative overflow-hidden">
                <img 
                  src={tournament.image} 
                  alt={tournament.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-xl font-bold">{tournament.name}</h3>
                  {tournament.prizePool && (
                    <p className="text-sm text-white/90">Nagradni fond: {tournament.prizePool.toLocaleString()} RSD</p>
                  )}
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">{tournament.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(tournament.startDate, tournament.endDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {tournament.venue}
                    </span>
                  </div>
                  <Crown className="w-6 h-6 text-amber-400" />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Tournament/League Cards */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">
            Sva takmičenja
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedFilter === "all"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Svi
            </button>
            <button
              onClick={() => setSelectedFilter("tournament")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedFilter === "tournament"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              �� Turniri
            </button>
            <button
              onClick={() => setSelectedFilter("league")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedFilter === "league"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📊 Lige
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredTournaments.filter(t => !t.featured).map(tournament => (
            <button
              key={tournament.id}
              onClick={() => navigate(`/tournament/${tournament.id}`)}
              className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {tournament.type === "tournament" ? (
                        <Trophy className="w-5 h-5 text-amber-500" />
                      ) : (
                        <Target className="w-5 h-5 text-blue-500" />
                      )}
                      <h3 className="font-bold text-gray-900">{tournament.name}</h3>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                        {getStatusText(tournament.status)}
                      </span>
                      <span className="flex items-center gap-1">
                        {getLevelIcon(tournament.level)} {getLevelText(tournament.level)}
                      </span>
                    </div>
                  </div>
                  {tournament.enrolled && (
                    <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {formatDate(tournament.startDate, tournament.endDate)}
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {tournament.venue}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <Users className="w-4 h-4" />
                      {tournament.currentParticipants}/{tournament.maxParticipants} učesnika
                    </span>
                    <span className="font-semibold text-gray-900">
                      {tournament.entryFee.toLocaleString()} RSD
                    </span>
                  </div>
                </div>

                {/* Progress bar for participation */}
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${(tournament.currentParticipants / tournament.maxParticipants) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Footer with participants and action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {tournament.participantAvatars?.slice(0, 3).map((avatar, idx) => (
                        <img
                          key={idx}
                          src={avatar}
                          alt=""
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    {tournament.currentParticipants > 3 && (
                      <span className="ml-2 text-xs text-gray-600">
                        +{tournament.currentParticipants - 3} drugih
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleEnroll(tournament.id, e)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      tournament.enrolled
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : tournament.status === "upcoming"
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-gray-100 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={tournament.status !== "upcoming" && !tournament.enrolled}
                  >
                    {tournament.enrolled ? "Prijavljen" : "Prijavi se"}
                  </button>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nema takmičenja
            </h3>
            <p className="text-gray-600 text-sm">
              Pokušajte da promenite filtere ili pretražite ponovo
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
