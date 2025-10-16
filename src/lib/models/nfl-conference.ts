import type { NflDivision } from './nfl-division';
import type { AbstractModelWithName } from './abstract-model-with-name';

export interface NflConference extends AbstractModelWithName {
  divisionsIds: Array<NflDivision['id']>;
}
