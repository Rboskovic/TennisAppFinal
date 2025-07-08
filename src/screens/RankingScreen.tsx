import { ArrowLeft, Crown, Clock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RankingScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'alltime'>('weekly');
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)'
      }}
    >
      {/* Subtle geometric background patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 600" fill="none">
          {/* Circular arcs */}
          <circle cx="200" cy="400" r="150" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="200" cy="400" r="220" stroke="white" strokeWidth="0.8" fill="none" />
          <circle cx="200" cy="400" r="290" stroke="white" strokeWidth="0.6" fill="none" />
          
          {/* Connecting lines */}
          <path d="M50 350 Q200 250 350 350" stroke="white" strokeWidth="0.8" fill="none" />
          <path d="M80 380 Q200 290 320 380" stroke="white" strokeWidth="0.6" fill="none" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pt-12 pb-6">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate('/')} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-white" strokeWidth={2.5} />
          </button>
          <h1 className="text-xl font-semibold text-white flex-1 text-center mr-10">Leaderboard</h1>
        </div>

        {/* Toggle buttons */}
        <div className="mx-4 mb-6">
          <div className="bg-black/20 rounded-full p-1 flex backdrop-blur-sm">
            <button
              onClick={() => setSelectedPeriod('weekly')}
              className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all ${
                selectedPeriod === 'weekly'
                  ? 'bg-white text-gray-800 shadow-lg'
                  : 'text-white/60'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSelectedPeriod('alltime')}
              className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all ${
                selectedPeriod === 'alltime'
                  ? 'bg-white text-gray-800 shadow-lg'
                  : 'text-white/60'
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        {/* Timer badge */}
        <div className="flex justify-end mb-8 mr-4">
          <div 
            className="rounded-full px-4 py-2 flex items-center space-x-2"
            style={{ backgroundColor: 'rgba(88, 28, 135, 0.8)' }}
          >
            <Clock className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">06d 23h 00m</span>
          </div>
        </div>
      </div>

      {/* 3D Podium Section - Purple Colors & Original Size */}
      <div className="relative z-10 px-6 pb-8">
        {/* Players positioned above podium */}
        <div className="flex items-end justify-center space-x-6 mb-4">
          {/* Second Place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <div 
                className="w-16 h-16 rounded-full p-0.5"
                style={{ backgroundColor: '#F8BBD9' }}
              >
                <img 
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 text-lg">🇫🇷</div>
            </div>
            <div className="text-white font-semibold text-sm mb-2 text-center">Alena Donin</div>
            <div 
              className="rounded-full px-3 py-1 mb-3"
              style={{ backgroundColor: 'rgba(139, 92, 246, 0.8)' }}
            >
              <span className="text-white text-xs font-medium">1.449 QP</span>
            </div>
          </div>

          {/* First Place */}
          <div className="flex flex-col items-center -mt-8">
            {/* Crown */}
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
              style={{ backgroundColor: '#FCD34D' }}
            >
              <Crown className="w-6 h-6 text-white" fill="white" />
            </div>
            <div className="relative mb-3">
              <div 
                className="w-20 h-20 rounded-full p-0.5"
                style={{ backgroundColor: '#BBF7D0' }}
              >
                <img 
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
              </div>
            </div>
            <div className="text-white font-semibold text-base mb-2 text-center">Davis Curtis</div>
            <div 
              className="rounded-full px-3 py-1 mb-3"
              style={{ backgroundColor: 'rgba(139, 92, 246, 0.8)' }}
            >
              <span className="text-white text-sm font-medium">2.659 QP</span>
            </div>
          </div>

          {/* Third Place */}
          <div className="flex flex-col items-center mt-4">
            <div className="relative mb-3">
              <div 
                className="w-16 h-16 rounded-full p-0.5"
                style={{ backgroundColor: '#BFDBFE' }}
              >
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 text-lg">🇨🇦</div>
            </div>
            <div className="text-white font-semibold text-sm mb-2 text-center">Craig Gouse</div>
            <div 
              className="rounded-full px-3 py-1 mb-3"
              style={{ backgroundColor: 'rgba(139, 92, 246, 0.8)' }}
            >
              <span className="text-white text-xs font-medium">1.053 QP</span>
            </div>
          </div>
        </div>

        {/* 3D Podium Blocks - Purple Colors & Original Size */}
        <div className="flex items-end justify-center space-x-6 relative">
          {/* 2nd Place Podium */}
          <div 
            className="w-20 h-16 flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 50%, #7C3AED 100%)',
              transform: 'perspective(600px) rotateX(25deg) rotateY(-15deg)',
              transformOrigin: 'center bottom',
              borderRadius: '8px 8px 0 0',
              boxShadow: `
                inset 0 4px 8px rgba(255,255,255,0.2),
                inset -4px 0 8px rgba(0,0,0,0.1),
                0 8px 20px rgba(0,0,0,0.3)
              `
            }}
          >
            <span className="text-white font-black text-3xl transform rotate-y-15" style={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)' 
            }}>2</span>
          </div>

          {/* 1st Place Podium - Tallest */}
          <div 
            className="w-20 h-24 flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(135deg, #C4B5FD 0%, #A78BFA 50%, #8B5CF6 100%)',
              transform: 'perspective(600px) rotateX(25deg)',
              transformOrigin: 'center bottom',
              borderRadius: '8px 8px 0 0',
              boxShadow: `
                inset 0 6px 12px rgba(255,255,255,0.3),
                0 12px 30px rgba(0,0,0,0.4)
              `
            }}
          >
            <span className="text-white font-black text-4xl" style={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)' 
            }}>1</span>
          </div>

          {/* 3rd Place Podium */}
          <div 
            className="w-20 h-12 flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
              transform: 'perspective(600px) rotateX(25deg) rotateY(15deg)',
              transformOrigin: 'center bottom',
              borderRadius: '8px 8px 0 0',
              boxShadow: `
                inset 0 3px 6px rgba(255,255,255,0.15),
                inset 4px 0 8px rgba(0,0,0,0.1),
                0 6px 15px rgba(0,0,0,0.25)
              `
            }}
          >
            <span className="text-white font-black text-2xl transform -rotate-y-15" style={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)' 
            }}>3</span>
          </div>
        </div>
      </div>

      {/* White bottom section - starts exactly after podium */}
      <div className="relative z-10 bg-white rounded-t-3xl px-6 py-6 mt-8 min-h-96">
        <div className="space-y-3">
          <div className="flex items-center py-3">
            <div 
              className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: '#DDD6FE' }}
            >
              <img 
                src="https://randomuser.me/api/portraits/women/24.jpg"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-lg">Madeline Gomez</div>
            </div>
            <div className="text-gray-600 font-medium">945 QP</div>
          </div>

          <div className="flex items-center py-3">
            <div 
              className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: '#FED7AA' }}
            >
              <img 
                src="https://randomuser.me/api/portraits/men/18.jpg"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-lg">Robert Adams</div>
            </div>
            <div className="text-gray-600 font-medium">803 QP</div>
          </div>

          <div className="flex items-center py-3">
            <div 
              className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: '#BFDBFE' }}
            >
              <img 
                src="https://randomuser.me/api/portraits/women/15.jpg"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-lg">Sarah Wilson</div>
            </div>
            <div className="text-gray-600 font-medium">756 QP</div>
          </div>

          <div className="flex items-center py-3">
            <div 
              className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: '#BBF7D0' }}
            >
              <img 
                src="https://randomuser.me/api/portraits/men/25.jpg"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-lg">Michael Brown</div>
            </div>
            <div className="text-gray-600 font-medium">698 QP</div>
          </div>

          <div className="flex items-center py-3">
            <div 
              className="w-12 h-12 rounded-full mr-4 flex items-center justify-center"
              style={{ backgroundColor: '#FBCFE8' }}
            >
              <img 
                src="https://randomuser.me/api/portraits/women/28.jpg"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-lg">Emma Davis</div>
            </div>
            <div className="text-gray-600 font-medium">645 QP</div>
          </div>
        </div>
      </div>
    </div>
  );
}
