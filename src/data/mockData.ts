import { User, Booking, DateOption } from "../types";

export const currentUser: User = {
  id: "1",
  name: "Emy Wilson",
  avatar: "/api/placeholder/60/60",
  rating: 8.5,
  location: "Tennis Camp, Kyiv",
};

export const userBookings: Booking[] = [
  {
    id: "1",
    venue: "Baseline",
    date: "Sub 21 Oct",
    time: "14:00-16:00",
    status: "potvrđeno",
  },
  {
    id: "2",
    venue: "IT Tennis League",
    date: "Sat 21 Oct",
    time: "14:00-",
    status: "potvrđeno",
  },
];

export const availableDates: DateOption[] = [
  { date: 11, available: true },
  { date: 12, available: true },
  { date: 13, available: true },
  { date: 14, available: true },
  { date: 15, available: true },
];
