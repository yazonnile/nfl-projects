import type { ID } from '../../src/lib/typing-utils/id';
import { getNflTeam } from './request';
import type { NflAthlete } from '../../src/lib/models/nfl-athlete';
import type { NflRookie } from 'src/lib/models/nfl-rookie';

interface GetNflTeamProps {
  teamId: ID;
}

type GetNflTeamDataReturnType = {
  athletes: Record<ID, NflAthlete>;
  rookies: Record<ID, NflRookie>;
};

export const getNflTeamData = async ({
  teamId
}: GetNflTeamProps): Promise<GetNflTeamDataReturnType> => {
  const { team } = await getNflTeam({ teamId });

  const athletes: Record<ID, NflAthlete> = {};
  const rookies: Record<ID, NflRookie> = {};

  for (const athlete of team.athletes) {
    // no practice squad athletes
    if (athlete.status.type === 'practice-squad') {
      continue;
    }

    if (athlete.experience.years === 0 && athlete.draft) {
      rookies[athlete.id] = {
        athleteId: athlete.id,
        round: athlete.draft.round,
        selection: athlete.draft.selection
      };
    }

    athletes[athlete.id] = {
      id: athlete.id,
      teamId: teamId,
      displayName: athlete.displayName,
      shortName: athlete.shortName,
      age: athlete.age,
      photo: athlete.headshot?.href ?? '',
      jersey: athlete.jersey,
      position: athlete.position.abbreviation,
      experience: athlete.experience.years,
      status: athlete.status.type,
      injuries: athlete.injuries.map((injury) => ({
        statusType: injury.type.abbreviation,
        returnDate: injury.details.returnDate,
        type: injury.details.type
      }))
    };
  }

  return {
    athletes,
    rookies
  };
};
