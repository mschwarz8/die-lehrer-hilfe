import { Student } from './student';

export interface SchoolClass {
  externalId: string;
  name: string;
  grade?: number;
  students: Student[];
}
