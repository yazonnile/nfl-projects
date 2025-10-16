import type { ID } from '../../src/lib/typing-utils/id';
import { type Ref, request } from '../utils';

interface GetNflStandingProps {
  seasonYear: number;
  leagueGroupId: ID;
}

interface GetNflStandingReturnType {
  standings: Array<{
    team: Ref;
    records: [
      {
        name: string;
        value: number;
        stats: Array<
          | {
              name: 'wins';
              value: number;
            }
          | {
              name: 'ties';
              value: number;
            }
          | {
              name: 'losses';
              value: number;
            }
          | {
              name: 'pointsFor';
              value: number;
            }
          | {
              name: 'pointsAgainst';
              value: number;
            }
          | {
              name: 'playoffSeed';
              value: number;
            }
          | {
              name: 'streak';
              value: number;
            }
        >;
      }
    ];
  }>;
}

export const getNflStanding = async ({
  seasonYear,
  leagueGroupId
}: GetNflStandingProps): Promise<GetNflStandingReturnType> => {
  return await request(
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${seasonYear}/types/2/groups/${leagueGroupId}/standings/0?lang=en&region=us`,
    'NFL Standing'
  );
};
