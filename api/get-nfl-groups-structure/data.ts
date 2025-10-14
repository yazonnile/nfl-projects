import type { NflConference } from '../../src/lib/models/nfl-conference';
import type { NflDivision } from '../../src/lib/models/nfl-division';
import type { ID } from '../../src/lib/typing-utils/id';
import { getNflGroupsStructure } from './request';

interface GetNflGroupsStructureDataReturnType {
  nflConferences: Record<ID, NflConference>;
  nflDivisions: Record<ID, NflDivision>;
}

export const getNflGroupsStructureData = async (): Promise<GetNflGroupsStructureDataReturnType> => {
  const nflConferences: Record<ID, NflConference> = {};
  const nflDivisions: Record<ID, NflDivision> = {};

  const { groups } = await getNflGroupsStructure();

  for (const { name, abbreviation, children } of groups) {
    const conferenceId = abbreviation.toLowerCase();

    nflConferences[conferenceId] = {
      id: conferenceId,
      name,
      abbreviation,
      divisionsIds: []
    };

    for (const { name, abbreviation, teams } of children) {
      const divisionId = `${conferenceId}-${abbreviation.toLowerCase()}`;

      nflConferences[conferenceId].divisionsIds.push(divisionId);

      nflDivisions[divisionId] = {
        id: divisionId,
        name,
        abbreviation,
        conferenceId,
        teamsIds: []
      };

      for (const { id } of teams) {
        nflDivisions[divisionId].teamsIds.push(id);
      }
    }
  }

  return {
    nflConferences,
    nflDivisions
  };
};
