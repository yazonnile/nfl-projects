// NFL API - Main entry point
// Exports all API functions for external use

// Data functions
export { getNflLeagueData } from './get-nfl-league/data';
export { getNflGroupsStructureData } from './get-nfl-groups-structure/data';
export { getNflTeamsData } from './get-nfl-teams/data';
export { getNflLeagueData as getNflScheduleData } from './get-nfl-schedule/data';

// Request functions
export { getNflLeague } from './get-nfl-league/request';
export { getNflGroupsStructure } from './get-nfl-groups-structure/request';
export { getNflTeams } from './get-nfl-teams/request';
export { getNflSchedule } from './get-nfl-schedule/request';

// Fantasy functions (placeholder - files are empty)
// export { getFantasyLeague } from './get-fantasy-league/request';
// export { getFantasyWeek } from './get-fantasy-week/request';

// 1 Get NFL status and basic info
// 2 Build a structure
// 3 Build teams list
// 4 build schedule/scores
