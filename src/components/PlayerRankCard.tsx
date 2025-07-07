import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { PlayerRanking } from '../types';

interface PlayerRankCardProps {
  player: PlayerRanking;
}

export default function PlayerRankCard({ player }: PlayerRankCardProps) {
  const getTrendIcon = () => {
    if (player.trend === 'up') {
      return <TrendingUp className="w-5 h-5 text-green-500" />;
    }
    if (player.trend === 'down') {
      return <TrendingDown className="w-5 h-5 text-red-500" />;
    }
    return <Minus className="w-5 h-5 text-gray-400" />;
  };

  const getTrendText = () => {
    if (player.trend === 'up') {
      return `+${player.trendChange}`;
    }
    if (player.trend === 'down') {
      return `-${player.trendChange}`;
    }
    return '—';
  };

  const getTrendBg = () => {
    if (player.trend === 'up') return 'bg-green-100 text-green-700 border-green-200';
    if (player.trend === 'down') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-gray-100 text-gray-500 border-gray-200';
  };

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg border transition-all hover:shadow-xl hover:scale-[1.02] ${
      player.isCurrentUser 
        ? 'border-blue-300 bg-gradient-to-r from-blue-50/90 to-indigo-50/90 shadow-2xl ring-2 ring-blue-200' 
        : 'border-white/40 hover:bg-white/95'
    }`} style={{ marginBottom: '16px' }}>
      <div className="flex items-center space-x-5">
        {/* Rank Number - Much Larger & Prominent */}
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg ${
          player.isCurrentUser 
            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800'
        }`} style={{ fontFamily: 'Inter, sans-serif' }}>
          #{player.rank}
        </div>

        {/* Player Info - Better Hierarchy */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {/* Larger Profile Photo */}
            <img 
              src={player.avatar}
              alt={player.name}
              className="w-12 h-12 rounded-2xl object-cover shadow-md border-2 border-white"
            />
            <div>
              <div className={`font-bold text-xl leading-tight ${
                player.isCurrentUser ? 'text-blue-900' : 'text-gray-900'
              }`} style={{ fontFamily: 'Inter, sans-serif', fontWeight: '800' }}>
                {player.name}
                {player.isCurrentUser && <span className="text-blue-600 font-semibold"> (Vi)</span>}
              </div>
              <div className="text-gray-600 font-semibold text-sm">{player.location}</div>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <span className="font-bold text-gray-900">{player.rating}</span>
              <span className="text-gray-500">pts</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-semibold text-gray-700">{player.recentMatches}</span>
              <span className="text-gray-500">mečeva</span>
            </div>
          </div>
        </div>

        {/* Trend - Much More Prominent */}
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-2xl border shadow-sm ${getTrendBg()}`}>
          {getTrendIcon()}
          <span className="text-lg font-bold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>
            {getTrendText()}
          </span>
        </div>
      </div>
    </div>
  );
}
