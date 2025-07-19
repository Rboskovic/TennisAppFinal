import { Booking } from "../types";

interface BookingCardProps {
  booking: Booking;
  className?: string;
  compact?: boolean;
}

export default function BookingCard({
  booking,
  className = "",
  compact = false,
}: BookingCardProps) {
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

  if (compact) {
    return (
      <div
        className={`bg-white/95 backdrop-blur-sm rounded-xl p-3.5 shadow-md hover:shadow-lg transition-all duration-200 ${className}`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div
            className={`${getLabelColor(
              booking.type,
              booking.status
            )} text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full`}
          >
            {getLabelText()}
          </div>
          {booking.status === "confirmed" && (
            <span className="text-[11px] text-emerald-600 font-semibold">
              Potvrđen
            </span>
          )}
        </div>

        <div className="space-y-0.5">
          <div className="text-gray-900 font-semibold text-base leading-tight">
            {getOpponentText()}
          </div>
          <div className="text-gray-600 text-xs">
            {booking.date}, {booking.time}
          </div>
          <div className="text-gray-500 text-xs">
            {booking.venue} • {booking.court}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 ${className}`}
    >
      <div className="flex justify-between items-start mb-2">
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

      <div className="space-y-1">
        <div className="text-gray-900 font-semibold text-lg">
          {getOpponentText()}
        </div>
        <div className="text-gray-600 text-sm">
          {booking.date}, {booking.time}
        </div>
        <div className="text-gray-500 text-sm">
          {booking.venue} • {booking.court}
        </div>
      </div>
    </div>
  );
}
