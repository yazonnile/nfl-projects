import { type ID } from './id';

export interface AbstractModelWithName {
  id: ID;
  name: string;
  abbreviation: string;
}
