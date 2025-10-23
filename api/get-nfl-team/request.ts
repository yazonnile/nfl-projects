import type { NflAthlete } from 'src/lib/models/nfl-athlete';
import { type ID } from '../../src/lib/typing-utils/id';
import { request } from '../utils';

interface GetNflTeamProps {
  teamId: ID;
}

interface GetNflTeamReturnType {
  team: {
    id: ID;
    athletes: Array<{
      id: ID;
      teamId: ID;
      displayName: string;
      shortName: string;
      age: number;
      photo: string;
      jersey: string;
      position: {
        abbreviation: string;
      };
      experience: {
        years: number;
      };
      active: boolean;
      status: {
        type: 'practice-squad' | 'day-to-day' | 'active';
      };
      draft: {
        round: number;
        year: number;
        selection: number;
      } | null;
      injuries: Array<{
        id: ID;
        type: {
          abbreviation: 'IR' | 'O' | 'Q';
        };
        details: {
          returnDate: string;
          type:
            | 'Elbow'
            | 'Knee'
            | 'Personal'
            | 'Quadriceps'
            | 'Groin'
            | 'Back'
            | 'Hip'
            | 'Thigh'
            | 'Concussion'
            | 'Shoulder';
        };
      }>;
    }>;
  };
}

export const getNflTeam = async ({ teamId }: GetNflTeamProps): Promise<GetNflTeamReturnType> => {
  return await request(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${teamId}?enable=roster,stats`,
    `Team Info: ${teamId}`
  );
};
