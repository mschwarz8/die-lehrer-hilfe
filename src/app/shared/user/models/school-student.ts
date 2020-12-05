import { SchoolClass } from './school-class';
import { SchoolSubjectEnum } from './school-subject-enum';
import { SchoolGrade } from './school-grade';

// Has all information about a student
export interface SchoolStudent {
  externalId?: string;
  firstName: string;
  lastName: string;
  currentSchoolClass: SchoolClass;
  schoolSubjects?: SchoolSubjectEnum[];
  grades?: SchoolGrade[];
}
