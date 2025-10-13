import { type ID } from '../typing-utils/id';

export interface NflWeek {
  id: ID;
  date: string;
  number: number;
  matches: Array<ID>;
}
