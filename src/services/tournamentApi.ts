// Tournament API service with WebSocket integration
import { tennisAPI } from './api';

const API_BASE_URL = 'https://dhlxq7-3005.csb.app/api'\;
const WS_URL = "wss://dhlxq7-3005.csb.app";

// Tournament types
export interface Tournament {
  id: string;
  name: string;
  type: "tournament" | "league";
  format: "singles" | "doubles" | "mixed";
  level: "beginner" | "intermediate" | "advanced" | "pro";
  startDate: string;
  endDate: string;
  venue: string;
  venueId: string;
  entryFee: number;
  prizePool?: number;
  currentParticipants: number;
  maxParticipants: number;
  status: "upcoming" | "ongoing" | "completed";
  enrolled: boolean;
  description: string;
  image: string;
  organizer: string;
  featured?: boolean;
  participantAvatars?: string[];
  divisions?: Division[];
}

export interface Division {
  id: string;
  name: string;
  level: string;
  participants: number;
  maxParticipants: number;
}

export interface TournamentRegistration {
  tournamentId: string;
  userId: string;
  userName: string;
  divisionId?: string;
  paymentMethod: "card" | "bank" | "cash";
  amount: number;
  status: "pending" | "confirmed" | "cancelled";
  registeredAt: string;
}

export interface TournamentMatch {
  id: string;
  tournamentId: string;
  round: string;
  courtId?: string;
  player1Id: string;
  player2Id: string;
  scheduledTime?: string;
  score?: string;
  status: "scheduled" | "ongoing" | "completed";
}

// WebSocket event types for tournaments
export type TournamentWebSocketEvent = 
  | 'TOURNAMENT_UPDATED'
  | 'REGISTRATION_CONFIRMED' 
  | 'MATCH_SCHEDULED'
  | 'MATCH_UPDATED'
  | 'TOURNAMENT_STARTED';

class TournamentAPI {
  private ws: WebSocket | null = null;
  private eventListeners: Map<TournamentWebSocketEvent, Function[]> = new Map();

  constructor() {
    this.initWebSocket();
  }

  private initWebSocket() {
    try {
      this.ws = new WebSocket(WS_URL);
      
      this.ws.onopen = () => {
        console.log('🏆 Tournament WebSocket connected');
      };
      
      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleWebSocketMessage(message);
        } catch (error) {
          console.error('Error parsing tournament WebSocket message:', error);
        }
      };
      
      this.ws.onclose = () => {
        console.log('🏆 Tournament WebSocket disconnected');
        // Attempt reconnect after 5 seconds
        setTimeout(() => this.initWebSocket(), 5000);
      };
    } catch (error) {
      console.error('Failed to initialize tournament WebSocket:', error);
    }
  }

  private handleWebSocketMessage(message: any) {
    const listeners = this.eventListeners.get(message.type) || [];
    listeners.forEach(listener => {
      try {
        listener(message.data);
      } catch (error) {
        console.error(`Error in tournament event listener for ${message.type}:`, error);
      }
    });
  }

  private addEventListener(type: TournamentWebSocketEvent, callback: Function) {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, []);
    }
    this.eventListeners.get(type)!.push(callback);
  }

  // API Methods
  async getTournaments(filters?: {
    type?: string;
    level?: string;
    status?: string;
    location?: string;
    club?: string;
  }): Promise<Tournament[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') params.append(key, value);
      });
    }
    
    const response = await fetch(`${API_BASE_URL}/tournaments?${params}`);
    if (!response.ok) throw new Error('Failed to fetch tournaments');
    return response.json();
  }

  async getTournamentDetails(id: string): Promise<Tournament> {
    const response = await fetch(`${API_BASE_URL}/tournaments/${id}`);
    if (!response.ok) throw new Error('Tournament not found');
    return response.json();
  }

  async registerForTournament(registration: {
    tournamentId: string;
    userId: string;
    userName: string;
    divisionId?: string;
    paymentDetails: any;
  }): Promise<TournamentRegistration> {
    const response = await fetch(`${API_BASE_URL}/tournament-registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registration),
    });
    
    if (!response.ok) throw new Error('Registration failed');
    const result = await response.json();
    
    // Broadcast registration event
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'REGISTRATION_CONFIRMED',
        data: result
      }));
    }
    
    return result;
  }

  async cancelRegistration(registrationId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tournament-registrations/${registrationId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to cancel registration');
  }

  async getTournamentMatches(tournamentId: string): Promise<TournamentMatch[]> {
    const response = await fetch(`${API_BASE_URL}/tournaments/${tournamentId}/matches`);
    if (!response.ok) throw new Error('Failed to fetch matches');
    return response.json();
  }

  async bookCourtForMatch(matchId: string, courtId: string, timeSlotId: string): Promise<void> {
    // This integrates with the existing booking system
    const response = await fetch(`${API_BASE_URL}/tournament-matches/${matchId}/book-court`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courtId, timeSlotId }),
    });
    
    if (!response.ok) throw new Error('Failed to book court for match');
  }

  // WebSocket event listeners
  onTournamentUpdated(callback: (tournament: Tournament) => void) {
    this.addEventListener('TOURNAMENT_UPDATED', callback);
  }

  onRegistrationConfirmed(callback: (registration: TournamentRegistration) => void) {
    this.addEventListener('REGISTRATION_CONFIRMED', callback);
  }

  onMatchScheduled(callback: (match: TournamentMatch) => void) {
    this.addEventListener('MATCH_SCHEDULED', callback);
  }

  onMatchUpdated(callback: (match: TournamentMatch) => void) {
    this.addEventListener('MATCH_UPDATED', callback);
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export const tournamentAPI = new TournamentAPI();

// Hook for real-time tournament updates
export function useTournamentRealtimeUpdates() {
  return {
    onTournamentUpdated: tournamentAPI.onTournamentUpdated.bind(tournamentAPI),
    onRegistrationConfirmed: tournamentAPI.onRegistrationConfirmed.bind(tournamentAPI),
    onMatchScheduled: tournamentAPI.onMatchScheduled.bind(tournamentAPI),
    onMatchUpdated: tournamentAPI.onMatchUpdated.bind(tournamentAPI),
    isConnected: tournamentAPI.isConnected(),
  };
}

// Mock implementation for development
export const mockTournamentAPI = {
  async getTournaments(): Promise<Tournament[]> {
    // Return mock data for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "t1",
            name: "Baseline Masters Cup 2025",
            type: "tournament",
            format: "singles",
            level: "advanced",
            startDate: "2025-08-15",
            endDate: "2025-08-18",
            venue: "Baseline Tennis Club",
            venueId: "baseline-tennis",
            entryFee: 3000,
            prizePool: 50000,
            currentParticipants: 24,
            maxParticipants: 32,
            status: "upcoming",
            enrolled: false,
            description: "Prestižni turnir za napredne igrače",
            image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=400&fit=crop",
            organizer: "Baseline Academy",
            featured: true,
          },
          // Add more mock tournaments...
        ]);
      }, 500);
    });
  },

  async registerForTournament(registration: any): Promise<TournamentRegistration> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...registration,
          status: "confirmed",
          registeredAt: new Date().toISOString(),
        });
      }, 1000);
    });
  },
};
