import { request } from '../utils';

interface GetNflTeamsReturnType {
  sports: [
    {
      leagues: [
        {
          teams: Array<{
            team: {
              id: string;
              slug: string;
              name: string;
              abbreviation: string;
              displayName: string;
              alternateColor: string;
              color: string;
              logos: Array<{
                href: string;
                width: number;
                height: number;
                rel: ['full', 'default' | 'dark'];
              }>;
            };
          }>;
        }
      ];
    }
  ];
}

export const getNflTeams = async (): Promise<GetNflTeamsReturnType> => {
  return await request(
    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams',
    'NFL Teams'
  );
};
