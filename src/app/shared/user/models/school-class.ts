import { Student } from './student';
import { SchoolSubjectEnum } from './school-subject-enum';

export interface SchoolClass {
  externalId: string;
  name: string;
  schoolLevel?: number;
  students: Student[];
  schoolSubjects?: SchoolSubjectEnum[];
}
