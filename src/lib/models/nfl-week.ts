import { type ID } from '../typing-utils/id';

export interface NflWeek {
  id: ID;
  number: number;
  matches: Array<ID>;
  teamsOnBye: Array<ID>;
}
