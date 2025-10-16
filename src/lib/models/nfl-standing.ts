import type { ID } from '../typing-utils/id';

export interface NflStanding {
  teamId: ID;
  wins: number;
  ties: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  playoffSeed: number;
  streak: number;
  winPercentage: number;
  overallSeed: number;
}
