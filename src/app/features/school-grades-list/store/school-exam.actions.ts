import { SchoolSubjectEnum } from '@/app/shared/user/models/school-subject-enum';
import { SchoolExam } from '@/app/shared/user/models/school-exam';
import { SchoolExamTypeEnum } from '@/app/shared/user/models/school-exam-type-enum';

export class SchoolExamsFetchRequest {
  static readonly type = '[SchoolExam] Fetch Request';
  constructor(
    public externalUserId: string,
    public externalSchoolClassId: string,
    public schoolSubject: SchoolSubjectEnum
  ) {}
}

export class SchoolExamsFetchSuccess {
  static readonly type = '[SchoolExam] Fetch Success';
  constructor(public schoolExams: SchoolExam[]) {}
}

export class SchoolExamsFetchError {
  static readonly type = '[SchoolExam] Fetch Error';
  constructor(public error: string) {}
}

export class AddSchoolExamActionRequest {
  static readonly type = '[SchoolExam] Add SchoolExam Action Request';
  constructor(
    public externalUserId: string,
    public name: string,
    public type: SchoolExamTypeEnum,
    public dateTimestampInMs: number
  ) {}
}

export class AddSchoolExamActionSuccess {
  static readonly type = '[SchoolExam] Add SchoolExam Action Success';
  constructor(
    public schoolExam: SchoolExam
  ) {}
}

export class AddSchoolExamActionError {
  static readonly type = '[SchoolExam] Add SchoolExam Action Error';
  constructor(
    public error: string
  ) {}
}
