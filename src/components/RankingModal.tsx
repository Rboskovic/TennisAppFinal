import { X, Trophy, Crown, Medal } from 'lucide-react';
import { PlayerRanking } from '../types';

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rankings: PlayerRanking[];
}

export default function RankingModal({ isOpen, onClose, rankings }: RankingModalProps) {
  if (!isOpen) return null;

  const currentUser = rankings.find(player => player.isCurrentUser);
  const topThree = rankings.slice(0, 3);
  const restOfList = rankings.slice(3, 10);

  const getPodiumHeight = (position: number) => {
    if (position === 1) return 'h-24'; // Winner - tallest
    if (position === 2) return 'h-20'; // Second - medium  
    if (position === 3) return 'h-16'; // Third - shortest
  };

  const getPodiumColor = (position: number) => {
    if (position === 1) return 'from-yellow-400 via-yellow-500 to-orange-500';
    if (position === 2) return 'from-gray-300 via-gray-400 to-gray-500';
    if (position === 3) return 'from-orange-300 via-orange-400 to-orange-600';
  };

  const getPodiumIcon = (position: number) => {
    if (position === 1) return <Crown className="w-8 h-8 text-white" />;
    if (position === 2) return <Trophy className="w-7 h-7 text-white" />;
    if (position === 3) return <Medal className="w-6 h-6 text-white" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred Tennis Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/images/tennis-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          transform: 'scale(1.1)'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Modal Content */}
      <div className="relative w-full max-w-sm mx-4 max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-t-3xl px-6 py-6 text-white">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black" style={{ fontFamily: 'Inter, sans-serif' }}>
              🏆 Ranking
            </h2>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Your Position Banner */}
          {currentUser && (
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center font-black text-white text-lg">
                  #{currentUser.rank}
                </div>
                <div>
                  <div className="font-bold text-lg">Vaša pozicija</div>
                  <div className="text-white/80 text-sm">{currentUser.rating} pts • +{currentUser.trendChange} 🔥</div>
                </div>
              </div>
            </div>
          )}

          {/* Podium Section */}
          <div className="relative">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-white/90">Top 3 Igrača</h3>
            </div>
            
            <div className="flex items-end justify-center space-x-4 mb-6">
              {/* Second Place */}
              {topThree[1] && (
                <div className="flex flex-col items-center">
                  <img 
                    src={topThree[1].avatar}
                    alt={topThree[1].name}
                    className="w-14 h-14 rounded-2xl mb-2 border-2 border-white shadow-lg"
                  />
                  <div className="text-center mb-2">
                    <div className="font-bold text-sm text-white">{topThree[1].name}</div>
                    <div className="text-white/70 text-xs">{topThree[1].rating} pts</div>
                  </div>
                  <div className={`${getPodiumHeight(2)} w-16 bg-gradient-to-t ${getPodiumColor(2)} rounded-t-xl flex items-center justify-center shadow-lg`}>
                    {getPodiumIcon(2)}
                  </div>
                  <div className="bg-gray-400 text-white font-bold text-lg py-1 px-3 rounded-b-lg">2</div>
                </div>
              )}

              {/* First Place - Taller */}
              {topThree[0] && (
                <div className="flex flex-col items-center">
                  <img 
                    src={topThree[0].avatar}
                    alt={topThree[0].name}
                    className="w-16 h-16 rounded-2xl mb-2 border-2 border-yellow-300 shadow-xl"
                  />
                  <div className="text-center mb-2">
                    <div className="font-bold text-base text-white">{topThree[0].name}</div>
                    <div className="text-white/70 text-sm">{topThree[0].rating} pts</div>
                  </div>
                  <div className={`${getPodiumHeight(1)} w-16 bg-gradient-to-t ${getPodiumColor(1)} rounded-t-xl flex items-center justify-center shadow-lg`}>
                    {getPodiumIcon(1)}
                  </div>
                  <div className="bg-yellow-500 text-white font-bold text-lg py-1 px-3 rounded-b-lg">1</div>
                </div>
              )}

              {/* Third Place */}
              {topThree[2] && (
                <div className="flex flex-col items-center">
                  <img 
                    src={topThree[2].avatar}
                    alt={topThree[2].name}
                    className="w-14 h-14 rounded-2xl mb-2 border-2 border-white shadow-lg"
                  />
                  <div className="text-center mb-2">
                    <div className="font-bold text-sm text-white">{topThree[2].name}</div>
                    <div className="text-white/70 text-xs">{topThree[2].rating} pts</div>
                  </div>
                  <div className={`${getPodiumHeight(3)} w-16 bg-gradient-to-t ${getPodiumColor(3)} rounded-t-xl flex items-center justify-center shadow-lg`}>
                    {getPodiumIcon(3)}
                  </div>
                  <div className="bg-orange-500 text-white font-bold text-lg py-1 px-3 rounded-b-lg">3</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rest of Rankings - Clean List */}
        <div className="bg-white rounded-b-3xl max-h-64 overflow-y-auto">
          <div className="p-4">
            <h4 className="font-bold text-gray-800 mb-3 text-lg">Ostali igrači</h4>
            <div className="space-y-2">
              {restOfList.map((player) => (
                <div 
                  key={player.id} 
                  className={`flex items-center space-x-3 p-3 rounded-2xl transition-all ${
                    player.isCurrentUser 
                      ? 'bg-blue-50 border-2 border-blue-200' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    player.isCurrentUser 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    #{player.rank}
                  </div>
                  <img 
                    src={player.avatar}
                    alt={player.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className={`font-bold ${player.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                      {player.name} {player.isCurrentUser && '(Vi)'}
                    </div>
                    <div className="text-gray-600 text-sm">{player.rating} pts • {player.location}</div>
                  </div>
                  <div className={`text-sm font-semibold ${
                    player.trend === 'up' ? 'text-green-600' : 
                    player.trend === 'down' ? 'text-red-600' : 'text-gray-400'
                  }`}>
                    {player.trend === 'up' ? `+${player.trendChange}` : 
                     player.trend === 'down' ? `-${player.trendChange}` : '—'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
