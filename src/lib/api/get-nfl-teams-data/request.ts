interface GetNflTeamsDataReturnType {
	sports: [
		{
			leagues: [
				{
					teams: Array<{
						id: string;
						slug: string;
						name: string;
						abbreviation: string;
						displayName: string;
						shortDisplayName: string;
						alternateColor: string;
						color: string;
						logos: Array<{
							href: string;
							width: number;
							height: number;
							rel: [
								'full',
								| 'default'
								| 'dark'
							];
						}>;
					}>
				}
			],
		}
	];
}

export const getNflTeamsData = async (): Promise<GetNflTeamsDataReturnType> => {
	const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams');

	return (await response.json());
}
