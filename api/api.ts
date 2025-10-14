import { getNflLeagueData } from './get-nfl-league/data';
import { getNflGroupsStructureData } from './get-nfl-groups-structure/data';
import { getNflTeamsData } from './get-nfl-teams/data';
import { getNflScheduleData } from './get-nfl-schedule/data';
import type { ID } from '$typing-utils/id';
import type { NflTeam } from '$models/nfl-team';

await Promise.all([getNflLeagueData(), getNflGroupsStructureData(), getNflTeamsData()]).then(
  async ([nflLeagueData, nflGroupsStructureData, nflTeamsData]) => {
    const {
      season: { year, weekNumber }
    } = nflLeagueData;
    const { nflConferences, nflDivisions } = nflGroupsStructureData;
    const { nflTeams: nflTeamsWithOutConfIdAndDivisionId } = nflTeamsData;
    const { nflWeeks, nflMatches } = await getNflScheduleData({ seasonYear: year });

    // modify teams with conferenceId and divisionId
    const nflTeams = Object.values(nflTeamsWithOutConfIdAndDivisionId).reduce(
      (acc, team) => {
        debugger;
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

    return {
      nflTeams,
      nflConferences,
      nflDivisions,
      nflWeeks,
      nflMatches,
      weekNumber,
      year
    };
  }
);

// 1 Get NFL status and basic info
// 2 Build a structure
// 3 Build teams list
// 4 build schedule/scores
