import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Users, Trophy, Star, MapPin, Clock } from "lucide-react";

interface Player {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  location: string;
  availability: string[];
  preferredCourts: string[];
  lastActive: string;
}

interface MatchRequest {
  id: string;
  playerName: string;
  rating: number;
  venue: string;
  date: string;
  time: string;
  courtType: "indoor" | "outdoor";
  gameType: "singles" | "doubles";
  level: "beginner" | "intermediate" | "advanced";
}

export default function FindMatchScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"players" | "requests">("requests");
  const [searchQuery, setSearchQuery] = useState("");

  const mockPlayers: Player[] = [
    {
      id: "1",
      name: "Marko Petrović",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 1520,
      location: "Novi Beograd",
      availability: ["18:00", "19:00", "20:00"],
      preferredCourts: ["baseline-tennis", "privilege"],
      lastActive: "2 min"
    },
    {
      id: "2", 
      name: "Ana Stojanović",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 1680,
      location: "Zemun",
      availability: ["17:00", "18:00"],
      preferredCourts: ["baseline-tennis"],
      lastActive: "5 min"
    },
    {
      id: "3",
      name: "Stefan Nikolić", 
      avatar: "https://randomuser.me/api/portraits/men/25.jpg",
      rating: 1420,
      location: "Vračar",
      availability: ["19:00", "20:00", "21:00"],
      preferredCourts: ["trim", "tipsarevic"],
      lastActive: "12 min"
    }
  ];

  const matchRequests: MatchRequest[] = [
    {
      id: "1",
      playerName: "Nikola Jovanović",
      rating: 1580,
      venue: "Baseline Tennis",
      date: "Danas",
      time: "19:00",
      courtType: "indoor",
      gameType: "singles",
      level: "intermediate"
    },
    {
      id: "2",
      playerName: "Milica Radović",
      rating: 1720,
      venue: "Privilege",
      date: "Sutra",
      time: "18:00",
      courtType: "outdoor",
      gameType: "doubles",
      level: "advanced"
    },
    {
      id: "3",
      playerName: "Đorđe Milosavljević",
      rating: 1450,
      venue: "Trim",
      date: "Danas",
      time: "20:00",
      courtType: "indoor",
      gameType: "singles",
      level: "beginner"
    }
  ];

  const handleSendMatchRequest = (playerId: string) => {
    console.log(`Sending match request to player ${playerId}`);
  };

  const handleAcceptRequest = (requestId: string) => {
    console.log(`Accepting match request ${requestId}`);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 1700) return "text-green-600 bg-green-50";
    if (rating >= 1500) return "text-blue-600 bg-blue-50";
    if (rating >= 1300) return "text-yellow-600 bg-yellow-50";
    return "text-gray-600 bg-gray-50";
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "advanced": return "bg-red-100 text-red-800";
      case "intermediate": return "bg-blue-100 text-blue-800";
      case "beginner": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPlayers = mockPlayers.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen relative overflow-hidden pb-20">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/images/tennis-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-emerald-600/10"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 mt-2">
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

        <div className="text-center px-4 mt-2 mb-6">
          <h1 className="text-white text-base font-light tracking-wider mb-1">
            PRONAĐI
          </h1>
          <h2 className="text-white text-3xl font-bold tracking-wide mb-1">
            MEČ
          </h2>
          <p className="text-white text-xs font-light tracking-widest">
            IGRAJ PROTIV DRUGIH IGRAČA
          </p>
        </div>

        <div className="flex-1 px-4">
          <div className="bg-white rounded-3xl shadow-2xl h-full overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("requests")}
                className={`flex-1 py-4 px-4 text-sm font-medium transition-colors ${
                  activeTab === "requests"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center">
                  <Trophy className="w-4 h-4 mr-2" />
                  Zahtevi za Meč
                </div>
              </button>
              <button
                onClick={() => setActiveTab("players")}
                className={`flex-1 py-4 px-4 text-sm font-medium transition-colors ${
                  activeTab === "players"
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <div className="flex items-center justify-center">
                  <Users className="w-4 h-4 mr-2" />
                  Aktivni Igrači
                </div>
              </button>
            </div>

            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={activeTab === "players" ? "Pretraži igrače..." : "Pretraži zahteve..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {activeTab === "requests" ? (
                <div className="p-4 space-y-4">
                  {matchRequests.map((request) => (
                    <div key={request.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {request.playerName}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(request.rating)}`}>
                              {request.rating}
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(request.level)}`}>
                              {request.level === "beginner" ? "Početnik" : 
                               request.level === "intermediate" ? "Srednji" : "Napredni"}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {request.venue}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {request.date}, {request.time}
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="bg-white px-3 py-1 rounded-full text-xs">
                            {request.courtType === "indoor" ? "🏠 Zatvoreni" : "🌅 Otvoreni"}
                          </span>
                          <span className="bg-white px-3 py-1 rounded-full text-xs">
                            {request.gameType === "singles" ? "1v1" : "2v2"}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="w-full bg-emerald-500 text-white py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                      >
                        Prihvati Izazov
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {filteredPlayers.map((player) => (
                    <div key={player.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900">{player.name}</h3>
                            <span className="text-xs text-gray-500">aktivan {player.lastActive}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(player.rating)}`}>
                              <Star className="w-3 h-3 inline mr-1" />
                              {player.rating}
                            </div>
                            <span className="text-sm text-gray-600">{player.location}</span>
                          </div>
                          
                          <div className="text-xs text-gray-500 mb-3">
                            Dostupan: {player.availability.join(", ")}
                          </div>
                          
                          <button
                            onClick={() => handleSendMatchRequest(player.id)}
                            className="w-full bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                          >
                            Pošalji Izazov
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
