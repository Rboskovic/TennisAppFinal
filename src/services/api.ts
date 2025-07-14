// Shared API client for Tennis Apps
const API_BASE_URL = 'https://c33m2h-3001.csb.app/api';
const WS_URL = 'wss://c33m2h-3001.csb.app';

// Types for API responses
export interface TimeSlot {
  id: string;
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  available: boolean;
  bookedBy?: string;
  clubId: string;
  updatedAt?: string;
}

export interface Court {
  id: string;
  name: string;
  type: 'indoor' | 'outdoor';
  surface: 'clay' | 'hard' | 'grass';
  hourlyRate: number;
  status: 'active' | 'maintenance' | 'closed';
  clubId: string;
}

export interface Booking {
  id: string;
  slotId: string;
  courtId: string;
  userId: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

// WebSocket event types
export type WebSocketEventType = 
  | 'SLOT_UPDATED' 
  | 'BOOKING_CREATED' 
  | 'BOOKING_CANCELLED';

export interface WebSocketMessage {
  type: WebSocketEventType;
  data: any;
  timestamp: string;
}

class TennisAPI {
  private ws: WebSocket | null = null;
  private eventListeners: Map<WebSocketEventType, Function[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor() {
    this.initWebSocket();
  }

  private initWebSocket() {
    try {
      this.ws = new WebSocket(WS_URL);
      
      this.ws.onopen = () => {
        console.log('🔌 WebSocket connected - Real-time updates enabled');
        this.reconnectAttempts = 0;
      };
      
      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleWebSocketMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      this.ws.onclose = () => {
        console.log('🔌 WebSocket disconnected');
        this.attemptReconnect();
      };
      
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000;
      
      console.log(`🔄 Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);
      
      setTimeout(() => {
        this.initWebSocket();
      }, delay);
    } else {
      console.error('❌ Max reconnection attempts reached');
    }
  }

  private handleWebSocketMessage(message: WebSocketMessage) {
    const listeners = this.eventListeners.get(message.type) || [];
    listeners.forEach(listener => {
      try {
        listener(message.data);
      } catch (error) {
        console.error(`Error in event listener for ${message.type}:`, error);
      }
    });
  }

  onSlotUpdated(callback: (data: { slot: TimeSlot; courtId: string; date: string }) => void) {
    this.addEventListener('SLOT_UPDATED', callback);
  }

  onBookingCreated(callback: (data: { booking: Booking; slot: TimeSlot }) => void) {
    this.addEventListener('BOOKING_CREATED', callback);
  }

  onBookingCancelled(callback: (data: { bookingId: string; slot: TimeSlot }) => void) {
    this.addEventListener('BOOKING_CANCELLED', callback);
  }

  private addEventListener(type: WebSocketEventType, callback: Function) {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, []);
    }
    this.eventListeners.get(type)!.push(callback);
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async getCourts(): Promise<Court[]> {
    return this.makeRequest<Court[]>('/courts');
  }

  async getAvailability(clubId: string, date: string): Promise<TimeSlot[]> {
    return this.makeRequest<TimeSlot[]>(`/availability/${clubId}/${date}`);
  }

  async getTimeSlots(courtId: string, date: string): Promise<TimeSlot[]> {
    return this.makeRequest<TimeSlot[]>(`/timeslots/${courtId}/${date}`);
  }

  async updateTimeSlot(slotId: string, updates: { available?: boolean; price?: number }): Promise<TimeSlot> {
    return this.makeRequest<TimeSlot>(`/timeslots/${slotId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async createBooking(slotId: string, userId: string, userName: string): Promise<Booking> {
    return this.makeRequest<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify({ slotId, userId, userName }),
    });
  }

  async getClubBookings(clubId: string, date?: string): Promise<Booking[]> {
    const params = date ? `?date=${date}` : '';
    return this.makeRequest<Booking[]>(`/bookings/club/${clubId}${params}`);
  }

  async cancelBooking(bookingId: string): Promise<void> {
    return this.makeRequest<void>(`/bookings/${bookingId}`, {
      method: 'DELETE',
    });
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export const tennisAPI = new TennisAPI();

export function useRealtimeUpdates() {
  return {
    onSlotUpdated: tennisAPI.onSlotUpdated.bind(tennisAPI),
    onBookingCreated: tennisAPI.onBookingCreated.bind(tennisAPI),
    onBookingCancelled: tennisAPI.onBookingCancelled.bind(tennisAPI),
    isConnected: tennisAPI.isConnected(),
  };
}
