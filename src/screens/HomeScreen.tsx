import { Star, Settings } from 'lucide-react';
import BookingCard from '../components/BookingCard';
import DatePicker from '../components/DatePicker';
import { currentUser, userBookings, availableDates } from '../data/mockData';

export default function HomeScreen() {
  const handleDateSelect = (date: number) => {
    console.log('Selected date:', date);
  };

  return (
    <div className="h-screen relative overflow-hidden">
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
            {/* Fixed profile picture with reliable placeholder */}
            <div className="w-12 h-12 rounded-full mb-3 shadow-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">K</span>
            </div>
            <div className="space-y-0">
              {/* Lighter font weights for modern look */}
              <div className="text-xl font-medium opacity-90 tracking-wide">Dobar dan, 👋</div>
              {/* Thinner name font */}
              <div className="text-4xl font-bold leading-tight text-white tracking-tight">Katarina</div>
            </div>
          </div>
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <Settings className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Rating - lighter typography */}
        <div className="flex items-center space-x-2 mb-6">
          <Star className="w-4 h-4 fill-white text-white" />
          {/* Lighter rating font */}
          <span className="text-base font-semibold tracking-tight">8.5</span>
          <span className="text-sm font-normal opacity-90 tracking-wide">Tennis Camp, Kyiv</span>
        </div>

        {/* Your Bookings - modern typography */}
        <div style={{ marginTop: '120px', marginBottom: '60px' }}>
          {/* Lighter font weights */}
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

        {/* Reserve your Tennis Court - lighter typography */}
        <div style={{ marginTop: '40px', marginBottom: '24px' }}>
          <h2 className="text-white text-2xl font-light mb-0 tracking-tight leading-tight drop-shadow-sm">Rezervišite vaš</h2>
          <h2 className="text-white text-2xl font-semibold tracking-tight leading-tight drop-shadow-sm">Teniski teren</h2>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-t-3xl p-6 -mx-6 shadow-2xl">
          <DatePicker dates={availableDates} onDateSelect={handleDateSelect} />
          
          <button className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-3 shadow-xl hover:bg-gray-900 transition-all tracking-tight">
            <span className="text-xl">🎾</span>
            <span>Rezerviši sada</span>
          </button>
        </div>
      </div>
    </div>
  );
}
