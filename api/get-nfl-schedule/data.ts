import { getNflSchedule } from './request';
import { type ID } from '../../src/lib/typing-utils/id';
import { type NflWeek } from '../../src/lib/models/nfl-week';
import { type NflMatch } from '../../src/lib/models/nfl-match';

interface GetNflScheduleDataProps {
  seasonYear: number;
  allTeams: Array<ID>;
}

interface GetNflScheduleDataReturnType {
  nflWeeks: Record<ID, NflWeek>;
  nflMatches: Record<ID, NflMatch>;
}

export const getNflScheduleData = async ({
  seasonYear,
  allTeams
}: GetNflScheduleDataProps): Promise<GetNflScheduleDataReturnType> => {
  const nflWeeks: Record<ID, NflWeek> = {};
  const nflMatches: Record<ID, NflMatch> = {};

  const { events } = await getNflSchedule({ seasonYear });

  for (const {
    id: matchId,
    date,
    week,
    competitions: [competition],
    season: { type: seasonType },
    status: {
      type: { completed }
    }
  } of events) {
    if (seasonType !== 2) {
      // only regular season is supported
      continue;
    }

    const weekId = week.number.toString();

    if (!nflWeeks[weekId]) {
      nflWeeks[weekId] = {
        id: weekId,
        number: week.number,
        matches: [],
        teamsOnBye: []
      };
    }

    const [homeCompetitor, awayCompetitor] = competition.competitors.map((competitor) => {
      return {
        matchId,
        id: competitor.id,
        homeAway: competitor.homeAway,
        winner: competitor.winner,
        score: completed ? Number(competitor.score) : null,
        record: competitor.records?.[0].summary || null,
        teamId: competitor.team.id,
        linescores: competitor.linescores?.map((line) => line.value) || null
      };
    });

    const match: NflMatch = {
      id: matchId,
      weekId,
      date,
      competitors: {
        home: homeCompetitor!,
        away: awayCompetitor!
      }
    };

    nflWeeks[weekId].matches.push(matchId);
    nflMatches[matchId] = match;
  }

  // need to go week by week and add teamsOnBye to each week
  for (const week of Object.values(nflWeeks)) {
    const teamsOnBye = new Set(allTeams);

    for (const matchId of week.matches) {
      const {
        competitors: {
          home: { teamId: homeTeamId },
          away: { teamId: awayTeamId }
        }
      } = nflMatches[matchId]!;
      teamsOnBye.delete(homeTeamId);
      teamsOnBye.delete(awayTeamId);
    }

    week.teamsOnBye = [...teamsOnBye];
  }

  return {
    nflWeeks,
    nflMatches
  };
};
