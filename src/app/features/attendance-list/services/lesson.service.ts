import { Injectable } from '@angular/core';
import { Lesson } from '../../attendance-list/models/lesson';
import { SchoolSubjectEnum } from '../../../shared/user/models/school-subject-enum';
import { mockedLessons } from '../../../shared/mocks/mocked-data';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  constructor() {}

  public fetchLessons(
    externalUserId: string,
    externalSchoolClassId: string,
    schoolSubject: SchoolSubjectEnum
  ): Lesson[] {
    console.log('Fetching lessons');
    return mockedLessons;
  }

  public createLesson(lessonTimestampInMs: number): Lesson {
    console.log('Creating new lesson');
    return {
      externalId: 'd98fadd9-8a34-4283-907d-63185167bfa8',
      dateTimestampInMs: lessonTimestampInMs
    };
  }
}
