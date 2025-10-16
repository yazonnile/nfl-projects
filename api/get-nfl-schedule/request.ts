import { request } from '../utils';

interface GetNflScheduleProps {
  seasonYear: number;
}

interface Competitor<HomeAway> {
  id: string;
  homeAway: HomeAway;
  winner: boolean;
  score: string;
  records?: [
    {
      summary: string;
    }
  ];
  team: {
    id: string;
  };
  linescores?: [
    {
      value: number;
      period: 1;
    },
    {
      value: number;
      period: 2;
    },
    {
      value: number;
      period: 3;
    },
    {
      value: number;
      period: 4;
    }
  ];
}

// interface Leader<Name, DisplayName, ShortDisplayName> {
//   name: Name;
//   displayName: DisplayName;
//   shortDisplayName: ShortDisplayName;
//   leaders: [
//     {
//       displayValue: string;
//       value: number;
//       athlete: {
//         id: string;
//         fullName: string;
//         displayName: string;
//         shortName: string;
//       };
//       team: {
//         id: string;
//       };
//     }
//   ];
// }

interface GetNflScheduleReturnType {
  events: Array<{
    id: string;
    date: string;
    week: {
      number: number;
    };
    competitions: [
      {
        competitors: [Competitor<'home'>, Competitor<'away'>];
      }
    ];
    season: {
      type: number;
    };
    status: {
      type: {
        completed: boolean;
      };
    };
    // leaders: [
    //   Leader<'passingYards', 'Passing Leader', 'PASS'>,
    //   Leader<'rushingYards', 'Rushing Leader', 'RUSH'>,
    //   Leader<'receivingYards', 'Receiving Leader', 'REC'>
    // ];
  }>;
}

export const getNflSchedule = async ({
  seasonYear
}: GetNflScheduleProps): Promise<GetNflScheduleReturnType> => {
  const startDate = `${seasonYear}0901`;
  const endDate = `${seasonYear + 1}0228`;
  return await request(
    `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=${startDate}-${endDate}`,
    'NFL Schedule'
  );
};
