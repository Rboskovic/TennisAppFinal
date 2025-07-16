import { Booking } from "../types";

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
  const getLabelColor = (type: string, status: string) => {
    if (type === "match") return "bg-blue-500";
    if (type === "training") return "bg-purple-500";
    if (status === "confirmed") return "bg-emerald-600";
    if (status === "pending") return "bg-yellow-600";
    return "bg-gray-500";
  };

  const getLabelText = () => {
    if (booking.type === "match") return "Meč";
    if (booking.type === "training") return "Trening";
    return booking.status === "confirmed" ? "Potvrđen" : "Na čekanju";
  };

  const getOpponentText = () => {
    if (booking.type === "match") {
      return `vs ${booking.opponent}`;
    }
    if (booking.type === "training") {
      return `sa ${booking.trainer}`;
    }
    return booking.venue;
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 flex-shrink-0 w-72 shadow-lg relative">
      <div className="flex justify-between items-start mb-1.5">
        <div
          className={`${getLabelColor(
            booking.type,
            booking.status
          )} text-white text-xs font-semibold px-3 py-1 rounded-full`}
        >
          {getLabelText()}
        </div>
        {booking.status === "confirmed" && booking.type !== "training" && (
          <div className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Potvrđen
          </div>
        )}
        {booking.status === "pending" && (
          <div className="bg-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Na čekanju
          </div>
        )}
      </div>

      <div className="space-y-0.25">
        <div className="text-gray-900 font-semibold text-lg">
          {getOpponentText()}
        </div>
        <div className="text-gray-600 text-sm font-tight">
          {booking.date}, {booking.time}
        </div>
        <div className="text-gray-500 text-sm leading-tight">
          {booking.venue} • {booking.court}
        </div>
      </div>
    </div>
  );
}
