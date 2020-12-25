import { User } from '../models/user';
import { SchoolClass } from '../models/school-class';
import { SchoolSubjectEnum } from '../models/school-subject-enum';

export interface UserStateModel {
  loggedInUser: User;
  selectedSchoolClass: SchoolClass;
  selectedSchoolSubject: SchoolSubjectEnum;

  // AvailableSchoolClasses
  availableSchoolClasses: SchoolClass[];

  // Create new SchoolClass
  createNewSchoolClassRequestActionPerforming: boolean;
  createNewSchoolClassRequestActionError: string;

  // Add SchoolSubject to SchoolClass
  addSchoolSubjectToSchoolClassActionPerforming: boolean;
  addSchoolSubjectToSchoolClassActionError: string;

  // Add Student to SchoolClass
  addStudentToSchoolClassActionPerforming: boolean;
  addStudentToSchoolClassActionError: string;
}
