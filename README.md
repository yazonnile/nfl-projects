# Schedules app

1 Get NFL status and basic info
https://sports.core.api.espn.com/v2/sports/football/leagues/nfl

2 Build a structure
https://site.api.espn.com/apis/site/v2/sports/football/nfl/groups

3 Build teams list
https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams

3.1 (OPTIONAL) Build players list rookies
https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/3?enable=roster,stats

4 build schedule/scores
https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=20250901-20260228

5 (OPTIONAL) Build leaders
https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2025/types/2/leaders

-
-
- https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2025/segments/0/leagues/127345224?view=mSettings&view=mTeam&view=modular&view=mNav

https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2025/segments/0/leagues/127345224?view=mMatchup&scoringPeriodId=5

USE OUR LEAGUE BY DEFAULT.
MAKE POSSIBLE TO USE OTHER LEAGUES

-
-
-
-
- https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/3?enable=roster,stats - teamRoster - possible to take rookies data
  NO STATS HERE

https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=20250901-20260228

- ALL SCORES
- team data
  - id
  - name
  - abbreviation
  - displayName
  - shortDisplayName
  - color
  - alternateColor
- match quoters scores
- event weekId
- team record by weekId
- match leaders by STATS (1 per stat) - passingYards, rushingYards, receivingYards

https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2025/types/2/leaders
leaders - athlete ID - need to pick by id from roster

Think about cache some calls.. retry some calls
1 API
2 Transform API data
3 adopt API data into App data
4 run client
5 setup CI

TODO

<!-- - screenshot -->

- responsive (mobile!)
- rosters
- rookies/stats
- top-performers
- fantasy
