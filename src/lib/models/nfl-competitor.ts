import { type ID } from '../typing-utils/id';

export interface NflCompetitor {
  id: ID;
  matchId: ID;
  winner: boolean;
  homeAway: 'home' | 'away';
  score: string;
  record: string | null;
  teamId: ID;
  linescores: Array<number> | null;
}
