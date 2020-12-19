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

export class CreateLessonRequest {
  static readonly type = '[Lesson] Create Lesson Request';
  constructor(public lessonTimestampInMs: number) {}
}

export class CreateLessonSuccess {
  static readonly type = '[Lesson] Create Lesson Success';
  constructor(public lesson: Lesson) {}
}

export class CreateLessonError {
  static readonly type = '[Lesson] Create Lesson Error';
  constructor(public error: string) {}
}
