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
      year: number;
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
  const calendarYears = [seasonYear, seasonYear + 1];
  const seasons = await Promise.all(
    calendarYears.map(
      (year) =>
        request(
          `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=${year}`,
          `NFL Schedule ${year}`
        ) as Promise<GetNflScheduleReturnType>
    )
  );

  const events = seasons
    .flatMap((season) => season.events)
    .filter((event) => event.season.year === seasonYear);

  return { events };
};
