import { type ID } from '../typing-utils/id';

export interface NflAthlete {
  id: ID;
  teamId: ID;
  displayName: string;
  shortName: string;
  age: number;
  photo: string;
  jersey: string;
  position: string;
  experience: number;
  status: 'practice-squad' | 'day-to-day' | 'active';
  injuries: Array<{
    statusType: 'IR' | 'O' | 'Q';
    returnDate: string;
    type:
      | 'Elbow'
      | 'Knee'
      | 'Personal'
      | 'Quadriceps'
      | 'Groin'
      | 'Back'
      | 'Hip'
      | 'Thigh'
      | 'Concussion'
      | 'Shoulder';
  }>;
}
