import { Lesson } from '../models/lesson';

export interface LessonStateModel {
  lessons: Lesson[];
  createLessonRequestLoading: boolean;
  createLessonRequestError: string;
}
