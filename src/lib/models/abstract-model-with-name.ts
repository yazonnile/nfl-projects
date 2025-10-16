import type { ID } from '../typing-utils/id';

export interface AbstractModelWithName {
  id: ID;
  name: string;
  abbreviation: string;
}
