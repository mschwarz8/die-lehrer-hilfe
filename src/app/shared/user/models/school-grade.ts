import { SchoolSubjectEnum } from './school-subject-enum';
import { Student } from './student';

export interface SchoolGrade {
  externalId?: string;
  student: Student;
  schoolLevel?: number;
  schoolSubject: SchoolSubjectEnum;
  grade: number;
}
