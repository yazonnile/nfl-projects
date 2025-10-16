import type { ID } from '../typing-utils/id';
import type { AbstractModelWithName } from './abstract-model-with-name';

export interface NflDivision extends AbstractModelWithName {
  conferenceId: ID;
  teamsIds: Array<ID>;
}
