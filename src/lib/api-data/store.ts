import apiData from './data.min.json';
import type { ApiDataReturnType } from '$lib/typing-utils/api-data-return-type';

export const {
  nflTeams,
  nflConferences,
  nflDivisions,
  nflWeeks,
  nflMatches,
  nflStanding,
  weekNumber,
  year
} = apiData as unknown as ApiDataReturnType;
