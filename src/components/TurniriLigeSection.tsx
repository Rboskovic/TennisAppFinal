import { useState } from "react";
import {
  Trophy,
  Calendar,
  Users,
  ChevronRight,
  ChevronLeft,
  Star,
  Crown,
  Target,
} from "lucide-react";

// Import tournament data from TurniriScreen
const featuredTournaments = [
  {
    id: "t1",
    name: "Baseline Masters Cup 2025",
    type: "tournament",
    format: "singles",
    level: "advanced",
    startDate: "2025-08-15",
    endDate: "2025-08-18",
    venue: "Baseline Tennis Club",
    entryFee: 3000,
    prizePool: 50000,
    currentParticipants: 24,
    maxParticipants: 32,
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop",
    featured: true,
    daysLeft: 28,
  },
  {
    id: "t3",
    name: "Junior Masters Serbia",
    type: "tournament",
    format: "singles",
    level: "pro",
    startDate: "2025-09-10",
    endDate: "2025-09-15",
    venue: "TC Novak",
    entryFee: 5000,
    prizePool: 100000,
    currentParticipants: 48,
    maxParticipants: 64,
    status: "upcoming",
    image:
      "https://images.unsplash.com/photo-1622279457486-62dbd3a66d69?w=800&h=400&fit=crop",
    featured: true,
    daysLeft: 54,
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
    entryFee: 2000,
    currentParticipants: 48,
    maxParticipants: 64,
    status: "ongoing",
    image:
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=400&fit=crop",
    featured: true,
    matchesThisWeek: 12,
  },
];

export default function TurniriLigeSection({
  navigate,
}: {
  navigate: (path: string) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "advanced":
        return "bg-orange-100 text-orange-700";
      case "pro":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "beginner":
        return "🟢";
      case "intermediate":
        return "🟡";
      case "advanced":
        return "🟠";
      case "pro":
        return "🔴";
      default:
        return "⚪";
    }
  };

  const formatDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startMonth = start.toLocaleDateString("sr-RS", { month: "short" });
    const endMonth = end.toLocaleDateString("sr-RS", { month: "short" });

    if (startMonth === endMonth) {
      return `${start.getDate()}-${end.getDate()} ${startMonth}`;
    }
    return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth}`;
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredTournaments.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + featuredTournaments.length) % featuredTournaments.length
    );
  };

  const tournament = featuredTournaments[currentIndex];

  return (
    <div className="px-4 pt-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-100 p-2 rounded-xl">
            <Trophy className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Turniri & Lige</h3>
        </div>
        <button
          onClick={() => navigate("/turniri")}
          className="bg-gray-100 text-emerald-600 font-semibold py-2 px-4 rounded-full text-sm hover:bg-emerald-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Prikaži sve
        </button>
      </div>

      {/* Featured Tournament Banner with Navigation */}
      <div className="relative">
        <div
          onClick={() => navigate(`/tournament/${tournament.id}`)}
          className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-xl"
          style={{ height: "180px" }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${tournament.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-4 h-full flex flex-col justify-between">
            {/* Top Section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                    tournament.level
                  )}`}
                >
                  {getLevelIcon(tournament.level)}{" "}
                  {tournament.level === "beginner"
                    ? "Početnik"
                    : tournament.level === "intermediate"
                    ? "Srednji"
                    : tournament.level === "advanced"
                    ? "Napredni"
                    : "Pro"}
                </span>
                {tournament.type === "tournament" ? (
                  <span className="px-2 py-1 bg-emerald-500/20 backdrop-blur-sm text-emerald-100 rounded-full text-xs font-semibold">
                    <Crown className="w-3 h-3 inline mr-1" />
                    Turnir
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-blue-500/20 backdrop-blur-sm text-blue-100 rounded-full text-xs font-semibold">
                    <Target className="w-3 h-3 inline mr-1" />
                    Liga
                  </span>
                )}
              </div>

              <h2 className="text-white text-xl font-bold mb-1">
                {tournament.name}
              </h2>

              <div className="flex items-center gap-3 text-white/90 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(tournament.startDate, tournament.endDate)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {tournament.currentParticipants}/{tournament.maxParticipants}
                </span>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between">
              <div>
                {tournament.prizePool && (
                  <p className="text-emerald-400 font-bold text-base">
                    {tournament.prizePool.toLocaleString()} RSD
                  </p>
                )}
                <p className="text-white/70 text-xs">
                  Kotizacija: {tournament.entryFee.toLocaleString()} RSD
                </p>
              </div>

              {tournament.status === "upcoming" && tournament.daysLeft && (
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                  Još {tournament.daysLeft} dana
                </span>
              )}
              {tournament.status === "ongoing" &&
                tournament.matchesThisWeek && (
                  <span className="bg-emerald-500/20 backdrop-blur-sm text-emerald-100 px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                    {tournament.matchesThisWeek} mečeva ove nedelje
                  </span>
                )}
            </div>
          </div>

          {/* Featured Badge */}
          {tournament.featured && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              ISTAKNUTO
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all"
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all"
        >
          <ChevronRight className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-3 gap-1.5">
        {featuredTournaments.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? "w-8 h-2 bg-emerald-600 rounded-full"
                : "w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
