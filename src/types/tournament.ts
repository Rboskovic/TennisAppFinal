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
}

export interface TournamentMatch {
  id: string;
  tournamentId: string;
  round: string;
  player1: string;
  player2: string;
  score?: string;
  scheduledTime?: string;
  court?: string;
  status: "scheduled" | "ongoing" | "completed";
}

export interface LeagueStanding {
  playerId: string;
  playerName: string;
  matches: number;
  wins: number;
  losses: number;
  setsWon: number;
  setsLost: number;
  points: number;
  position: number;
}
