import { getNflSchedule } from './request';
import { type ID } from '../../src/lib/typing-utils/id';
import { type NflWeek } from '../../src/lib/models/nfl-week';
import { type NflMatch } from '../../src/lib/models/nfl-match';

interface GetNflScheduleDataProps {
  seasonYear: number;
}

interface GetNflScheduleDataReturnType {
  nflWeeks: Record<ID, NflWeek>;
  nflMatches: Record<ID, NflMatch>;
}

export const getNflScheduleData = async ({
  seasonYear
}: GetNflScheduleDataProps): Promise<GetNflScheduleDataReturnType> => {
  const nflWeeks: Record<ID, NflWeek> = {};
  const nflMatches: Record<ID, NflMatch> = {};

  const { events } = await getNflSchedule({ seasonYear });

  for (const {
    id: matchId,
    date,
    week,
    competitions: [competition]
  } of events) {
    const weekId = week.number.toString();

    if (!nflWeeks[weekId]) {
      nflWeeks[weekId] = {
        id: weekId,
        date,
        number: week.number,
        matches: []
      };
    }

    const [homeCompetitor, awayCompetitor] = competition.competitors.map((competitor) => {
      return {
        matchId,
        id: competitor.id,
        homeAway: competitor.homeAway,
        winner: competitor.winner,
        score: competitor.score,
        record: competitor.records?.[0].summary || null,
        teamId: competitor.team.id,
        linescores: competitor.linescores?.map((line) => line.value) || null
      };
    });

    const match: NflMatch = {
      id: matchId,
      weekId,
      competitors: {
        home: homeCompetitor!,
        away: awayCompetitor!
      }
    };

    nflWeeks[weekId].matches.push(matchId);
    nflMatches[matchId] = match;
  }

  return {
    nflWeeks,
    nflMatches
  };
};
