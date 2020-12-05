import { User } from '../models/user';
import { SchoolClass } from '../models/school-class';
import { SchoolSubjectEnum } from '../models/school-subject-enum';

export interface UserStateModel {
  loggedInUser: User;
  selectedSchoolClass: SchoolClass;
  selectedSchoolSubject: SchoolSubjectEnum;

  // AvailableSchoolClasses
  availableSchoolClasses: SchoolClass[];
  createNewSchoolClassRequestLoading: boolean;
  createNewSchoolClassRequestError: string;
}
