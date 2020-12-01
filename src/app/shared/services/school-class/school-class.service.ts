import { Injectable } from '@angular/core';
import { SchoolClass } from '../../user/models/school-class';
import { Student } from '../../user/models/student';

@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {

  constructor() { }

  public createNewSchoolClass(schoolClassName: string, students: Student[]): SchoolClass {
    console.log('Creating new school class');
    return {
      externalId: '02eed61d-04b5-4412-9773-ea1bf7e1065e',
      name: schoolClassName,
      students
    };
  }
}
