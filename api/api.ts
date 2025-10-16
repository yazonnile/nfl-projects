import { getNflLeagueData } from './get-nfl-league/data';
import { getNflGroupsStructureData } from './get-nfl-groups-structure/data';
import { getNflTeamsData } from './get-nfl-teams/data';
import { getNflScheduleData } from './get-nfl-schedule/data';
import { getNflStandingData } from './get-nfl-standing/data';
import type { ID } from '../src/lib/typing-utils/id';
import type { NflTeam } from '../src/lib/models/nfl-team';
import type { ApiDataReturnType } from '../src/lib/typing-utils/api-data-return-type';

export const api = async (): Promise<ApiDataReturnType> => {
  return Promise.all([getNflLeagueData(), getNflGroupsStructureData(), getNflTeamsData()]).then(
    async ([nflLeagueData, nflGroupsStructureData, nflTeamsData]) => {
      const {
        season: { year, weekNumber },
        leagueGroupId
      } = nflLeagueData;
      const { nflConferences, nflDivisions } = nflGroupsStructureData;
      const { nflTeams: nflTeamsWithOutConfIdAndDivisionId } = nflTeamsData;

      // modify teams with conferenceId and divisionId
      const nflTeams = Object.values(nflTeamsWithOutConfIdAndDivisionId).reduce(
        (acc, team) => {
          for (const { teamsIds, conferenceId, id } of Object.values(nflDivisions)) {
            if (teamsIds.includes(team.id)) {
              acc[team.id] = {
                ...team,
                conferenceId,
                divisionId: id
              };

              return acc;
            }
          }

          return acc;
        },
        {} as Record<ID, NflTeam>
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
        nflConferences,
        nflDivisions,
        nflWeeks,
        nflMatches,
        nflStanding,
        weekNumber,
        year
      };
    }
  );
};
