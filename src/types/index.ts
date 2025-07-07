export interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  location: string;
}

export interface Booking {
  id: string;
  type: 'match' | 'training';
  opponent?: string;
  trainer?: string;
  venue: string;
  court: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending';
}

export interface DateOption {
  date: number;
  available: boolean;
}
