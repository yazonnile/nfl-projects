interface GetNflLeagueDataReturnType {
	id: string;
	name: string;
	abbreviation: string;
	season: {
		year: number;
		type: {
			week: {
				number: number;
			}
		}
	}
}

export const getNflLeagueData = async (): Promise<GetNflLeagueDataReturnType> => {
	const response = await fetch('https://sports.core.api.espn.com/v2/sports/football/leagues/nfl');

	return (await response.json());
}
