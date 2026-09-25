import { request, type Ref } from '../utils';
import type { NflLeaders } from '../../src/lib/models/nfl-leaders';

interface GetNflLeadersReturnType {
  categories: Array<{
    name: NflLeaders['category'];
    shortDisplayName: NflLeaders['shortDisplayName'];
    displayName: NflLeaders['displayName'];
    leaders: Array<{
      value: number;
      athlete: Ref;
    }>;
  }>;
}

interface GetNflLeadersProps {
  seasonYear: number;
}

export const getNflLeaders = async ({
  seasonYear
}: GetNflLeadersProps): Promise<GetNflLeadersReturnType> => {
  return await request(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${seasonYear}/types/2/leaders`,
    `Leaders Info`
  );
};
