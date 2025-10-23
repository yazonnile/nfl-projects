import { getNflLeagueData } from './get-nfl-league/data';
import { getNflGroupsStructureData } from './get-nfl-groups-structure/data';
import { getNflTeamsData } from './get-nfl-teams/data';
import { getNflScheduleData } from './get-nfl-schedule/data';
import { getNflStandingData } from './get-nfl-standing/data';
import type { ID } from '../src/lib/typing-utils/id';
import type { NflTeam } from '../src/lib/models/nfl-team';
import type { ApiDataReturnType } from '../src/lib/typing-utils/api-data-return-type';
import { getNflTeamData } from './get-nfl-team/data';
import type { NflAthlete } from 'src/lib/models/nfl-athlete';
import type { NflRookie } from 'src/lib/models/nfl-rookie';
import { getNflLeadersData } from './get-nfl-leaders/data';

export const api = async (): Promise<ApiDataReturnType> => {
  return Promise.all([
    getNflLeagueData(),
    getNflGroupsStructureData(),
    getNflTeamsData(),
    getNflLeadersData()
  ]).then(async ([nflLeagueData, nflGroupsStructureData, nflTeamsData, nflLeadersData]) => {
    const {
      season: { year, weekNumber },
      leagueGroupId
    } = nflLeagueData;
    const { nflConferences, nflDivisions } = nflGroupsStructureData;
    const { nflTeams: nflTeamsWithOutConfIdAndDivisionId } = nflTeamsData;
    const { nflLeaders } = nflLeadersData;
    const nflAthletes: Record<ID, NflAthlete> = {};
    const nflRookies: Record<ID, NflRookie> = {};
    // modify teams with conferenceId,divisionId,roster
    const nflTeams = Object.values(nflTeamsWithOutConfIdAndDivisionId).reduce(
      (acc, team) => {
        for (const { teamsIds, conferenceId, id } of Object.values(nflDivisions)) {
          if (teamsIds.includes(team.id)) {
            acc[team.id] = {
              ...team,
              conferenceId,
              divisionId: id,
              roster: []
            };

            return acc;
          }
        }

        return acc;
      },
      {} as Record<ID, NflTeam>
    );

    await Promise.all(
      Object.values(nflTeams).map(async (team) => {
        const { athletes, rookies } = await getNflTeamData({ teamId: team.id });

        Object.assign(nflAthletes, athletes);
        Object.assign(nflRookies, rookies);
        team.roster = Object.keys(athletes);
      })
    );

    const { nflStanding } = await getNflStandingData({
      seasonYear: year,
      leagueGroupId
    });

    const { nflWeeks, nflMatches } = await getNflScheduleData({
      seasonYear: year,
      allTeams: Object.keys(nflTeams)
    });

    return {
      nflTeams,
      nflAthletes,
      nflRookies,
      nflConferences,
      nflDivisions,
      nflWeeks,
      nflMatches,
      nflStanding,
      nflLeaders,
      weekNumber,
      year
    };
  });
};
