import { Booking } from '../types';

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 flex-shrink-0 w-72 shadow-lg">
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
        <div>
          <div className="text-gray-900 font-bold text-lg">{booking.venue}</div>
          <div className="text-gray-600 text-sm font-medium">{booking.date}, {booking.time}</div>
        </div>
      </div>
    </div>
  );
}
