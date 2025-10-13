interface GetNflTeamsReturnType {
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
            alternateColor: string;
            color: string;
            logos: Array<{
              href: string;
              width: number;
              height: number;
              rel: ['full', 'default' | 'dark'];
            }>;
          }>;
        }
      ];
    }
  ];
}

export const getNflTeams = async (): Promise<GetNflTeamsReturnType> => {
  const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams');

  return await response.json();
};
