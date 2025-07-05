export interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  location: string;
}

export interface Booking {
  id: string;
  venue: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface DateOption {
  date: number;
  available: boolean;
}
