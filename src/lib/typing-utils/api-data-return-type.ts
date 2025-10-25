import type { NflLeaders } from '$lib/models/nfl-leaders';
import type { NflConference } from '../models/nfl-conference';
import type { NflDivision } from '../models/nfl-division';
import type { NflMatch } from '../models/nfl-match';
import type { NflStanding } from '../models/nfl-standing';
import type { NflTeam } from '../models/nfl-team';
import type { NflWeek } from '../models/nfl-week';
import type { ID } from './id';
import type { NflAthlete } from '../models/nfl-athlete';
import type { NflRookie } from '../models/nfl-rookie';

export type ApiDataReturnType = {
  nflTeams: Record<ID, NflTeam>;
  nflAthletes: Record<ID, NflAthlete>;
  nflRookies: Record<ID, NflRookie>;
  nflConferences: Record<ID, NflConference>;
  nflDivisions: Record<ID, NflDivision>;
  nflWeeks: Record<ID, NflWeek>;
  nflMatches: Record<ID, NflMatch>;
  nflStanding: Record<ID, NflStanding>;
  weekNumber: number;
  nflLeaders: Record<ID, NflLeaders>;
  year: number;
};
