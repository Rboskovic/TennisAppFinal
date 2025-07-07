import { Booking } from '../types';

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  // Determine label color based on type and status
  const getLabelColor = (type: string, status: string) => {
    if (type === 'match') return 'bg-blue-500';
    if (type === 'training') return 'bg-purple-500';
    if (status === 'confirmed') return 'bg-green-500';
    if (status === 'pending') return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getLabelText = () => {
    if (booking.type === 'match') return 'Meč';
    if (booking.type === 'training') return 'Trening';
    return booking.status === 'confirmed' ? 'Potvrđen' : 'Na čekanju';
  };

  const getOpponentText = () => {
    if (booking.type === 'match') {
      return `vs ${booking.opponent}`;
    }
    if (booking.type === 'training') {
      return `sa ${booking.trainer}`;
    }
    return booking.venue;
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 flex-shrink-0 w-72 shadow-lg relative">
      {/* Status Label */}
      <div className="flex justify-between items-start mb-3">
        <div className={`${getLabelColor(booking.type, booking.status)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
          {getLabelText()}
        </div>
        {booking.status === 'confirmed' && booking.type !== 'training' && (
          <div className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Potvrđen
          </div>
        )}
        {booking.status === 'pending' && (
          <div className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Na čekanju
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="space-y-2">
        <div className="text-gray-900 font-bold text-lg">
          {getOpponentText()}
        </div>
        <div className="text-gray-600 text-sm font-medium">
          {booking.date}, {booking.time}
        </div>
        <div className="text-gray-500 text-sm">
          {booking.venue} • {booking.court}
        </div>
      </div>
    </div>
  );
}
