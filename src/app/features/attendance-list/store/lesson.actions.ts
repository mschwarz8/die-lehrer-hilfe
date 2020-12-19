import { Lesson } from '../models/lesson';
import { SchoolSubjectEnum } from '../../../shared/user/models/school-subject-enum';

export class LessonsFetchRequest {
  static readonly type = '[Lesson] Fetch Request';
  constructor(
    public externalUserId: string,
    public externalSchoolClassId: string,
    public schoolSubject: SchoolSubjectEnum
  ) {}
}

export class LessonsFetchRequestSuccess {
  static readonly type = '[Lesson] Fetch Request Success';
  constructor(public lessons: Lesson[]) {}
}

export class LessonsFetchRequestError {
  static readonly type = '[Lesson] Fetch Request Error';
  constructor(public error: string) {}
}

export class CreateLessonActionRequest {
  static readonly type = '[Lesson] Create Lesson Action Request';
  constructor(public lessonTimestampInMs: number) {}
}

export class CreateLessonActionSuccess {
  static readonly type = '[Lesson] Create Lesson Action Success';
  constructor(public lesson: Lesson) {}
}

export class CreateLessonActionError {
  static readonly type = '[Lesson] Create Lesson Action Error';
  constructor(public error: string) {}
}
