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
