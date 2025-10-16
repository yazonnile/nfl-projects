import type { ID } from '../../src/lib/typing-utils/id';
import { getNflTeams } from './request';
import type { NflTeam } from '../../src/lib/models/nfl-team';

interface GetNflTeamsReturnType {
  nflTeams: Record<ID, Omit<NflTeam, 'conferenceId' | 'divisionId'>>;
}

export const getNflTeamsData = async (): Promise<GetNflTeamsReturnType> => {
  const nflTeams: Record<ID, Omit<NflTeam, 'conferenceId' | 'divisionId'>> = {};
  const {
    sports: [
      {
        leagues: [{ teams }]
      }
    ]
  } = await getNflTeams();

  for (const {
    team: { id, slug, name, abbreviation, displayName, alternateColor, color, logos }
  } of teams) {
    let defaultLogo = '';
    let darkLogo = '';

    for (const { rel, href } of logos) {
      if (!defaultLogo && rel.includes('default')) {
        defaultLogo = href;
      } else if (!darkLogo && rel.includes('dark')) {
        darkLogo = href;
      }
    }

    // GIANTS LOGO FIX
    if (['NYG', 'NYJ'].includes(abbreviation)) {
      [defaultLogo, darkLogo] = [darkLogo, defaultLogo];
    }

    nflTeams[id] = {
      id,
      slug,
      name,
      abbreviation,
      displayName,
      alternateColor,
      color,
      logos: {
        default: defaultLogo,
        dark: darkLogo
      }
    };
  }

  return {
    nflTeams
  };
};
