import { request } from '../utils';

interface GetNflGroupsStructureReturnType {
  groups: Array<{
    name: string;
    abbreviation: string;
    children: Array<{
      name: string;
      abbreviation: string;
      teams: Array<{
        id: string;
      }>;
    }>;
  }>;
}

export const getNflGroupsStructure = async (): Promise<GetNflGroupsStructureReturnType> => {
  return await request(
    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/groups',
    'NFL Groups Structure'
  );
};
