import { Lesson } from '../models/lesson';

export interface LessonStateModel {
  lessons: Lesson[];
  lessonsFetchRequestLoading: boolean;
  lessonsFetchRequestError: string;
  createLessonRequestActionPerforming: boolean;
  createLessonRequestActionError: string;
}
