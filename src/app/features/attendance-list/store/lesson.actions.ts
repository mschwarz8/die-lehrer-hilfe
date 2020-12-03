import { Lesson } from '../models/lesson';

export class LessonsFetchRequest {
  static readonly type = '[Lesson] Fetch Request';
  constructor(public externalUserId: string) {}
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
