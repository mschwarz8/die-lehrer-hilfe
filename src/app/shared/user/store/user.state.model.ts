import { User } from '../models/user';
import { SchoolClass } from '../models/school-class';

export interface UserStateModel {
  loggedInUser: User;
  selectedSchoolClass: SchoolClass;

  // AvailableSchoolClasses
  availableSchoolClasses: SchoolClass[];
  createNewSchoolClassRequestLoading: boolean;
  createNewSchoolClassRequestError: string;
}
