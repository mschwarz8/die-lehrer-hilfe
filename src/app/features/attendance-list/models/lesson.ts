import { StudentLessonInfo } from './student-lesson-info';

export interface Lesson {
  externalId: string;
  dateTimestampInMs: number;
  studentLessonInfos?: StudentLessonInfo[];
}
