import { Student } from './student';
import { SchoolSubjectEnum } from './school-subject-enum';
import { SchoolExamTypeEnum } from './school-exam-type-enum';

export interface SchoolExam {
  externalId: string;
  name: string;
  type: SchoolExamTypeEnum;
  schoolLevel?: string;
  participatedStudents?: Student[];
  schoolSubject?: SchoolSubjectEnum;
  dateTimestampInMs?: number; // For type QUESTIONING and COLLABORATION not needed
}
