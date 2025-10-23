import type { NflAthlete } from 'src/lib/models/nfl-athlete';
import { type ID } from '../../src/lib/typing-utils/id';
import { request } from '../utils';

interface GetNflTeamProps {
  teamId: ID;
}

interface GetNflTeamReturnType {
  team: {
    id: ID;
    athletes: Array<
      Pick<NflAthlete, 'id' | 'teamId' | 'displayName' | 'shortName' | 'age' | 'jersey'> & {
        headshot?: {
          href: string;
        };
        position: {
          abbreviation: string;
        };
        experience: {
          years: number;
        };
        status: {
          type: NflAthlete['status'];
        };
        draft: {
          round: number;
          year: number;
          selection: number;
        } | null;
        injuries: Array<{
          type: {
            abbreviation: NflAthlete['injuries'][number]['statusType'];
          };
          details: {
            returnDate: string;
            type: NflAthlete['injuries'][number]['type'];
          };
        }>;
      }
    >;
  };
}

export const getNflTeam = async ({ teamId }: GetNflTeamProps): Promise<GetNflTeamReturnType> => {
  return await request(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}?enable=roster,stats`,
    `Team Info: ${teamId}`
  );
};
