import type { AbstractModelWithName } from './abstract-model-with-name';
import { type ID } from '../typing-utils/id';

export interface NflTeam extends AbstractModelWithName {
  conferenceId: ID;
  divisionId: ID;
  slug: string;
  abbreviation: string;
  displayName: string;
  alternateColor: string;
  color: string;
  logos: {
    default: string;
    dark: string;
  };
}
