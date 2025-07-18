// src/screens/RankingScreen.tsx

import {
  ArrowLeft,
  Search,
  ChevronDown,
  MessageCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RankingScreen() {
  const [selectedScope, setSelectedScope] = useState<"svi" | "ja">("svi");
  const [selectedGameType, setSelectedGameType] = useState<"singl" | "dubl">(
    "singl"
  );
  const [showGameTypeDropdown, setShowGameTypeDropdown] = useState(false);
  const [showClubDropdown, setShowClubDropdown] = useState(false);
  const [selectedClub, setSelectedClub] = useState("");
  const [showCount, setShowCount] = useState(10);
  const navigate = useNavigate();

  const clubs = [
    "Teniski Klub Partizan",
    "Teniski Klub Crvena Zvezda",
    "BK Baseline",
    "TK Novak",
    "TK As",
  ];

  const allPlayers = [
    { name: "Novak Đoković", rank: 1, change: 0, nationality: "SRB" },
    { name: "Aleksandar Vukic", rank: 2, change: 2, nationality: "AUS" },
    { name: "Carlos Alcaraz", rank: 3, change: 1, nationality: "ESP" },
    { name: "Albert Flores", rank: 4, change: 3, nationality: "AUT" },
    { name: "Guy Hawkins", rank: 5, change: -1, nationality: "ITS" },
    { name: "Wade Warren", rank: 6, change: 2, nationality: "GER" },
    { name: "A. Pavlyuchenkova", rank: 7, change: 0, nationality: "RUS" },
    { name: "A. Davidovich", rank: 8, change: 4, nationality: "ESP" },
    { name: "P. Badosa", rank: 9, change: 1, nationality: "ESP" },
    { name: "C. Alcaraz", rank: 10, change: 2, nationality: "ESP" },
    { name: "Casper Ruud", rank: 11, change: 1, nationality: "NOR" },
    { name: "Taylor Fritz", rank: 12, change: -1, nationality: "USA" },
    { name: "Medvedev", rank: 13, change: -2, nationality: "RUS" },
    { name: "Stefanos Tsitsipas", rank: 14, change: 1, nationality: "GRE" },
    { name: "Jannik Sinner", rank: 15, change: 3, nationality: "ITA" },
    { name: "Felix Auger-Aliassime", rank: 16, change: -2, nationality: "CAN" },
    { name: "Andrey Rublev", rank: 17, change: 0, nationality: "RUS" },
    { name: "Hubert Hurkacz", rank: 18, change: 1, nationality: "POL" },
    { name: "Pablo Carreno Busta", rank: 19, change: -1, nationality: "ESP" },
    { name: "Alexander Zverev", rank: 20, change: 2, nationality: "GER" },
    { name: "Denis Shapovalov", rank: 21, change: -1, nationality: "CAN" },
    { name: "Grigor Dimitrov", rank: 22, change: 3, nationality: "BUL" },
    { name: "Karen Khachanov", rank: 23, change: 0, nationality: "RUS" },
    { name: "Francisco Cerundolo", rank: 24, change: 2, nationality: "ARG" },
    { name: "Lorenzo Musetti", rank: 25, change: -1, nationality: "ITA" },
    {
      name: "Katarina Miković",
      rank: 47,
      change: 2,
      nationality: "SRB",
      isCurrentUser: true,
    },
  ];

  // Filter players based on selected scope
  const filteredPlayers =
    selectedScope === "ja"
      ? allPlayers.filter((player) => player.isCurrentUser)
      : allPlayers;

  const displayedPlayers = filteredPlayers.slice(0, showCount);

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-emerald-600";
    if (change < 0) return "text-red-500";
    return "text-gray-500";
  };

  const getChangeText = (change: number) => {
    if (change > 0) return `+${change}`;
    if (change < 0) return change.toString();
    return "0";
  };

  const handleMessagePlayer = (playerName: string) => {
    navigate(`/poruke?player=${encodeURIComponent(playerName)}`);
  };

  const handleChallengePlayer = (playerName: string) => {
    console.log(`Challenge ${playerName}`);
  };

  const handlePlayerClick = (playerName: string) => {
    console.log(`Open profile for ${playerName}`);
  };

  const handleShowMore = () => {
    setShowCount((prev) => Math.min(prev + 10, filteredPlayers.length));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header with Tennis Balls Background */}
      <div
        className="relative"
        style={{
          backgroundImage: `url('/images/tennis-balls.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-navy-900/60"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.6)" }}
        ></div>

        {/* Header Content */}
        <div className="relative z-10 flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button onClick={() => navigate("/")} className="mr-3">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-lg font-semibold text-white">
              Igrači i Ranking
            </h1>
          </div>
          <Search className="w-6 h-6 text-white" />
        </div>

        {/* Scope Filter - Svi/Moj Rejting */}
        <div className="relative z-10 px-4 pb-3">
          <div className="bg-white rounded-full p-1 flex shadow-lg w-4/5 max-w-sm">
            <button
              onClick={() => setSelectedScope("svi")}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all ${
                selectedScope === "svi"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Svi
            </button>
            <button
              onClick={() => setSelectedScope("ja")}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all ${
                selectedScope === "ja"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Moj Rejting
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="relative z-10 px-4 pb-3">
          <div className="flex items-center space-x-2 w-4/5 max-w-sm">
            {/* Singles/Doubles Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowGameTypeDropdown(!showGameTypeDropdown)}
                className="bg-emerald-600 text-white px-3 py-2 text-sm font-semibold rounded-full transition-all flex items-center space-x-1 hover:bg-emerald-700"
              >
                <span>{selectedGameType === "singl" ? "Singl" : "Dubl"}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showGameTypeDropdown && (
                <div className="absolute top-full mt-1 left-0 bg-white rounded-2xl shadow-2xl py-2 min-w-32 z-20 border border-slate-200">
                  <button
                    onClick={() => {
                      setSelectedGameType("singl");
                      setShowGameTypeDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 transition-colors"
                  >
                    Singl
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGameType("dubl");
                      setShowGameTypeDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 transition-colors"
                  >
                    Dubl
                  </button>
                </div>
              )}
            </div>

            <button className="bg-emerald-600 text-white px-3 py-2 text-sm font-semibold rounded-full transition-all hover:bg-emerald-700">
              Muškarci
            </button>

            <button className="bg-emerald-600 text-white px-3 py-2 text-sm font-semibold rounded-full transition-all hover:bg-emerald-700">
              Žene
            </button>

            <div className="relative">
              <button
                onClick={() => setShowClubDropdown(!showClubDropdown)}
                className="bg-emerald-600 text-white px-3 py-2 text-sm font-semibold rounded-full transition-all flex items-center space-x-1 hover:bg-emerald-700"
              >
                <span>{selectedClub || "Klub"}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showClubDropdown && (
                <div className="absolute top-full mt-1 left-0 bg-white rounded-2xl shadow-2xl py-2 min-w-48 z-20 border border-slate-200">
                  {clubs.map((club) => (
                    <button
                      key={club}
                      onClick={() => {
                        setSelectedClub(club);
                        setShowClubDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 transition-colors"
                    >
                      {club}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table Headers */}
      <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-100">
        <div className="flex items-center">
          <div className="flex-1">
            <span className="text-sm font-bold text-emerald-800">Ime</span>
          </div>
          <div className="w-20 text-center">
            <span className="text-sm font-bold text-emerald-800">Pozicija</span>
          </div>
          <div className="w-20 text-center">
            <span className="text-sm font-bold text-emerald-800">Promena</span>
          </div>
          <div className="w-24 text-center">
            <span className="text-sm font-bold text-emerald-800">Akcije</span>
          </div>
        </div>
      </div>

      {/* Player List */}
      <div className="bg-white">
        {displayedPlayers.map((player, index) => (
          <div
            key={index}
            className={`px-4 py-4 border-b border-slate-100 ${
              player.isCurrentUser
                ? "bg-amber-50 border-amber-200"
                : "hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center">
              {/* Name */}
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => handlePlayerClick(player.name)}
                  className={`text-left text-sm font-semibold hover:underline transition-colors truncate block w-full ${
                    player.isCurrentUser
                      ? "text-amber-700"
                      : "text-slate-900 hover:text-emerald-600"
                  }`}
                  title={player.name}
                >
                  {player.name}
                  {player.isCurrentUser && (
                    <span className="text-amber-600 text-xs ml-2 font-medium">
                      (Vi)
                    </span>
                  )}
                </button>
              </div>

              {/* Rank */}
              <div className="w-20 text-center">
                <span className="text-sm font-bold text-slate-900">
                  #{player.rank}
                </span>
              </div>

              {/* Change */}
              <div className="w-20 text-center">
                <span
                  className={`text-sm font-bold ${getChangeColor(
                    player.change
                  )}`}
                >
                  {getChangeText(player.change)}
                </span>
              </div>

              {/* Actions */}
              <div className="w-24 flex items-center justify-center space-x-2">
                {!player.isCurrentUser && (
                  <>
                    <button
                      onClick={() => handleMessagePlayer(player.name)}
                      className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-600 transition-colors"
                      title="Pošalji poruku"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleChallengePlayer(player.name)}
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
                      title="Pozovi na meč"
                    >
                      <Zap className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Show More Button */}
        {showCount < filteredPlayers.length && (
          <div className="px-4 py-4 text-center bg-white border-t border-slate-100">
            <button
              onClick={handleShowMore}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-full transition-colors shadow-md text-sm"
            >
              Pogledaj još ({filteredPlayers.length - showCount} preostalo)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
