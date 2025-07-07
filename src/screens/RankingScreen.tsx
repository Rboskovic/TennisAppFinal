import { Search, Trophy, Target, Crown, TrendingUp } from 'lucide-react';
import PlayerRankCard from '../components/PlayerRankCard';
import { rankingData } from '../data/rankingData';

export default function RankingScreen() {
  const currentUser = rankingData.find(player => player.isCurrentUser);
  const playersAroundUser = rankingData.slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-28" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 px-6 py-10 text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-black tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            Ranking
          </h1>
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/20">
            <Search className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Your Position Card - Premium Design */}
        {currentUser && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/50">
            <div className="flex items-center space-x-5">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-xl">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  #{currentUser.rank} pozicija
                </div>
                <div className="text-gray-700 font-bold text-lg mb-3">
                  {currentUser.rating} poena • {currentUser.recentMatches} mečeva ovaj mesec
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{currentUser.trendChange} mesta</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Goals Section - Premium */}
      <div className="px-6 py-8">
        <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-blue-50 rounded-3xl p-6 border-2 border-green-100 mb-8 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="font-black text-gray-900 text-2xl mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Cilj: Top 40
              </div>
              <div className="text-gray-600 text-lg font-semibold">
                Još 7 pozicija do vašeg cilja! 🔥
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>
            Lokalni Ranking
          </h2>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-lg">
            🇷🇸 Srbija
          </div>
        </div>

        {/* Rankings List - Perfect Spacing */}
        <div className="space-y-4">
          {playersAroundUser.map((player) => (
            <PlayerRankCard key={player.id} player={player} />
          ))}
        </div>

        {/* Load More - Premium Button */}
        <button className="w-full mt-8 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 text-gray-800 py-5 rounded-3xl font-bold text-lg hover:from-gray-100 hover:to-gray-50 hover:shadow-lg transition-all shadow-md">
          Prikaži više igrača
        </button>
      </div>
    </div>
  );
}
