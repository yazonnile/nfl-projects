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
}

export const getNflLeague = async (): Promise<GetNflLeagueReturnType> => {
  const response = await fetch('https://sports.core.api.espn.com/v2/sports/football/leagues/nfl');

  return await response.json();
};
