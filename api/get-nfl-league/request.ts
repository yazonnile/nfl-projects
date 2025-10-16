import { type Ref, request } from '../utils';

interface GetNflLeagueReturnType {
  id: string;
  name: string;
  abbreviation: string;
  season: {
    year: number;
    type: {
      week: {
        number: number;
      };
    };
  };
  group: Ref;
}

export const getNflLeague = async (): Promise<GetNflLeagueReturnType> => {
  return await request(
    'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl',
    'NFL League'
  );
};
