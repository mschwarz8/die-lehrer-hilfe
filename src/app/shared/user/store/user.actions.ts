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

export class CreateSchoolClassActionRequest {
  static readonly type = '[User] Create SchoolClass Action Request';
  constructor(public schoolClassname: string, public students: Student[]) {}
}

export class CreateSchoolClassActionSuccess {
  static readonly type = '[User] Create SchoolClass Action Success';
  constructor(public schoolClass: SchoolClass) {}
}

export class CreateSchoolClassActionError {
  static readonly type = '[User] Create SchoolClass Action Error';
  constructor(public error: string) {}
}

export class AddSchoolSubjectActionRequest {
  static readonly type = '[User] Add SchoolSubject Action Request';
  constructor(public externalSchoolClassId: string, public schoolSubject: SchoolSubjectEnum) {}
}

export class AddSchoolSubjectActionSuccess {
  static readonly type = '[User] Add SchoolSubject Action Success';
  constructor(public schoolClass: SchoolClass) {}
}

export class AddSchoolSubjectActionError {
  static readonly type = '[User] Add SchoolSubject Action Error';
  constructor(public error: string) {}
}

export class AddStudentActionRequest {
  static readonly type = '[User] Add Student Action Request';
  constructor(public externalSchoolClassId: string, public firstName: string, public lastName: string) {}
}

export class AddStudentActionSuccess {
  static readonly type = '[User] Add Student Action Success';
  constructor(public externalSchoolClassId: string, public createdStudent: Student) {}
}

export class AddStudentActionError {
  static readonly type = '[User] Add Student Action Error';
  constructor(public error: string) {}
}
