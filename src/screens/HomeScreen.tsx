import { Star, Menu, MapPin, Zap, TrendingUp } from 'lucide-react';
import BookingCard from '../components/BookingCard';
import { currentUser, userBookings } from '../data/mockData';

export default function HomeScreen() {
  const handleTerenClick = () => {
    console.log('Pronađi Teren clicked');
    // TODO: Navigate to court booking
  };

  const handleMecClick = () => {
    console.log('Pronađi Meč clicked');
    // TODO: Navigate to match finding
  };

  return (
    <div className="h-screen relative overflow-hidden pb-20" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Import Inter Font */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/images/tennis-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center calc(50% - 60px)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-green-600/10"></div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }
        
        .wave-emoji {
          animation: wave 2s ease-in-out infinite;
          transform-origin: 70% 70%;
        }
        
        @media (max-height: 700px) {
          .bg-responsive {
            background-position: center calc(50% - 40px) !important;
          }
        }
        @media (min-height: 850px) {
          .bg-responsive {
            background-position: center calc(50% - 80px) !important;
          }
        }
      `}</style>

      <div className="relative z-10 p-6 text-white">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            {/* Profile Photo with More Space Below */}
            <img 
              src="https://randomuser.me/api/portraits/women/24.jpg"
              alt="Profile"
              className="w-12 h-12 rounded-full mb-8 shadow-lg object-cover"
            />
            <div>
              {/* Greeting with animated emoji */}
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-medium opacity-90 tracking-wide" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>Ćao,</span>
                <span className="text-4xl wave-emoji">👋</span>
              </div>
              {/* Katarina with minimal padding */}
              <div className="text-5xl font-bold leading-tight text-white tracking-tight -mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '800' }}>
                Katarina
              </div>
            </div>
          </div>
          {/* Hamburger Menu */}
          <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm" style={{ height: '48px', width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Menu className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Rating with much less padding */}
        <div className="flex items-center space-x-2 mb-6 mt-1">
          <Star className="w-4 h-4 fill-white text-white" />
          <span className="text-base font-semibold tracking-tight" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>47 rank</span>
          <TrendingUp className="w-4 h-4 text-green-400" />
        </div>

        {/* Main Action Buttons */}
        <div style={{ marginTop: '160px', marginBottom: '40px' }}>
          <div className="space-y-4">
            <button
              onClick={handleTerenClick}
              className="w-full bg-white/85 backdrop-blur-md border border-white/30 rounded-2xl p-5 shadow-2xl hover:bg-white/90 hover:shadow-3xl transition-all active:scale-98 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-gray-900 font-bold text-xl tracking-tight" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>Pronađi Teren</div>
                  <div className="text-gray-600 font-medium text-sm tracking-wide" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>Rezerviši terene u blizini</div>
                </div>
                <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={handleMecClick}
              className="w-full bg-white/85 backdrop-blur-md border border-white/30 rounded-2xl p-5 shadow-2xl hover:bg-white/90 hover:shadow-3xl transition-all active:scale-98 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-gray-900 font-bold text-xl tracking-tight" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>Pronađi Meč</div>
                  <div className="text-gray-600 font-medium text-sm tracking-wide" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>Igraj protiv drugih igrača</div>
                </div>
                <div className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Your Bookings */}
        <div style={{ marginBottom: '40px' }}>
          <h2 className="text-3xl tracking-tight drop-shadow-sm mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '700' }}>
            <span className="font-bold">Vaše</span>{' '}
            <span className="font-light" style={{ fontWeight: '300' }}>Rezervacije</span>
          </h2>
          
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {userBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
