import type { NflConference } from '../models/nfl-conference';
import type { NflDivision } from '../models/nfl-division';
import type { NflMatch } from '../models/nfl-match';
import type { NflStanding } from '../models/nfl-standing';
import type { NflTeam } from '../models/nfl-team';
import type { NflWeek } from '../models/nfl-week';
import type { ID } from './id';

export type ApiDataReturnType = {
  nflTeams: Record<ID, NflTeam>;
  nflConferences: Record<ID, NflConference>;
  nflDivisions: Record<ID, NflDivision>;
  nflWeeks: Record<ID, NflWeek>;
  nflMatches: Record<ID, NflMatch>;
  nflStanding: Record<ID, NflStanding>;
  weekNumber: number;
  year: number;
};
