import { User, Booking, DateOption } from "../types";

export const currentUser: User = {
  id: "1",
  name: "Katarina",
  avatar: "/api/placeholder/60/60",
  rating: 47,
  location: "Tennis Camp, Kyiv",
};

export const userBookings: Booking[] = [
  {
    id: "1",
    type: "match",
    opponent: "Boško Simović",
    venue: "Baseline",
    court: "Teren broj 1",
    date: "Danas",
    time: "2:00 PM",
    status: "confirmed",
  },
  {
    id: "2",
    type: "training",
    trainer: "Zoran Bučan",
    venue: "Baseline", 
    court: "Teren broj 3",
    date: "Sutra",
    time: "10:00 AM",
    status: "pending",
  },
];

export const availableDates: DateOption[] = [
  { date: 11, available: true },
  { date: 12, available: true },
  { date: 13, available: true },
  { date: 14, available: true },
  { date: 15, available: true },
];
