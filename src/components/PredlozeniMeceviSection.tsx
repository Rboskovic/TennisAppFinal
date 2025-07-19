import {
  Users,
  MapPin,
  Clock,
  Star,
  MessageCircle,
  TrendingUp,
  Calendar,
  ChevronRight,
  Target,
  Zap,
} from "lucide-react";

// Mock data for open matches with real user ratings
const openMatches = [
  {
    id: "m1",
    playerName: "Marko Petrović",
    playerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 1650,
    ratingChange: +12,
    venue: "Baseline Tennis Club",
    date: "Danas",
    time: "18:00",
    courtType: "Šljaka",
    gameType: "Singl",
    matchType: "competitive",
    level: "Srednji",
    message: "Tražim partnera za opušteni meč, fokus na tehnici",
    postedAgo: "Pre 2 sata",
  },
  {
    id: "m2",
    playerName: "Ana Jovanović",
    playerAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 1580,
    ratingChange: -5,
    venue: "TC Trim",
    date: "Sutra",
    time: "10:00",
    courtType: "Hard",
    gameType: "Singl",
    matchType: "friendly",
    level: "Srednji",
    message: "Priprema za turnir, ozbiljan trening",
    postedAgo: "Pre 45 min",
  },
  {
    id: "m3",
    playerName: "Stefan Nikolić",
    playerAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 1720,
    ratingChange: +8,
    venue: "Privilege",
    date: "Danas",
    time: "20:00",
    courtType: "Zatvoreni",
    gameType: "Dubl",
    matchType: "competitive",
    level: "Napredni",
    message: "Tražimo još 2 igrača za dubl",
    postedAgo: "Pre 3 sata",
  },
];

export default function PredlozeniMeceviSection({
  navigate,
  currentUserRating = 1600,
}: {
  navigate: (path: string) => void;
  currentUserRating?: number;
}) {
  const getRatingColor = (rating: number) => {
    if (rating >= 1700) return "text-purple-600";
    if (rating >= 1600) return "text-blue-600";
    if (rating >= 1500) return "text-emerald-600";
    if (rating >= 1400) return "text-yellow-600";
    return "text-gray-600";
  };

  const getMatchCompatibility = (playerRating: number) => {
    const diff = Math.abs(playerRating - currentUserRating);
    if (diff <= 50) return { text: "Odličan meč", color: "text-green-600" };
    if (diff <= 100) return { text: "Dobar meč", color: "text-emerald-600" };
    if (diff <= 200) return { text: "Izazovan meč", color: "text-yellow-600" };
    return { text: "Težak meč", color: "text-red-600" };
  };

  return (
    <div className="px-4 pt-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-100 p-2 rounded-xl">
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Predloženi Mečevi</h3>
        </div>
        <button
          onClick={() => navigate("/find-match")}
          className="bg-gray-100 text-emerald-600 font-semibold py-2 px-4 rounded-full text-sm hover:bg-emerald-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Prikaži sve
        </button>
      </div>

      {/* Match Cards - Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {openMatches.map((match) => {
          const compatibility = getMatchCompatibility(match.rating);

          return (
            <div
              key={match.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 flex-shrink-0"
              onClick={() => navigate(`/find-match?match=${match.id}`)}
              style={{ width: "280px" }}
            >
              <div className="p-4">
                {/* Player Info */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative">
                    <img
                      src={match.playerAvatar}
                      alt={match.playerName}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-white shadow-sm ring-1 ring-gray-200 ${getRatingColor(
                        match.rating
                      )}`}
                    >
                      {match.level.charAt(0)}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {match.playerName}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className={`text-sm font-semibold flex items-center gap-0.5 ${getRatingColor(
                          match.rating
                        )}`}
                      >
                        <Star className="w-3 h-3 fill-current" />
                        {match.rating}
                      </span>
                      <span
                        className={`text-xs ${
                          match.ratingChange > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {match.ratingChange > 0 ? "+" : ""}
                        {match.ratingChange}
                      </span>
                      <span className={`text-xs ${compatibility.color}`}>
                        • {compatibility.text}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs text-gray-500">
                    {match.postedAgo}
                  </span>
                </div>

                {/* Message */}
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  "{match.message}"
                </p>

                {/* Match Type Badge */}
                <div className="mb-3">
                  {match.matchType === "competitive" ? (
                    <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                      <Target className="w-3 h-3" />
                      Competitive · Level: {match.level}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      <Zap className="w-3 h-3" />
                      Women only
                    </span>
                  )}
                </div>

                {/* Match Details */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span>{match.date}</span>
                    <Clock className="w-3 h-3 text-gray-400 ml-2" />
                    <span>{match.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span>{match.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="font-medium">
                      {match.gameType} · {match.courtType}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className="w-full bg-emerald-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-all flex items-center justify-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle join match
                  }}
                >
                  Pridruži se
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
