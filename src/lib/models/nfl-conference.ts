import { type AbstractModelWithName } from '../typing-utils/abstract-model-with-name';
import { type NflDivision } from './nfl-division';

export interface NflConference extends AbstractModelWithName {
  divisionsIds: Array<NflDivision['id']>;
}
