import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  Shield,
  Award,
  ChevronRight,
  User,
  Hash,
  Crown,
  Target,
  Info,
  Check,
  X
} from "lucide-react";

// Extended Tournament interface with additional details
interface TournamentDetails {
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
  rules: string[];
  prizes: {
    position: number;
    amount: number;
    description: string;
  }[];
  participants: {
    id: string;
    name: string;
    avatar: string;
    ranking?: number;
    seed?: number;
  }[];
  schedule?: {
    round: string;
    date: string;
    matches: number;
  }[];
  divisions?: {
    id: string;
    name: string;
    level: string;
    participants: number;
  }[];
}

// Mock data for a single tournament
const mockTournamentDetails: TournamentDetails = {
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
  description: "Prestižni turnir za napredne igrače sa bogatim nagradnim fondom. Turnir se igra po knock-out sistemu sa utešnom grupom.",
  image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop",
  organizer: "Baseline Academy",
  rules: [
    "Sistem takmičenja: Knock-out sa utešnom grupom",
    "Format meča: Best of 3 seta",
    "Lopte: Wilson US Open",
    "Sudije: Profesionalni sudije na svim mečevima",
    "Medicinska podrška dostupna tokom turnira"
  ],
  prizes: [
    { position: 1, amount: 25000, description: "Pobednik + trofej" },
    { position: 2, amount: 15000, description: "Finalista + medalja" },
    { position: 3, amount: 10000, description: "Polufinale" },
  ],
  participants: [
    { id: "p1", name: "Marko Đoković", avatar: "https://randomuser.me/api/portraits/men/1.jpg", ranking: 47, seed: 1 },
    { id: "p2", name: "Stefan Petrović", avatar: "https://randomuser.me/api/portraits/men/2.jpg", ranking: 52, seed: 2 },
    { id: "p3", name: "Milan Jovanović", avatar: "https://randomuser.me/api/portraits/men/3.jpg", ranking: 58, seed: 3 },
    { id: "p4", name: "Ana Nikolić", avatar: "https://randomuser.me/api/portraits/women/4.jpg", ranking: 61 },
    { id: "p5", name: "Jelena Marković", avatar: "https://randomuser.me/api/portraits/women/5.jpg", ranking: 65 },
  ],
  schedule: [
    { round: "1. kolo", date: "2025-08-15", matches: 16 },
    { round: "2. kolo", date: "2025-08-16", matches: 8 },
    { round: "Četvrtfinale", date: "2025-08-16", matches: 4 },
    { round: "Polufinale", date: "2025-08-17", matches: 2 },
    { round: "Finale", date: "2025-08-18", matches: 1 },
  ]
};

// Mock league with divisions
const mockLeagueDetails: TournamentDetails = {
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
  description: "Najveća rekreativna teniska liga u Srbiji. Liga se igra u 5 divizija prema rejtingu.",
  image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=400&fit=crop",
  organizer: "Teniski Savez Beograda",
  rules: [
    "Svaki igrač igra sa svima u svojoj grupi",
    "Mečevi se igraju vikendom",
    "Format: 2 osvojena seta (tie-break u svim setovima)",
    "Bodovanje: Pobeda 3 boda, poraz 1 bod",
    "Prva 2 iz svake grupe idu u viši rang"
  ],
  prizes: [
    { position: 1, amount: 0, description: "Promocija u viši rang + trofej" },
    { position: 2, amount: 0, description: "Promocija u viši rang" },
    { position: 3, amount: 0, description: "Medalja" },
  ],
  participants: [],
  divisions: [
    { id: "d1", name: "A Liga", level: "advanced", participants: 10 },
    { id: "d2", name: "B Liga", level: "intermediate", participants: 10 },
    { id: "d3", name: "C1 Liga", level: "intermediate", participants: 10 },
    { id: "d4", name: "C2 Liga", level: "beginner", participants: 10 },
    { id: "d5", name: "D Liga", level: "beginner", participants: 8 },
  ]
};

export default function TournamentDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState<TournamentDetails | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading tournament details
    setTimeout(() => {
      // In real app, fetch from API based on ID
      if (id === "l1") {
        setTournament(mockLeagueDetails);
      } else {
        setTournament(mockTournamentDetails);
      }
      setLoading(false);
    }, 500);
  }, [id]);

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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('sr-RS', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleRegistration = () => {
    if (tournament?.type === "league" && tournament.divisions && !selectedDivision) {
      alert("Molimo izaberite diviziju");
      return;
    }
    setShowRegistration(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Trophy className="w-12 h-12 text-emerald-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Učitavanje...</p>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-900 font-semibold mb-2">Turnir nije pronađen</p>
          <button
            onClick={() => navigate("/turniri")}
            className="text-emerald-600 hover:text-emerald-700"
          >
            Nazad na listu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header with Image */}
      <div className="relative">
        <img
          src={tournament.image}
          alt={tournament.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Back button */}
        <button
          onClick={() => navigate("/turniri")}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            {tournament.type === "tournament" ? (
              <Trophy className="w-6 h-6 text-amber-400" />
            ) : (
              <Target className="w-6 h-6 text-blue-400" />
            )}
            <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
              {tournament.type === "tournament" ? "Turnir" : "Liga"}
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{tournament.name}</h1>
          <p className="text-white/90 text-sm">{tournament.organizer}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Quick Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">Period</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs">Lokacija</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{tournament.venue}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs">Učesnici</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {tournament.currentParticipants}/{tournament.maxParticipants}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-xs">Nivo</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {getLevelIcon(tournament.level)} {getLevelText(tournament.level)}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center">
            <Info className="w-5 h-5 mr-2 text-emerald-600" />
            O takmičenju
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">{tournament.description}</p>
        </div>

        {/* Divisions (for leagues) */}
        {tournament.type === "league" && tournament.divisions && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center">
              <Hash className="w-5 h-5 mr-2 text-emerald-600" />
              Divizije
            </h2>
            <div className="space-y-2">
              {tournament.divisions.map(division => (
                <button
                  key={division.id}
                  onClick={() => setSelectedDivision(division.id)}
                  className={`w-full p-3 rounded-lg border-2 transition-all ${
                    selectedDivision === division.id
                      ? "border-emerald-600 bg-emerald-50"
                      : "border-gray-200 hover:border-emerald-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{division.name}</p>
                      <p className="text-xs text-gray-600">
                        {getLevelIcon(division.level)} {getLevelText(division.level)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{division.participants} igrača</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Rules */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-emerald-600" />
            Pravila takmičenja
          </h2>
          <ul className="space-y-2">
            {tournament.rules.map((rule, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prizes */}
        {tournament.prizePool && tournament.prizes && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center">
              <Award className="w-5 h-5 mr-2 text-emerald-600" />
              Nagrade
            </h2>
            <div className="space-y-3">
              {tournament.prizes.map((prize, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {prize.position === 1 && <Crown className="w-5 h-5 text-amber-500" />}
                    {prize.position === 2 && <Crown className="w-5 h-5 text-gray-400" />}
                    {prize.position === 3 && <Crown className="w-5 h-5 text-amber-700" />}
                    <div>
                      <p className="font-semibold text-gray-900">{prize.position}. mesto</p>
                      <p className="text-xs text-gray-600">{prize.description}</p>
                    </div>
                  </div>
                  {prize.amount > 0 && (
                    <p className="font-bold text-emerald-600">{prize.amount.toLocaleString()} RSD</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule */}
        {tournament.schedule && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-emerald-600" />
              Raspored
            </h2>
            <div className="space-y-2">
              {tournament.schedule.map((round, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{round.round}</p>
                    <p className="text-xs text-gray-600">{formatDate(round.date)}</p>
                  </div>
                  <p className="text-sm text-gray-600">{round.matches} mečeva</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Participants Preview */}
        {tournament.participants.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-3 flex items-center justify-between">
              <span className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-emerald-600" />
                Učesnici
              </span>
              <span className="text-sm text-gray-600">
                {tournament.currentParticipants} prijavljenih
              </span>
            </h2>
            <div className="space-y-2">
              {tournament.participants.slice(0, 5).map((participant) => (
                <div key={participant.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={participant.avatar}
                      alt={participant.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{participant.name}</p>
                      {participant.ranking && (
                        <p className="text-xs text-gray-600">Rejting: {participant.ranking}</p>
                      )}
                    </div>
                  </div>
                  {participant.seed && (
                    <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                      Seed {participant.seed}
                    </span>
                  )}
                </div>
              ))}
              {tournament.currentParticipants > 5 && (
                <button className="w-full text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium pt-2">
                  Prikaži sve učesnike →
                </button>
              )}
            </div>
          </div>
        )}

        {/* Registration Button */}
        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-emerald-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">Kotizacija</p>
              <p className="text-2xl font-bold text-gray-900">{tournament.entryFee.toLocaleString()} RSD</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Mesta</p>
              <p className="text-lg font-semibold text-emerald-600">
                {tournament.maxParticipants - tournament.currentParticipants} slobodno
              </p>
            </div>
          </div>
          
          {!tournament.enrolled ? (
            <button
              onClick={handleRegistration}
              disabled={tournament.status !== "upcoming" || tournament.currentParticipants >= tournament.maxParticipants}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${
                tournament.status === "upcoming" && tournament.currentParticipants < tournament.maxParticipants
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {tournament.status !== "upcoming" ? "Prijave zatvorene" :
               tournament.currentParticipants >= tournament.maxParticipants ? "Popunjeno" :
               "Prijavi se"}
            </button>
          ) : (
            <div className="text-center">
              <div className="bg-emerald-100 text-emerald-700 py-3 px-4 rounded-xl font-semibold mb-2">
                ✅ Uspešno ste prijavljeni
              </div>
              <button className="text-sm text-gray-600 hover:text-gray-800">
                Otkaži prijavu
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistration && (
        <RegistrationModal
          tournament={tournament}
          selectedDivision={selectedDivision}
          onClose={() => setShowRegistration(false)}
          onSuccess={() => {
            setTournament({ ...tournament, enrolled: true });
            setShowRegistration(false);
          }}
        />
      )}
    </div>
  );
}

// Registration Modal Component
function RegistrationModal({ 
  tournament, 
  selectedDivision,
  onClose, 
  onSuccess 
}: { 
  tournament: TournamentDetails;
  selectedDivision: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setStep(3);
      setTimeout(onSuccess, 2000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Prijava na takmičenje</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? "bg-emerald-600" : "bg-gray-200"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
            }`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? "bg-emerald-600" : "bg-gray-200"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
            }`}>
              3
            </div>
          </div>

          {/* Step 1: Confirmation */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Potvrda prijave</h4>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Takmičenje:</span>
                  <span className="font-medium">{tournament.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Period:</span>
                  <span className="font-medium">
                    {new Date(tournament.startDate).toLocaleDateString('sr-RS')} - 
                    {new Date(tournament.endDate).toLocaleDateString('sr-RS')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lokacija:</span>
                  <span className="font-medium">{tournament.venue}</span>
                </div>
                {selectedDivision && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Divizija:</span>
                    <span className="font-medium">
                      {tournament.divisions?.find(d => d.id === selectedDivision)?.name}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Kotizacija:</span>
                  <span className="text-emerald-600">{tournament.entryFee.toLocaleString()} RSD</span>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                Nastavi sa plaćanjem
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Plaćanje kotizacije</h4>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ime na kartici
                  </label>
                  <input
                    type="text"
                    placeholder="Petar Petrović"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Broj kartice
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Datum isteka
                    </label>
                    <input
                      type="text"
                      placeholder="MM/GG"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800">
                  💡 Ovo je test okruženje. Koristite bilo koje podatke za testiranje.
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {processing ? "Obrađuje se..." : `Plati ${tournament.entryFee.toLocaleString()} RSD`}
              </button>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-emerald-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Uspešna prijava!</h4>
              <p className="text-gray-600 mb-6">
                Vaša prijava na {tournament.name} je uspešno registrovana.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2 text-sm">
                <p><strong>Broj prijave:</strong> #BTC2025-{Math.floor(Math.random() * 1000)}</p>
                <p><strong>Email potvrda:</strong> Poslata na vašu email adresu</p>
                <p><strong>Kontakt organizatora:</strong> {tournament.organizer}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
