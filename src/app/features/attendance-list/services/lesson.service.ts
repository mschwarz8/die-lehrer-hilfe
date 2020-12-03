import { Injectable } from '@angular/core';
import { Lesson } from '../../attendance-list/models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor() {}

  public createLesson(lessonTimestampInMs: number): Lesson {
    console.log('Creating new lesson');
    return {
      externalId: 'd98fadd9-8a34-4283-907d-63185167bfa8',
      dateTimestampInMs: lessonTimestampInMs
    };
  }
}
