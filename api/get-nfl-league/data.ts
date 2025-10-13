import { getNflLeague } from './request';

interface GetNflLeagueDataReturnType {
  season: {
    year: number;
    weekNumber: number;
  };
}

export const getNflLeagueData = async (): Promise<GetNflLeagueDataReturnType> => {
  const requestData = await getNflLeague();

  return {
    season: {
      year: requestData.season.year,
      weekNumber: requestData.season.type.week.number
    }
  };
};
