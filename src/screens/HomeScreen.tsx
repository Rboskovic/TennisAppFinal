import { Star, Settings, Plus } from 'lucide-react';
import { useState } from 'react';
import BookingCard from '../components/BookingCard';
import { currentUser, userBookings } from '../data/mockData';

export default function HomeScreen() {
  const [showFabModal, setShowFabModal] = useState(false);

  return (
    <div className="h-screen relative overflow-hidden pb-20">
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
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-full mb-3 shadow-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">K</span>
            </div>
            <div className="space-y-0">
              <div className="text-xl font-medium opacity-90 tracking-wide">Dobar dan, 👋</div>
              <div className="text-4xl font-bold leading-tight text-white tracking-tight">Katarina</div>
            </div>
          </div>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <Settings className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-6">
          <Star className="w-4 h-4 fill-white text-white" />
          <span className="text-base font-semibold tracking-tight">8.5</span>
          <span className="text-sm font-normal opacity-90 tracking-wide">Tennis Camp, Kyiv</span>
        </div>

        {/* Your Bookings */}
        <div style={{ marginTop: '120px', marginBottom: '60px' }}>
          <h2 className="text-3xl tracking-tight drop-shadow-sm mb-6">
            <span className="font-bold">Vaše</span>{' '}
            <span className="font-light">Rezervacije</span>
          </h2>
          
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {userBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      </div>

      {/* FAB - Professional Design */}
      <button
        onClick={() => setShowFabModal(true)}
        className="fixed bottom-28 right-6 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-gray-50 transition-all active:scale-95 border border-gray-100"
      >
        <Plus className="w-8 h-8 text-blue-600" />
      </button>

      {/* FAB Modal */}
      {showFabModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Izaberite opciju</h3>
            
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3 hover:bg-blue-700 transition-all">
                <span className="text-xl">🏟️</span>
                <span>Pronađi Teren</span>
              </button>
              
              <button className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3 hover:bg-green-700 transition-all">
                <span className="text-xl">⚔️</span>
                <span>Pronađi Meč</span>
              </button>
            </div>

            <button
              onClick={() => setShowFabModal(false)}
              className="w-full mt-4 py-3 text-gray-500 font-medium"
            >
              Otkaži
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
