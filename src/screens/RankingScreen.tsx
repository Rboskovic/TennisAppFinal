import { ArrowLeft, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RankingScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'alltime'>('weekly');
  const [selectedCategory, setSelectedCategory] = useState<'svi' | 'muskarci' | 'zene' | 'klub'>('svi');
  const [showClubDropdown, setShowClubDropdown] = useState(false);
  const [selectedClub, setSelectedClub] = useState('');
  const navigate = useNavigate();

  const clubs = [
    'Teniski Klub Partizan',
    'Teniski Klub Crvena Zvezda', 
    'BK Baseline',
    'TK Novak',
    'TK As'
  ];

  const players = [
    { name: 'Novak Đoković', rank: 1, change: 0, nationality: 'SRB' },
    { name: 'Aleksandar Vukic', rank: 2, change: 2, nationality: 'AUS' },
    { name: 'Carlos Alcaraz', rank: 3, change: 1, nationality: 'ESP' },
    { name: 'Albert Flores', rank: 4, change: 3, nationality: 'AUT' },
    { name: 'Guy Hawkins', rank: 5, change: -1, nationality: 'ITS' },
    { name: 'Wade Warren', rank: 6, change: 2, nationality: 'GER' },
    { name: 'A. Pavlyuchenkova', rank: 7, change: 0, nationality: 'RUS' },
    { name: 'A. Davidovich', rank: 8, change: 4, nationality: 'ESP' },
    { name: 'P. Badosa', rank: 9, change: 1, nationality: 'ESP' },
    { name: 'C. Alcaraz', rank: 10, change: 2, nationality: 'ESP' },
    { name: 'Casper Ruud', rank: 11, change: 1, nationality: 'NOR' },
    { name: 'Taylor Fritz', rank: 12, change: -1, nationality: 'USA' },
    { name: 'Medvedev', rank: 13, change: -2, nationality: 'RUS' },
    { name: 'Katarina Miković', rank: 47, change: 2, nationality: 'SRB', isCurrentUser: true },
  ];

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-emerald-600';
    if (change < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  const getChangeText = (change: number) => {
    if (change > 0) return `+${change}`;
    if (change < 0) return change.toString();
    return '0';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header with Tennis Balls Background */}
      <div 
        className="relative"
        style={{
          backgroundImage: `url('/images/tennis-balls.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy-900/60" style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }}></div>
        
        {/* Header Content */}
        <div className="relative z-10 flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button onClick={() => navigate('/')} className="mr-3">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-lg font-semibold text-white">Players & Rankings</h1>
          </div>
          <Search className="w-6 h-6 text-white" />
        </div>

        {/* Period Filter - Weekly/All Time */}
        <div className="relative z-10 px-4 pb-3">
          <div className="bg-white rounded-full p-1 flex shadow-lg max-w-xs">
            <button
              onClick={() => setSelectedPeriod('weekly')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all ${
                selectedPeriod === 'weekly'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSelectedPeriod('alltime')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all ${
                selectedPeriod === 'alltime'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="relative z-10 px-4 pb-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedCategory('svi')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                selectedCategory === 'svi'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              Svi
            </button>
            
            <button
              onClick={() => setSelectedCategory('muskarci')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                selectedCategory === 'muskarci'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              Muškarci
            </button>
            
            <button
              onClick={() => setSelectedCategory('zene')}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                selectedCategory === 'zene'
                  ? 'bg-white text-emerald-700 shadow-md'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              Žene
            </button>
            
            <div className="relative">
              <button
                onClick={() => {
                  setSelectedCategory('klub');
                  setShowClubDropdown(!showClubDropdown);
                }}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all flex items-center space-x-2 ${
                  selectedCategory === 'klub'
                    ? 'bg-white text-emerald-700 shadow-md'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <span>{selectedClub || 'Klub'}</span>
                <ChevronDown className="w-4 h-4" />
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
      <div className="px-4 py-3 bg-slate-100 border-b border-slate-200">
        <div className="flex items-center">
          <div className="flex-1">
            <div className="flex items-center">
              <span className="text-xs font-semibold text-slate-700">Name</span>
              <ChevronUp className="w-3 h-3 text-slate-600 ml-1" />
            </div>
          </div>
          <div className="w-16 text-center">
            <span className="text-xs font-semibold text-slate-700">RNK</span>
          </div>
          <div className="w-16 text-center">
            <div className="flex items-center justify-center">
              <span className="text-xs font-semibold text-slate-700">Change</span>
              <ChevronUp className="w-3 h-3 text-slate-600 ml-1" />
            </div>
          </div>
          <div className="w-12 text-center">
            <div className="flex items-center justify-center">
              <span className="text-xs font-semibold text-slate-700">Natl</span>
              <ChevronUp className="w-3 h-3 text-slate-600 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Player List */}
      <div className="bg-white">
        {players.map((player, index) => (
          <div
            key={index}
            className={`px-4 py-3 border-b border-slate-100 ${
              player.isCurrentUser ? 'bg-amber-50 border-amber-200' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center">
              {/* Name */}
              <div className="flex-1">
                <span className={`text-sm font-semibold ${
                  player.isCurrentUser ? 'text-amber-700' : 'text-slate-900'
                }`}>
                  {player.name}
                  {player.isCurrentUser && (
                    <span className="text-amber-600 text-xs ml-2 font-medium">(Vi)</span>
                  )}
                </span>
              </div>
              
              {/* Rank */}
              <div className="w-16 text-center">
                <span className="text-sm font-bold text-slate-900">
                  #{player.rank}
                </span>
              </div>
              
              {/* Change */}
              <div className="w-16 text-center">
                <span className={`text-sm font-bold ${getChangeColor(player.change)}`}>
                  {getChangeText(player.change)}
                </span>
              </div>
              
              {/* Nationality */}
              <div className="w-12 text-center">
                <span className="text-xs font-medium text-slate-600">
                  {player.nationality}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
