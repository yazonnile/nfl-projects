import { getNflLeaders } from './request';
import type { NflLeaders } from '../../src/lib/models/nfl-leaders';
import { getIdFromRef } from '../utils';

type GetNflLeadersDataReturnType = {
  nflLeaders: Record<NflLeaders['category'], NflLeaders>;
};

export const getNflLeadersData = async (): Promise<GetNflLeadersDataReturnType> => {
  const { categories } = await getNflLeaders();

  const nflLeaders = {} as Record<NflLeaders['category'], NflLeaders>;

  // filter out inactive leaders categories
  const activeLeadersCategories: Set<NflLeaders['category']> = new Set([
    'passingYards',
    'rushingYards',
    'receivingYards',
    'sacks',
    'interceptions',
    'passingTouchdowns',
    'quarterbackRating',
    'rushingTouchdowns',
    'receptions',
    'receivingTouchdowns',
    'totalPoints',
    'totalTouchdowns'
  ]);

  for (const category of categories) {
    // skip inactive leaders categories
    if (!activeLeadersCategories.has(category.name)) {
      continue;
    }

    nflLeaders[category.name] = {
      category: category.name,
      shortDisplayName: category.shortDisplayName,
      displayName: category.displayName,
      leaders: category.leaders.map((leader) => ({
        athleteId: getIdFromRef(leader.athlete, 'athletes'),
        value: leader.value
      }))
    };
  }
  return {
    nflLeaders
  };
};
