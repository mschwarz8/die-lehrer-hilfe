import { Student } from '../models/student';
import { SchoolClass } from '../models/school-class';
import { SchoolSubjectEnum } from '../models/school-subject-enum';

export class LoginUser {
  static readonly type = '[User] Login';
  constructor(public externalId: string, public firstName: string, public lastName: string) {}
}

export class AvailableSchoolClassesFetchRequest {
  static readonly type = '[User] Available SchoolClasses Fetch Request';
  constructor(public externalUserId: string) {}
}

export class SelectSchoolClass {
  static readonly type = '[User] Select SchoolClass';
  constructor(public selectedSchoolClass: SchoolClass) {}
}

export class SelectSchoolSubject {
  static readonly type = '[User] Select SchoolSubject';
  constructor(public selectedSchoolSubject: SchoolSubjectEnum) {}
}

export class CreateSchoolClassRequest {
  static readonly type = '[User] Create SchoolClass Request';
  constructor(public schoolClassname: string, public students: Student[]) {}
}

export class CreateSchoolClassSuccess {
  static readonly type = '[User] Create SchoolClass Success';
  constructor(public schoolClass: SchoolClass) {}
}

export class CreateSchoolClassError {
  static readonly type = '[User] Create SchoolClass Error';
  constructor(public error: string) {}
}
