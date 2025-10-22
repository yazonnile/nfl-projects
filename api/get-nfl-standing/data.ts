import { getNflStanding } from './request';
import { type ID } from '../../src/lib/typing-utils/id';
import type { NflStanding } from '../../src/lib/models/nfl-standing';
import { getIdFromRef } from '../utils';

interface GetNflStandingDataProps {
  seasonYear: number;
  leagueGroupId: ID;
}

interface GetNflStandingDataReturnType {
  nflStanding: Record<ID, NflStanding>;
}

export const getNflStandingData = async ({
  seasonYear,
  leagueGroupId
}: GetNflStandingDataProps): Promise<GetNflStandingDataReturnType> => {
  const { standings } = await getNflStanding({ seasonYear, leagueGroupId });

  const nflStandingArray = standings.map(({ team, records: [{ name, value, stats }] }) => {
    const nflTeamStanding: Omit<NflStanding, 'overallSeed'> = {
      teamId: getIdFromRef(team, 'teams'),
      wins: NaN,
      ties: NaN,
      losses: NaN,
      pointsFor: NaN,
      pointsAgainst: NaN,
      playoffSeed: NaN,
      streak: NaN,
      winPercentage: NaN
    };

    for (const { name, value } of stats) {
      switch (name) {
        case 'wins':
        case 'ties':
        case 'losses':
        case 'pointsFor':
        case 'pointsAgainst':
        case 'playoffSeed':
        case 'streak':
          nflTeamStanding[name] = value;
          break;
      }

      nflTeamStanding.winPercentage =
        (nflTeamStanding.wins + nflTeamStanding.ties / 2) /
        (nflTeamStanding.wins + nflTeamStanding.ties + nflTeamStanding.losses);
    }

    return nflTeamStanding;
  });

  // sort teams by winPercentage and playoffSeed to get overallSeed
  const nflStanding = nflStandingArray
    .sort((a, b) => {
      return a.winPercentage < b.winPercentage
        ? 1
        : a.winPercentage > b.winPercentage
          ? -1
          : b.playoffSeed - a.playoffSeed;
    })
    .reduce(
      (acc, nflTeamStanding, index) => {
        acc[nflTeamStanding.teamId] = Object.assign(nflTeamStanding, { overallSeed: index + 1 });
        return acc;
      },
      {} as Record<ID, NflStanding>
    );

  return {
    nflStanding
  };
};
