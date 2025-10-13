interface GetNflGroupsStructureReturnType {
	groups: Array<{
		name: string;
		abbreviation: string;
		children: Array<{
			name: string;
			abbreviation: string;
			teams: Array<{
				id: string;
			}>
		}>
	}>
}

export const getNflGroupsStructure = async (): Promise<GetNflGroupsStructureReturnType> => {
	const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/groups');

	return (await response.json());
}
