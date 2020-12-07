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
  createNewSchoolClassRequestLoading: boolean;
  createNewSchoolClassRequestError: string;

  // Add SchoolSubject to SchoolClass
  addSchoolSubjectToSchoolClassLoading: boolean;
  addSchoolSubjectToSchoolClassError: string;
}
