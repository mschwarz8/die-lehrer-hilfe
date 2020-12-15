import { SchoolSubjectEnum } from '../../../shared/user/models/school-subject-enum';
import { SchoolExam } from '../../../shared/user/models/school-exam';

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
