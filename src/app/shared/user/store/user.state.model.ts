import { User } from '../models/user';

export interface UserStateModel {
  loggedInUser: User;
  availableClasses: string[];
  selectedClass: string;
}
