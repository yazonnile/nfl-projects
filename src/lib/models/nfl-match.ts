import { type ID } from '../typing-utils/id';
import { type NflCompetitor } from './nfl-competitor';

export interface NflMatch {
  id: ID;
  weekId: ID;
  competitors: {
    home: NflCompetitor;
    away: NflCompetitor;
  };
}
