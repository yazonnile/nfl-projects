import apiData from './data.min.json';
import type { ApiDataReturnType } from '$lib/typing-utils/api-data-return-type';

export const {
  nflAthletes,
  nflRookies,
  nflTeams,
  nflConferences,
  nflDivisions,
  nflWeeks,
  nflMatches,
  nflStanding,
  nflLeaders,
  weekNumber,
  year
} = apiData as unknown as ApiDataReturnType;
