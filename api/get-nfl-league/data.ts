import type { ID } from '../../src/lib/typing-utils/id';
import { getNflLeague } from './request';
import { getIdFromRef } from '../utils';

interface GetNflLeagueDataReturnType {
  season: {
    year: number;
    weekNumber: number;
  };
  leagueGroupId: ID;
}

export const getNflLeagueData = async (): Promise<GetNflLeagueDataReturnType> => {
  const { season, group } = await getNflLeague();

  return {
    season: {
      year: season.year,
      weekNumber: season.type.week.number
    },
    leagueGroupId: getIdFromRef(group, 'groups')
  };
};
