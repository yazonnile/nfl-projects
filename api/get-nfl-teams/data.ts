import type { ID } from '$typing-utils/id';
import { getNflTeams } from './request';
import type { NflTeam } from '$models/nfl-team';

interface GetNflTeamsReturnType {
  nflTeams: Record<ID, Omit<NflTeam, 'conferenceId' | 'divisionId'>>;
}

export const getNflTeamsData = async (): Promise<GetNflTeamsReturnType> => {
  const nflTeams: Record<ID, Omit<NflTeam, 'conferenceId' | 'divisionId'>> = {};

  const requestData = await getNflTeams();

  for (const {
    id,
    slug,
    name,
    abbreviation,
    displayName,
    alternateColor,
    color,
    logos
  } of requestData.sports[0].leagues[0].teams) {
    let defaultLogo = '';
    let darkLogo = '';

    for (const { rel, href } of logos) {
      if (!defaultLogo && rel.includes('default')) {
        defaultLogo = href;
      } else if (!darkLogo && rel.includes('dark')) {
        darkLogo = href;
      }
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
