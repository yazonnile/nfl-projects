import type { ID } from '../typing-utils/id';
import type { AbstractModelWithName } from '../typing-utils/abstract-model-with-name';

export interface NflDivision extends AbstractModelWithName {
  conferenceId: ID;
  teamsIds: Array<ID>;
}
