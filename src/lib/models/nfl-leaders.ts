import type { ID } from '../typing-utils/id';

export interface NflLeaders {
  category:
    | 'passingYards'
    | 'rushingYards'
    | 'receivingYards'
    // | 'totalTackles'
    | 'sacks'
    | 'interceptions'
    | 'passingTouchdowns'
    | 'quarterbackRating'
    | 'rushingTouchdowns'
    | 'receptions'
    | 'receivingTouchdowns'
    | 'totalPoints'
    | 'totalTouchdowns';
  shortDisplayName: string;
  displayName: string;
  leaders: Array<{
    value: number;
    athleteId: ID;
  }>;
}
